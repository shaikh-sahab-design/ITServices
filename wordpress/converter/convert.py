"""Turn the style trees from extract.js into Elementor page data (Flexbox containers + classic widgets).

Usage: python3 convert.py <extract_dir> <out_dir> <page_name> [...]

Placeholders resolved on the WordPress side by the folio3-site plugin:
  "@@url:images/x.webp" / "@@id:images/x.webp"  media library url / attachment id
  "@@link:/soc-services"                          internal page link
"""
import hashlib
import html
import json
import os
import re
import sys

WIDTHS = (1440, 1024, 390)
VP = {1440: '', 1024: '_tablet', 390: '_mobile'}

BRAND = {
    '#0c0e16': 'text', '#41444e': 'secondary', '#f4f5fb': 'accent', '#4a7dee': 'primary',
    '#ec2539': 'f3red', '#f5c300': 'f3yellow', '#ffffff': 'f3white',
}

ROOT = os.path.dirname(os.path.abspath(__file__))
SVG_DIR = os.path.join(ROOT, '..', 'assets', 'svg')
EXTRA_CSS = []          # raw rules for things Elementor controls can't express
INLINE_KEEP = {'strong', 'b', 'em', 'i', 'br', 'span', 'a', 'small', 'sup', 'sub', 'u', 'mark', 'time', 'abbr', 'code'}


# ---------------------------------------------------------------- helpers
def eid(seed):
    return hashlib.md5(seed.encode()).hexdigest()[:7]


def px(v, default=0.0):
    if v is None:
        return default
    m = re.match(r'^(-?[\d.]+)px$', str(v).strip())
    return float(m.group(1)) if m else default


def num(v):
    v = round(float(v), 2)
    return int(v) if v == int(v) else v


def color(c):
    """computed rgb()/rgba() -> #hex or rgba(); None for transparent."""
    if not c:
        return None
    m = re.match(r'rgba?\(([\d.]+),\s*([\d.]+),\s*([\d.]+)(?:,\s*([\d.]+))?\)', c)
    if not m:
        return None
    r, g, b = (int(float(m.group(i))) for i in (1, 2, 3))
    a = float(m.group(4)) if m.group(4) is not None else 1.0
    if a == 0:
        return None
    if a >= 0.999:
        return '#%02x%02x%02x' % (r, g, b)
    return 'rgba(%d,%d,%d,%s)' % (r, g, b, num(a))


def size(v, unit='px'):
    return {'unit': unit, 'size': num(v), 'sizes': []}


def custom(s):
    return {'unit': 'custom', 'size': s, 'sizes': []}


def dims(t, r, b, l, unit='px'):
    vals = [num(x) for x in (t, r, b, l)]
    return {'unit': unit, 'top': str(vals[0]), 'right': str(vals[1]), 'bottom': str(vals[2]), 'left': str(vals[3]),
            'isLinked': len(set(vals)) == 1}


def font_family(f):
    f = f or ''
    if 'Bakbak' in f:
        return 'Bakbak One'
    if 'Geist' in f:
        return 'Geist'
    return 'Inter'


def media_key(url):
    if not url:
        return None
    m = re.search(r'url=([^&]+)', url)
    if m:
        from urllib.parse import unquote
        url = unquote(m.group(1))
    m = re.search(r'/(images|icons|videos)/([^?"\')]+)', url)
    return f'{m.group(1)}/{m.group(2)}' if m else None


def media(key):
    return {'url': f'@@url:{key}', 'id': f'@@id:{key}', 'source': 'library'}


def link(href):
    if not href:
        return None
    if href.startswith('/') and not href.startswith('//'):
        return {'url': f'@@link:{href}', 'is_external': '', 'nofollow': ''}
    return {'url': href, 'is_external': 'on' if href.startswith('http') else '', 'nofollow': ''}


def save_svg(markup):
    markup = re.sub(r'\s(class|aria-hidden|focusable|data-[\w-]+)="[^"]*"', '', markup)
    h = hashlib.md5(markup.encode()).hexdigest()[:10]
    os.makedirs(SVG_DIR, exist_ok=True)
    path = os.path.join(SVG_DIR, f'{h}.svg')
    if not os.path.exists(path):
        with open(path, 'w') as f:
            f.write(markup)
    return f'svg/{h}.svg'


def shadow(s):
    if not s or s == 'none':
        return None
    m = re.match(r'(rgba?\([^)]*\))\s+(-?[\d.]+)px\s+(-?[\d.]+)px\s+([\d.]+)px(?:\s+(-?[\d.]+)px)?(\s+inset)?', s)
    if not m:
        return None
    return {'horizontal': num(float(m.group(2))), 'vertical': num(float(m.group(3))), 'blur': num(float(m.group(4))),
            'spread': num(float(m.group(5) or 0)), 'color': color(m.group(1)) or 'rgba(0,0,0,0)'}


def gradient(bg):
    """Two-stop linear-gradient -> elementor gradient settings, else None."""
    m = re.match(r'linear-gradient\((?:(-?[\d.]+)deg,\s*)?(rgba?\([^)]*\))(?:\s+([\d.]+)%)?,\s*(rgba?\([^)]*\))(?:\s+([\d.]+)%)?\)$', bg.strip())
    if not m:
        return None
    def stop(c):
        # keep the hue of a fully transparent stop so the fade doesn't go through white
        return color(c) or re.sub(r'\s+', '', re.sub(r'^rgba?\(([^,]+),([^,]+),([^,)]+).*$', r'rgba(\1,\2,\3,0)', c))
    return {'angle': num(float(m.group(1) or 180)), 'a': stop(m.group(2)), 'a_stop': num(float(m.group(3) or 0)),
            'b': stop(m.group(4)), 'b_stop': num(float(m.group(5) or 100))}


def split_layers(bg):
    out, depth, cur = [], 0, ''
    for ch in bg:
        if ch == '(':
            depth += 1
        elif ch == ')':
            depth -= 1
        if ch == ',' and depth == 0:
            out.append(cur.strip())
            cur = ''
        else:
            cur += ch
    if cur.strip():
        out.append(cur.strip())
    return out


# ---------------------------------------------------------------- tree access
class Page:
    def __init__(self, exdir, name):
        self.name = name
        mf = os.path.join(exdir, '..', 'motion', f'{name}.json')
        self.motion = json.load(open(mf)) if os.path.exists(mf) else {}
        self.vars = self.motion.pop('__vars__', {})  # inline custom properties (--delay, --hero-img ...)
        self.trees = {}
        self.index = {}
        for w in WIDTHS:
            t = json.load(open(os.path.join(exdir, f'{name}.{w}.json')))
            self.trees[w] = t
            idx = {}
            self._index(t, '', idx)
            self.index[w] = idx

    def _index(self, n, path, idx):
        n['_path'] = path
        idx[path] = n
        i = 0
        for k in n.get('kids', []):
            if 'text' in k:
                continue
            p = f"{path}/{k.get('tag')}.{(k.get('cls') or '').split(' ')[0]}{i}"
            i += 1
            if k.get('hidden'):
                k['_path'] = p
                idx[p] = k
                continue
            self._index(k, p, idx)

    def at(self, node, w):
        """Same node at another viewport (None when hidden or absent)."""
        n = self.index[w].get(node['_path'])
        if n is None or n.get('hidden'):
            return None
        return n


def classes(n):
    return (n.get('cls') or '').split()


def el_kids(n):
    return [k for k in n.get('kids', []) if 'text' not in k]


def visible_kids(n):
    return [k for k in el_kids(n) if not k.get('hidden')]


def has_text(n):
    return any('text' in k and not k.get('ws') for k in n.get('kids', []))


def is_inline_only(n):
    """True when every descendant is inline text formatting (a text leaf)."""
    for k in n.get('kids', []):
        if 'text' in k:
            continue
        if k.get('hidden'):
            if k.get('tag') == 'br':
                continue
            return False
        if k['tag'] == 'svg' or k['tag'] not in INLINE_KEEP:
            return False
        d = k['cs']['display']
        if d not in ('inline', 'contents') and k['tag'] != 'br':
            # inline-block spans with plain text still read as text
            if not (d == 'inline-block' and is_inline_only(k) and not boxy(k)):
                if not (k['tag'] == 'span' and d == 'block' and is_inline_only(k) and not boxy(k)):
                    return False
        if not is_inline_only(k):
            return False
    return True


def text_of(n):
    out = []
    for k in n.get('kids', []):
        if 'text' in k:
            out.append(k['text'])
        elif not k.get('hidden') and k.get('tag') != 'svg':
            out.append(text_of(k))
    return ''.join(out)


def boxy(n):
    cs = n['cs']
    return bool(color(cs['backgroundColor']) or px(cs['borderTopWidth']) or px(cs['paddingTop']) or px(cs['paddingLeft'])
                or (cs['backgroundImage'] and cs['backgroundImage'] != 'none'))


def inner_html(n, base_cs, top=True):
    parts = []
    ncs = n.get('cs') or {}
    flex_row = ncs.get('display') in ('flex', 'inline-flex') and str(ncs.get('flexDirection', 'row')).startswith('row')
    # flex items are blockified, but in a row they still sit side by side
    lines_as_blocks = not flex_row and any(not k.get('hidden') and 'text' not in k and k['cs']['display'] == 'block' for k in n.get('kids', []))
    el_kids = [k for k in n.get('kids', []) if 'text' not in k and not k.get('hidden') and k['tag'] != 'br']
    row_gap = px(ncs.get('columnGap')) if flex_row and ncs.get('columnGap') not in (None, 'normal') else 0
    for k in n.get('kids', []):
        if 'text' in k:
            t = html.escape(k['text'])
            if ncs.get('whiteSpace') == 'pre-line':
                # Write the line breaks out as <br>: pre-line on an Elementor wrapper would also render the template's leading newline.
                t = re.sub(r'[ \t]*\n[ \t]*', '<br>', t)
            parts.append(t)
            continue
        if k.get('hidden'):
            if k['tag'] == 'br' and 'line-mask' not in (k.get('cls') or ''):
                parts.append('<br>')
            continue
        tag = k['tag']
        if tag == 'br':
            parts.append('<br>')
            continue
        cs = k['cs']
        style = []
        c = color(cs['color'])
        if c and c != color(base_cs['color']):
            style.append(f'color:{c}')
        if cs['fontWeight'] != base_cs['fontWeight'] and tag not in ('strong', 'b'):
            style.append(f'font-weight:{cs["fontWeight"]}')
        if cs['fontStyle'] != base_cs['fontStyle'] and tag not in ('em', 'i'):
            style.append(f'font-style:{cs["fontStyle"]}')
        if font_family(cs['fontFamily']) != font_family(base_cs['fontFamily']):
            style.append(f"font-family:'{font_family(cs['fontFamily'])}'")
        if cs['fontSize'] != base_cs['fontSize']:
            style.append(f'font-size:{cs["fontSize"]}')
        if cs['textDecorationLine'] not in ('none', base_cs['textDecorationLine']):
            style.append(f'text-decoration:{cs["textDecorationLine"]}')
        if flex_row and len(el_kids) > 1 and k is not el_kids[-1] and k.get('rect'):
            style.append(f"display:inline-block;min-width:{num(k['rect'][2])}px;margin-right:{num(row_gap)}px")
        inner = inner_html(k, cs, False)
        if lines_as_blocks and cs['display'] == 'block':
            inner = re.sub(r'(<br>\s*)+$', '', inner)
        st = f' style="{";".join(style)}"' if style else ''
        if tag == 'a':
            href = k['attrs'].get('href', '')
            lk = link(href)
            parts.append(f'<a href="{lk["url"] if lk else href}"{st}>{inner}</a>')
        elif tag in ('strong', 'b', 'em', 'i', 'sup', 'sub', 'u', 'small', 'code'):
            parts.append(f'<{tag}{st}>{inner}</{tag}>')
        else:
            parts.append(f'<span{st}>{inner}</span>' if st else inner)
        if lines_as_blocks and cs['display'] == 'block':
            parts.append('<br>')
    s = ''.join(parts)
    if top:
        s = re.sub(r'(<br>\s*)+$', '', s)
    return re.sub(r'\s+', ' ', s).strip()


# ---------------------------------------------------------------- style -> settings
def typo(cs, prefix='typography_'):
    s = {f'{prefix}typography': 'custom', f'{prefix}font_family': font_family(cs['fontFamily']),
         f'{prefix}font_size': size(px(cs['fontSize'])), f'{prefix}font_weight': str(cs['fontWeight'])}
    lh = cs['lineHeight']
    s[f'{prefix}line_height'] = size(px(lh)) if lh.endswith('px') else {'unit': 'em', 'size': 1.2, 'sizes': []}
    ls = cs['letterSpacing']
    if ls not in ('normal', '0px'):
        s[f'{prefix}letter_spacing'] = size(px(ls))
    if cs['textTransform'] != 'none':
        s[f'{prefix}text_transform'] = cs['textTransform']
    if cs['fontStyle'] == 'italic':
        s[f'{prefix}font_style'] = 'italic'
    return s


def global_color(settings, key, c):
    """Set a colour, linking it to the kit's global colour when it is a brand token."""
    if not c:
        return
    settings[key] = c
    if c in BRAND:
        settings.setdefault('__globals__', {})[key] = f'globals/colors?id={BRAND[c]}'


def box_settings(cs, pre, au=None):
    """Background, border, radius, shadow for containers (pre='') or widgets (pre='_')."""
    s = {}
    bgc = color(cs['backgroundColor'])
    bgi = cs['backgroundImage']
    extra = []
    layers = split_layers(bgi) if bgi and bgi != 'none' else []
    urls = [l for l in layers if l.startswith('url(')]
    grads = [l for l in layers if 'gradient(' in l]
    if urls:
        key = media_key(urls[0])
        if key:
            s[f'{pre}background_background'] = 'classic'
            s[f'{pre}background_image'] = media(key)
            li = layers.index(urls[0])
            poss = [x.strip() for x in cs['backgroundPosition'].split(',')]
            pos = poss[li] if li < len(poss) else poss[-1]
            s[f'{pre}background_position'] = 'initial'
            xs = pos.split(' ')
            if len(xs) >= 2:
                s[f'{pre}background_xpos'] = size(float(xs[0][:-1]), '%') if xs[0].endswith('%') else size(px(xs[0]))
                s[f'{pre}background_ypos'] = size(float(xs[1][:-1]), '%') if xs[1].endswith('%') else size(px(xs[1]))
            bss = [x.strip() for x in cs['backgroundSize'].split(',')]
            bs = bss[li] if li < len(bss) else bss[-1]
            s[f'{pre}background_size'] = bs if bs in ('cover', 'contain', 'auto') else 'cover'
            s[f'{pre}background_repeat'] = 'no-repeat' if 'no-repeat' in cs['backgroundRepeat'] else 'repeat'
            if bgc:
                global_color(s, f'{pre}background_color', bgc)
            if grads and pre == '':
                g = gradient(grads[0])
                if g and len(grads) == 1:
                    s.update({'background_overlay_background': 'gradient', 'background_overlay_color': g['a'],
                              'background_overlay_color_stop': size(g['a_stop'], '%'), 'background_overlay_color_b': g['b'],
                              'background_overlay_color_b_stop': size(g['b_stop'], '%'),
                              'background_overlay_gradient_angle': size(g['angle'], 'deg'), 'background_overlay_opacity': size(1)})
                else:
                    extra.append(f"background-image:{', '.join(grads)}, {urls[0]}")
    elif grads:
        g = gradient(grads[0]) if len(grads) == 1 else None
        if g:
            s.update({f'{pre}background_background': 'gradient', f'{pre}background_color': g['a'],
                      f'{pre}background_color_stop': size(g['a_stop'], '%'), f'{pre}background_color_b': g['b'],
                      f'{pre}background_color_b_stop': size(g['b_stop'], '%'), f'{pre}background_gradient_angle': size(g['angle'], 'deg')})
        else:
            extra.append(f'background-image:{bgi}')
            if bgc:
                extra.append(f'background-color:{bgc}')
    elif bgc:
        s[f'{pre}background_background'] = 'classic'
        global_color(s, f'{pre}background_color', bgc)
    # border
    widths = [px(cs[f'border{side}Width']) for side in ('Top', 'Right', 'Bottom', 'Left')]
    styles = [cs[f'border{side}Style'] for side in ('Top', 'Right', 'Bottom', 'Left')]
    if any(w > 0 and st != 'none' for w, st in zip(widths, styles)):
        style = next(st for w, st in zip(widths, styles) if w > 0 and st != 'none')
        widths = [w if st != 'none' else 0 for w, st in zip(widths, styles)]
        s[f'{pre}border_border'] = style
        s[f'{pre}border_width'] = dims(*widths)
        cols = [color(cs[f'border{side}Color']) for side, w in zip(('Top', 'Right', 'Bottom', 'Left'), widths) if w]
        global_color(s, f'{pre}border_color', cols[0] if cols else 'transparent')
    rkeys = ('borderTopLeftRadius', 'borderTopRightRadius', 'borderBottomRightRadius', 'borderBottomLeftRadius')
    radii = [px(cs[k]) for k in rkeys]
    if any(radii) or any(str(cs[k]).endswith('%') and not str(cs[k]).startswith('0') for k in rkeys):
        if any(cs[k].endswith('%') for k in ('borderTopLeftRadius',)):
            s[f'{pre}border_radius'] = dims(50, 50, 50, 50, '%')
        else:
            s[f'{pre}border_radius'] = dims(*radii)
    sh = shadow(cs['boxShadow'])
    if sh:
        s[f'{pre}box_shadow_box_shadow_type'] = 'yes'
        s[f'{pre}box_shadow_box_shadow'] = sh
        if 'inset' in cs['boxShadow']:
            s[f'{pre}box_shadow_box_shadow_position'] = 'inset'
    if pre is not None:
        op = float(cs.get('opacity') or 1)
        if op < 1:
            extra.append(f'opacity:{num(op)}')
        if cs.get('overflowX') in ('auto', 'scroll'):
            extra.append('overflow-x:auto')
        tf = cs.get('transform')
        if tf and tf != 'none':
            extra.append(f'transform:{tf}')
        for prop, css in (('maskImage', 'mask-image'), ('webkitMaskImage', '-webkit-mask-image'), ('clipPath', 'clip-path')):
            v = cs.get(prop)
            if v and v != 'none':
                extra.append(f'{css}:{v}')
    for prop, css in (('backdropFilter', 'backdrop-filter'), ('mixBlendMode', 'mix-blend-mode'), ('filter', 'filter')):
        v = cs.get(prop)
        if v and v not in ('none', 'normal'):
            extra.append(f'{css}:{v}')
            if prop == 'backdropFilter':
                extra.append(f'-webkit-backdrop-filter:{v}')
    if cs.get('whiteSpace') in ('nowrap', 'pre', 'pre-wrap'):
        extra.append(f"white-space:{cs['whiteSpace']}")
    if cs.get('position') == 'sticky':
        extra.append('position:sticky')
        extra.append(f"top:{cs.get('top') if cs.get('top') not in (None, 'auto') else '0px'}")
        extra.append('align-self:flex-start')
    if cs.get('position') in ('relative', 'sticky') and cs.get('zIndex') not in (None, 'auto'):
        extra.append(f"z-index:{cs['zIndex']}")
    return s, extra


def nowrap_reset(n, extra, page):
    """white-space:nowrap set on desktop must be undone where the old site wraps (e.g. mobile buttons)."""
    if not any('white-space:nowrap' in d for d in (extra.get(1440) or [])):
        return
    for w in (1024, 390):
        x = page.at(n, w)
        if x is not None and x['cs'].get('whiteSpace') == 'normal':
            extra[w] = list(extra.get(w) or []) + ['white-space:normal']


def spacing(cs, kind):
    vals = [px(cs[f'{kind}{side}']) for side in ('Top', 'Right', 'Bottom', 'Left')]
    return vals


class Converter:
    def __init__(self, page):
        self.p = page
        self.extra = {}       # class -> {vp: [decls]}
        self.motion_css = {}  # class -> (opacity, transform, delay, group)

    # ---- classes: original classes as f3-*, tag marker for list items, scroll/load reveal from Framer start states
    MOTION_SKIP = ('hero__dash-inner', 'service-card__glare', 'nav')

    def node_classes(self, n):
        cl = ['f3-' + c for c in classes(n)]
        if n.get('tag') == 'li':
            cl.append('f3-tag-li')
        path = n.get('_path', '')
        mot = self.p.motion
        m = mot.get(path)
        if m and (m['cls'] or '') == (n.get('cls') or '') and not any(x in (m['cls'] or '').split() for x in self.MOTION_SKIP):
            parent = path.rsplit('/', 1)[0]
            sib = sorted((k for k in mot if k.rsplit('/', 1)[0] == parent and not any(x in (mot[k]['cls'] or '').split() for x in self.MOTION_SKIP)),
                         key=lambda k: int(re.search(r'(\d+)$', k).group(1)))
            delay, dur, ease = (round(sib.index(path) * 0.08, 2) if len(sib) > 1 else 0), 0.5, ''
            grp = f'f3g-{eid(self.p.name + parent)}' if len(sib) > 1 else ''
            mcls = (m['cls'] or '').split()
            for c in mcls:
                if c in TIMING:
                    delay, dur, ease = TIMING[c]
            jm = re.search(r'^(.*/div\.journey__process\d+)/ol\.journey__steps\d+/li\.journey__step(\d+)/', path)
            if jm:
                count = len({re.search(r'li\.journey__step(\d+)', k).group(1) for k in mot if k.startswith(jm.group(1) + '/ol.')})
                i = int(jm.group(2))
                sd = 0.15 + (i / max(count - 1, 1)) * 1.2 * 0.85
                delay, dur, ease = (sd, 0.6, SPRING) if 'milestone' in mcls else (sd + 0.05, 0.5, '')
                grp = f'f3g-{eid(self.p.name + jm.group(1))}'
            if 'journey__line' in mcls:
                delay, dur, ease = 0.15, 1.2, 'cubic-bezier(0.645,0.045,0.355,1)'
                grp = f'f3g-{eid(self.p.name + path.split("/div.journey__track")[0])}'
            mc = f'f3m-{eid(self.p.name + path)}'
            self.motion_css[mc] = (m['o'], m['t'], round(delay, 3), dur, ease)
            cl += ['f3-rv', mc] + ([grp] if grp else [])
        # text whose lines slide up from behind a mask (hero titles)
        if any(k.startswith(path + '/') and (v['t'] or '').endswith('(100%)') for k, v in mot.items()) and not el_kids(n) == []:
            if is_inline_only(n):
                cl.append('f3-rv-lines')
        return ' '.join(cl)

    # ---- responsive merge
    def merged(self, node, fn, responsive_keys=None):
        """Run fn(node_at_vp, w) for each viewport and fold the results into one settings dict."""
        out = {}
        per = {}
        for w in WIDTHS:
            n = node if w == 1440 else self.p.at(node, w)
            if n is None:
                continue
            per[w] = fn(n, w)
        base = per.get(1440) or per.get(1024) or per.get(390) or {}
        out.update(base)
        prev = base
        for w in (1024, 390):
            cur = per.get(w)
            if cur is None:
                continue
            for k, v in cur.items():
                if k in ('__globals__',):
                    continue
                if prev.get(k) != v and (responsive_keys is None or k in responsive_keys or k.rstrip('_') in responsive_keys):
                    out[k + VP[w]] = v
            prev = {**prev, **cur}
        return out

    def hide_flags(self, node):
        s = {}
        for w, key in ((1440, 'hide_desktop'), (1024, 'hide_tablet'), (390, 'hide_mobile')):
            n = self.p.index[w].get(node['_path'])
            if n is None or n.get('hidden') or n['cs'].get('visibility') == 'hidden':
                s[key] = 'hidden-' + key.split('_')[1]
        return s

    def add_extra(self, s, node, key, decls_by_vp):
        v = self.p.vars.get(node.get('_path'))
        if v:
            decls_by_vp = dict(decls_by_vp)
            decls_by_vp[1440] = list(v) + list(decls_by_vp.get(1440) or [])
        if not any(decls_by_vp.values()):
            return
        cls = f'f3x-{eid(self.p.name + node["_path"] + key)}'
        self.extra[cls] = decls_by_vp
        s[key] = (s.get(key, '') + ' ' + cls).strip()

    # ---- sizing of a child inside its parent
    def item_size(self, n, parent, w, is_container):
        cs, au = n['cs'], n.get('au', {})
        pcs = parent['cs'] if parent else None
        s = {}
        pre = '' if is_container else '_'
        pdisp = pcs['display'] if pcs else 'block'
        prow = (pdisp in ('flex', 'inline-flex') and pcs['flexDirection'].startswith('row')) or pdisp == 'table-row'
        pgrid = pdisp in ('grid', 'inline-grid')
        width = au.get('width')
        maxw = au.get('max-width')
        flex = au.get('flex')
        grow = float(cs['flexGrow'] or 0)
        noshrink = cs.get('flexShrink') == '0'
        if pdisp == 'table-row' and parent['rect'][2] > 0:
            width = f"{round(n['rect'][2] / parent['rect'][2] * 100, 3)}%"
            flex = None
        if prow and not noshrink:
            # Items in an overflowing row (rails, marquees, timelines) never shrank on the old site.
            sib = [k for k in visible_kids(parent) if k.get('cs', {}).get('position') not in ('absolute', 'fixed')]
            gap = px(pcs.get('columnGap')) if pcs.get('columnGap') not in (None, 'normal') else 0
            ppad = spacing(pcs, 'padding')
            inner = parent['rect'][2] - ppad[1] - ppad[3]
            total = sum(k['rect'][2] for k in sib) + gap * max(len(sib) - 1, 0)
            if inner > 0 and total > inner + 2:
                noshrink = True
            if (parent.get('au') or {}).get('width', '').strip() in ('max-content', 'fit-content') or pcs.get('overflowX') in ('auto', 'scroll'):
                noshrink = True
            aw = au.get('width', '')
            if re.match(r'^[\d.]+px$', aw.strip()) and abs(px(aw) - n['rect'][2]) <= 1:
                noshrink = True
        # 'flex: 0 1 650px' -> a 650px basis that may still shrink
        fm = re.match(r'^\s*(\S+)\s+(\S+)\s+(.+?)\s*$', flex or '')
        fparts = [fm.group(1), fm.group(2), fm.group(3)] if fm else (flex or '').split()
        basis = fparts[2] if len(fparts) == 3 and fparts[2] not in ('0', '0px', '0%', 'auto') else None
        if prow and not width and len(fparts) == 3 and re.match(r'^[\d.]+(px|%)$', fparts[2]) and fparts[0] in ('0', '0.0'):
            width = fparts[2]
        full_abs = False
        if cs['position'] == 'absolute':
            ins = (au.get('inset') or '').strip()
            full_abs = ins in ('0', '0px') or all(au.get(k) in ('0', '0px') for k in ('top', 'left', 'right', 'bottom'))
            width = '100%' if full_abs else (width or f"{n['rect'][2]}px")

        def width_value(v):
            v = v.strip()
            if v.endswith('%'):
                return size(float(v[:-1]), '%')
            if re.match(r'^-?[\d.]+px$', v):
                return size(px(v))
            if 'var(' in v:
                return size(n['rect'][2])
            return custom(v)

        if is_container:
            if prow and (grow > 0 or (flex and flex.split()[0] not in ('0', 'none'))):
                s['_flex_size'] = 'grow'
                s['width'] = custom('auto') if not width else width_value(width)
                if not width:
                    s['width'] = custom(basis) if basis else custom('0')
                    s['_flex_size'] = 'custom'
                    s['_flex_grow'] = num(grow or 1)
                    s['_flex_shrink'] = 1
            elif width and width not in ('auto',):
                s['width'] = width_value(width)
                if (prow and noshrink) or cs['position'] == 'absolute':
                    s['_flex_size'] = 'none'
            elif prow or (pcs and pcs['alignItems'] not in ('normal', 'stretch') and not pgrid
                          and cs['alignSelf'] in ('auto', 'normal')) or cs['alignSelf'] not in ('auto', 'normal', 'stretch') \
                    or cs['display'] in ('inline-flex', 'inline-block', 'inline-grid'):
                s['width'] = custom('auto' if not maxw else f'min(100%, {maxw})')
                if noshrink or not prow:
                    s['_flex_size'] = 'none'
            else:
                s['width'] = custom('100%' if not maxw else f'min(100%, {maxw})')
            if maxw and 'width' in s and s['width'].get('unit') != 'custom':
                s['width'] = custom(f"min({s['width']['size']}{s['width']['unit']}, {maxw})")
        else:
            if prow and (grow > 0 or (flex and flex.split()[0] not in ('0', 'none'))):
                s['_flex_size'] = 'grow'
                s['_element_width'] = 'initial'
                s['_element_custom_width'] = (custom(basis) if basis else custom('0')) if not width else width_value(width)
            elif width and width != 'auto' and n['tag'] not in ('img', 'svg', 'video'):
                s['_element_width'] = 'initial'
                s['_element_custom_width'] = width_value(width)
                if maxw:
                    s['_element_custom_width'] = custom(f'min(100%, {maxw})') if width.endswith('%') else s['_element_custom_width']
            elif maxw and n['tag'] not in ('img', 'svg', 'video'):
                s['_element_width'] = 'initial'
                s['_element_custom_width'] = custom(f'min(100%, {maxw})')
            elif prow or (pcs and pcs['alignItems'] not in ('normal', 'stretch') and not pgrid) \
                    or cs['alignSelf'] not in ('auto', 'normal', 'stretch') or cs['display'] in ('inline-flex', 'inline-block'):
                s['_element_width'] = 'auto'
            else:
                s['_element_width'] = 'inherit'
            if prow and noshrink:
                s['_flex_size'] = s.get('_flex_size') or 'none'
        if cs['alignSelf'] not in ('auto', 'normal'):
            a = {'flex-start': 'flex-start', 'start': 'flex-start', 'flex-end': 'flex-end', 'end': 'flex-end',
                 'center': 'center', 'stretch': 'stretch'}.get(cs['alignSelf'])
            if a:
                s['_flex_align_self'] = a
        if cs['order'] not in ('0', 0):
            s['_flex_order'] = 'custom'
            s['_flex_order_custom'] = int(cs['order'])
        # grid placement
        if pgrid:
            gc = au.get('grid-column', '')
            m = re.match(r'span\s+(\d+)', gc) or re.match(r'^\s*1\s*/\s*-1\s*$', gc)
            if gc and m:
                s[f'{pre}grid_column'] = 'custom'
                s[f'{pre}grid_column_custom'] = gc.strip()
        # absolute position
        if cs['position'] == 'absolute':
            s[f'{pre}position'] = 'absolute'
            for side_h in ('left', 'right'):
                v = au.get(side_h)
                if v is None and au.get('inset'):
                    v = au['inset'].split()[3 if side_h == 'left' else 1] if len(au['inset'].split()) == 4 else au['inset'].split()[0]
                if v is not None and v != 'auto':
                    s['_offset_orientation_h'] = 'start' if side_h == 'left' else 'end'
                    key = '_offset_x' if side_h == 'left' else '_offset_x_end'
                    s[key] = size(float(v[:-1]), '%') if v.endswith('%') else size(px(cs[side_h]))
                    break
            for side_v in ('top', 'bottom'):
                v = au.get(side_v)
                if v is None and au.get('inset'):
                    v = au['inset'].split()[0] if side_v == 'top' else (au['inset'].split()[2] if len(au['inset'].split()) >= 3 else au['inset'].split()[0])
                if v is not None and v != 'auto':
                    s['_offset_orientation_v'] = 'start' if side_v == 'top' else 'end'
                    key = '_offset_y' if side_v == 'top' else '_offset_y_end'
                    s[key] = size(float(v[:-1]), '%') if v.endswith('%') else size(px(cs[side_v]))
                    break
        if full_abs:
            s['_xtra'] = ['inset:0', 'height:100%']
        z = cs['zIndex']
        if z not in ('auto', None):
            s['z_index' if is_container else '_z_index'] = int(z)
        # margins (auto margins become alignment)
        m = spacing(cs, 'margin')
        auto_l = 'auto' in (au.get('margin-left', '') + au.get('margin-inline', '') + au.get('margin', ''))
        if auto_l and not prow:
            s['_flex_align_self'] = 'center'
            m[1] = m[3] = 0
        if any(m):
            s['margin' if is_container else '_margin'] = dims(*m)
        else:
            s['margin' if is_container else '_margin'] = dims(0, 0, 0, 0)
        return s

    # ---- containers
    def container(self, n, parent, kids_override=None):
        def fn(x, w):
            cs, au = x['cs'], x.get('au', {})
            px_parent = parent if w == 1440 else (self.p.at(parent, w) if parent else None)
            s = {'content_width': 'full'}
            d = cs['display']
            if d in ('grid', 'inline-grid'):
                s['container_type'] = 'grid'
                gtc = au.get('grid-template-columns') or ''
                tracks = cs['gridTemplateColumns'].split()
                mrep = re.match(r'^repeat\((\d+),\s*(minmax\(0(px)?,\s*)?1fr\)?\)$', gtc.strip())
                if mrep:
                    s['grid_columns_grid'] = size(int(mrep.group(1)), 'fr')
                elif tracks and len(set(tracks)) == 1 and gtc and 'px' not in gtc:
                    s['grid_columns_grid'] = size(len(tracks), 'fr')
                elif gtc and 'var(' not in gtc:
                    s['grid_columns_grid'] = custom(gtc)
                else:
                    s['grid_columns_grid'] = size(len(tracks), 'fr') if len(set(tracks)) == 1 else custom(' '.join(tracks))
                rows = len(cs['gridTemplateRows'].split()) if cs['gridTemplateRows'] != 'none' else 1
                s['grid_rows_grid'] = custom('auto') if True else size(rows, 'fr')
                rg, cg = px(cs['rowGap']), px(cs['columnGap'])
                s['grid_gaps'] = {'unit': 'px', 'column': str(num(cg)), 'row': str(num(rg)), 'isLinked': rg == cg}
                s['grid_auto_flow'] = 'row'
                ai = cs['alignItems']
                s['grid_align_items'] = {'center': 'center', 'start': 'start', 'flex-start': 'start', 'end': 'end'}.get(ai, 'stretch')
            else:
                s['container_type'] = 'flex'
                if d in ('flex', 'inline-flex'):
                    s['flex_direction'] = cs['flexDirection']
                    jc = cs['justifyContent']
                    s['flex_justify_content'] = {'normal': 'flex-start', 'start': 'flex-start', 'end': 'flex-end',
                                                 'left': 'flex-start'}.get(jc, jc)
                    ai = cs['alignItems']
                    s['flex_align_items'] = {'normal': 'stretch', 'start': 'flex-start', 'end': 'flex-end',
                                             'baseline': 'baseline'}.get(ai, ai)
                    s['flex_wrap'] = 'wrap' if cs['flexWrap'] == 'wrap' else 'nowrap'
                    rg, cg = px(cs['rowGap']), px(cs['columnGap'])
                elif d == 'table-row':
                    # table rows become rows of fixed-share cells
                    s['flex_direction'] = 'row'
                    s['flex_justify_content'] = 'flex-start'
                    s['flex_align_items'] = 'stretch'
                    s['flex_wrap'] = 'nowrap'
                    rg = cg = 0
                else:
                    s['flex_direction'] = 'column'
                    s['flex_justify_content'] = 'flex-start'
                    s['flex_align_items'] = 'stretch'
                    s['flex_wrap'] = 'nowrap'
                    rg = cg = 0
                s['flex_gap'] = {'unit': 'px', 'size': num(cg if s['flex_direction'].startswith('row') else rg),
                                 'column': str(num(cg)), 'row': str(num(rg)), 'isLinked': rg == cg}
            s['padding'] = dims(*spacing(cs, 'padding'))
            mh = au.get('min-height') or au.get('height')
            if mh and mh not in ('auto', '0', '0px') and not mh.endswith('%'):
                s['min_height'] = size(px(cs['height'] if au.get('height') else cs['minHeight']) or x['rect'][3]) if 'px' in mh and 'calc' not in mh else custom(mh)
            elif mh is None or mh in ('auto', '0', '0px'):
                s['min_height'] = size(0)
            vk = visible_kids(x)
            only_abs = bool(vk) and all(k['cs'].get('position') in ('absolute', 'fixed') for k in vk)
            if (not vk or only_abs or cs['position'] == 'absolute') and x['rect'][3] > 0 and s.get('min_height', size(0)) == size(0):
                # empty decorative boxes (lines, dots, glows) keep their drawn height
                s['min_height'] = size(x['rect'][3])
            if cs['overflow'] == 'hidden' or cs['overflowX'] == 'hidden':
                s['overflow'] = 'hidden'
            s.update(self.item_size(x, px_parent, w, True))
            b, extra = box_settings(cs, '')
            s.update(b)
            s['_extra'] = extra + s.pop('_xtra', [])
            return s

        s = self.merged(n, fn)
        # Elementor forces containers to 100% wide on mobile unless width_mobile is set explicitly.
        if 'width' in s and 'width_mobile' not in s and self.p.at(n, 390) is not None:
            eff = s.get('width_tablet', s['width'])
            m = self.p.at(n, 390)
            mp = self.p.at(parent, 390) if parent else None
            content_sized = False
            if mp is not None:
                ppad = spacing(mp['cs'], 'padding')
                content_sized = m['rect'][2] < mp['rect'][2] - ppad[1] - ppad[3] - 2
            if eff == custom('auto'):
                if content_sized:
                    s['width_mobile'] = eff
            elif eff not in (size(100, '%'), custom('100%')):
                s['width_mobile'] = eff
        # ...and grids to a single column on mobile unless grid_columns_grid_mobile is set.
        if 'grid_columns_grid' in s and 'grid_columns_grid_mobile' not in s and self.p.at(n, 390) is not None:
            s['grid_columns_grid_mobile'] = s.get('grid_columns_grid_tablet', s['grid_columns_grid'])
        extra = {w: s.pop('_extra' + VP[w], None) for w in (1024, 390)}
        extra[1440] = s.pop('_extra', [])
        nowrap_reset(n, extra, self.p)
        tag = n['tag']
        if tag == 'a' and n['attrs'].get('href'):
            s['html_tag'] = 'a'
            s['link'] = link(n['attrs']['href'])
        elif tag in ('section', 'header', 'footer', 'nav', 'article', 'aside', 'main', 'figure', 'ul', 'ol', 'li'):
            s['html_tag'] = {'ul': 'div', 'ol': 'div', 'li': 'div', 'figure': 'div'}.get(tag, tag)
        cl = self.node_classes(n)
        if cl:
            s['css_classes'] = cl
        if n['attrs'].get('id'):
            s['_element_id'] = n['attrs']['id']
        if any(extra.values()) or self.p.vars.get(n['_path']):
            self.add_extra(s, n, 'css_classes', {w: extra.get(w) or [] for w in WIDTHS})
        s.update(self.hide_flags(n))
        kids = kids_override if kids_override is not None else self.children(n)
        return {'id': eid(self.p.name + n['_path']), 'elType': 'container', 'isInner': parent is not None,
                'settings': s, 'elements': kids}

    def children(self, n):
        out = []
        run = []
        for k in n.get('kids', []):
            if 'text' in k:
                if not k.get('ws'):
                    run.append(k)
                continue
            if run:
                out.append(self.text_run(n, run))
                run = []
            if k.get('hidden'):
                # maybe visible at another viewport
                alt = None
                for w in (1024, 390):
                    a = self.p.index[w].get(k['_path'])
                    if a is not None and not a.get('hidden'):
                        alt = a
                        break
                if alt is None:
                    continue
                k = self.p.index[1440][k['_path']] = self._clone_for_desktop(alt)
            out.extend(self.convert(k, n))
        if run:
            out.append(self.text_run(n, run))
        return [o for o in out if o]

    def _clone_for_desktop(self, alt):
        return alt

    def text_run(self, parent, run):
        txt = html.escape(' '.join(r['text'].strip() for r in run))
        s = typo(parent['cs'])
        global_color(s, 'text_color', color(parent['cs']['color']))
        s['editor'] = txt
        s['_element_width'] = 'auto'
        return {'id': eid(self.p.name + parent['_path'] + txt), 'elType': 'widget', 'widgetType': 'text-editor', 'settings': s, 'elements': []}

    # ---- widgets
    def widget_common(self, n, parent, extra_fn=None):
        def fn(x, w):
            pp = parent if w == 1440 else (self.p.at(parent, w) if parent else None)
            s = self.item_size(x, pp, w, False)
            pad = spacing(x['cs'], 'padding')
            if any(pad):
                s['_padding'] = dims(*pad)
            b, extra = box_settings(x['cs'], '_')
            s.update(b)
            hv = x.get('au', {}).get('height')
            if hv and re.match(r'^[\d.]+px$', hv.strip()) and x['cs']['display'] in ('grid', 'flex', 'inline-grid', 'inline-flex'):
                # fixed-size badges/circles with centred text (e.g. journey milestones)
                extra += [f"height:{hv.strip()}", 'display:grid', 'place-items:center', 'box-sizing:border-box']
            if extra_fn:
                s.update(extra_fn(x, w))
            s['_extra'] = extra + s.pop('_xtra', [])
            return s
        s = self.merged(n, fn)
        extra = {w: s.pop('_extra' + VP[w], None) or [] for w in (1024, 390)}
        extra[1440] = s.pop('_extra', [])
        nowrap_reset(n, extra, self.p)
        cl = self.node_classes(n)
        if cl:
            s['_css_classes'] = cl
        if n['attrs'].get('id'):
            s['_element_id'] = n['attrs']['id']
        if any(extra.values()) or self.p.vars.get(n['_path']):
            self.add_extra(s, n, '_css_classes', extra)
        s.update(self.hide_flags(n))
        return s

    def text_widget(self, n, parent):
        tag = n['tag']
        heading = tag in ('h1', 'h2', 'h3', 'h4', 'h5', 'h6')
        para = tag in ('p', 'li', 'blockquote', 'dd')

        def fn(x, w):
            s = typo(x['cs'])
            al = x['cs']['textAlign']
            s['align'] = {'start': 'left', 'left': 'left', 'center': 'center', 'right': 'right', 'end': 'right', 'justify': 'justify'}.get(al, 'left')
            return s
        s = self.widget_common(n, parent, fn)
        c = color(n['cs']['color'])
        content = inner_html(n, n['cs'])
        if heading or not para:
            s['title'] = content
            s['header_size'] = tag if heading else ('p' if tag == 'p' else ('span' if n['cs']['display'].startswith('inline') else 'div'))
            global_color(s, 'title_color', c)
            if tag == 'a' and n['attrs'].get('href'):
                s['link'] = link(n['attrs']['href'])
            wt = 'heading'
        else:
            s['editor'] = content
            global_color(s, 'text_color', c)
            s['paragraph_spacing'] = size(0)
            wt = 'text-editor'
        return {'id': eid(self.p.name + n['_path']), 'elType': 'widget', 'widgetType': wt, 'settings': s, 'elements': []}

    def image_widget(self, n, parent, svg_key=None):
        key = svg_key or media_key(n['attrs'].get('currentSrc') or n['attrs'].get('src'))
        if not key:
            return None

        def fn(x, w):
            s = {}
            au = x.get('au', {})
            wv = au.get('width')
            if wv and wv.endswith('%'):
                s['width'] = size(float(wv[:-1]), '%')
            elif x['rect'][2]:
                s['width'] = size(x['rect'][2])
            hv = au.get('height')
            if (hv and hv != 'auto') or x['cs']['objectFit'] != 'fill' or au.get('aspect-ratio'):
                s['height'] = size(x['rect'][3])
                s['object-fit'] = x['cs']['objectFit'] if x['cs']['objectFit'] in ('cover', 'contain', 'fill') else 'cover'
                if x['cs']['objectPosition'] not in ('50% 50%',):
                    s['object-position'] = 'custom' if False else 'center center'
            if svg_key and (not wv or not wv.endswith('%')):
                s['width'] = size(x['rect'][2])
            radii = [px(x['cs'][k]) for k in ('borderTopLeftRadius', 'borderTopRightRadius', 'borderBottomRightRadius', 'borderBottomLeftRadius')]
            if any(radii):
                s['image_border_radius'] = dims(*radii)
            s['align'] = 'left'
            return s
        s = self.widget_common(n, parent, fn)
        # image radius is set on the img; drop wrapper radius copy
        s.pop('_border_radius', None)
        s['image'] = media(key)
        s['image_size'] = 'full'
        if n['attrs'].get('alt'):
            pass
        return {'id': eid(self.p.name + n['_path']), 'elType': 'widget', 'widgetType': 'image', 'settings': s, 'elements': []}

    def button_widget(self, n, parent):
        icon = next((k for k in visible_kids(n) if k['tag'] == 'svg'), None)

        def fn(x, w):
            cs = x['cs']
            s = typo(cs)
            s['text_padding'] = dims(*spacing(cs, 'padding'))
            s['align'] = ''
            pp = parent if w == 1440 else (self.p.at(parent, w) if parent else None)
            if pp:
                pad = spacing(pp['cs'], 'padding')
                inner = pp['rect'][2] - pad[1] - pad[3]
                if inner > 0 and x['rect'][2] >= inner - 2 and x['rect'][2] > 120:
                    # full-width buttons (mobile hero/CTA rows)
                    s['align'] = 'justify'
                    s['_element_width'] = 'inherit'
                    s['_flex_size'] = 'none'
            return s
        s = self.widget_common(n, parent, fn)
        # move box styling from wrapper onto the button itself
        for k in list(s.keys()):
            if k.startswith('_background') or k.startswith('_border') or k.startswith('_box_shadow') or k.startswith('_padding'):
                s.pop(k)
        cs = n['cs']
        b, _ = box_settings(cs, '')
        if b.get('background_background') == 'classic':
            global_color(s, 'background_color', b.get('background_color'))
            s['background_background'] = 'classic'
        else:
            s['background_background'] = 'classic'
            s['background_color'] = 'rgba(0,0,0,0)'
        for k in ('border_border', 'border_width', 'border_color', 'border_radius'):
            if k in b:
                s[k] = b[k]
        if 'border_radius' not in s:
            s['border_radius'] = dims(0, 0, 0, 0)
        if 'box_shadow_box_shadow' in b:
            s['button_box_shadow_box_shadow_type'] = 'yes'
            s['button_box_shadow_box_shadow'] = b['box_shadow_box_shadow']
        global_color(s, 'button_text_color', color(cs['color']))
        s['text'] = html.escape(re.sub(r'\s+', ' ', text_of(n)).strip())
        if n['attrs'].get('href'):
            s['link'] = link(n['attrs']['href'])
        if icon:
            s['selected_icon'] = {'value': {'url': '@@url:' + save_svg(icon['svg']), 'id': '@@id:' + save_svg(icon['svg'])}, 'library': 'svg'}
            kids = n.get('kids', [])
            icon_first = kids.index(icon) < max((i for i, k in enumerate(kids) if 'text' in k and not k.get('ws')), default=0)
            s['icon_align'] = 'row' if icon_first else 'row-reverse'
            s['icon_indent'] = size(px(cs['columnGap']) if cs['columnGap'] != 'normal' else 6)
        cl = classes(n)
        hover = {'btn--primary': ('#3b6fe3', None), 'btn--outline': (None, 'rgba(74,125,238,0.08)'),
                 'btn--ghost': (None, 'rgba(255,255,255,0.1)')}
        for c, (hbg, hbg2) in hover.items():
            if c in cl:
                s['button_background_hover_background'] = 'classic'
                s['button_background_hover_color'] = hbg or hbg2
                s['hover_color'] = s.get('button_text_color')
        return {'id': eid(self.p.name + n['_path']), 'elType': 'widget', 'widgetType': 'button', 'settings': s, 'elements': []}

    def icon_list(self, n, parent):
        items = [k for k in visible_kids(n)]
        first = items[0]
        dot = first.get('before')

        def fn(x, w):
            xi = [k for k in visible_kids(x)]
            if not xi:
                return {}
            f = xi[0]
            fk = visible_kids(f)
            tnode = fk[0] if len(fk) == 1 and fk[0]['tag'] in ('a', 'span', 'strong') else f
            s = typo(tnode['cs'], 'icon_typography_')
            s['space_between'] = size(px(x['cs']['rowGap']) if x['cs']['rowGap'] != 'normal' else (xi[1]['rect'][1] - f['rect'][1] - f['rect'][3] if len(xi) > 1 else 0))
            if dot:
                s['icon_size'] = size(px(f['before']['width']) or 6)
                s['text_indent'] = size(px(f['cs']['columnGap']) if f['cs']['columnGap'] not in ('normal',) else 10)
            return s
        s = self.widget_common(n, parent, fn)
        global_color(s, 'text_color', color(first['cs']['color']))
        if dot:
            global_color(s, 'icon_color', color(dot['bg']))
            s['icon_self_vertical_align'] = 'center' if first['cs']['alignItems'] == 'center' else 'flex-start'
            if s['icon_self_vertical_align'] == 'flex-start':
                lh = px(first['cs']['lineHeight']) or px(first['cs']['fontSize']) * 1.4
                s['icon_vertical_offset'] = size(round((lh - (px(dot['width']) or 6)) / 2, 1))
        lst = []
        for i, li in enumerate(items):
            a = next((k for k in visible_kids(li) if k['tag'] == 'a'), None)
            it = {'_id': eid(self.p.name + li['_path']), 'text': inner_html(a or li, (a or li)['cs']),
                  'selected_icon': {'value': 'fas fa-circle', 'library': 'fa-solid'} if dot else {'value': '', 'library': ''}}
            if a is not None and a['attrs'].get('href'):
                it['link'] = link(a['attrs']['href'])
                global_color(s, 'text_color', color(a['cs']['color']))
            lst.append(it)
        s['icon_list'] = lst
        s['view'] = 'traditional'
        return {'id': eid(self.p.name + n['_path']), 'elType': 'widget', 'widgetType': 'icon-list', 'settings': s, 'elements': []}

    def video_widget(self, n, parent):
        srcs = [k['attrs'].get('src') for k in el_kids(n) if k.get('tag') == 'source'] + [n['attrs'].get('src')]
        mp4 = next((x for x in srcs if x and x.endswith('.mp4')), None) or next((x for x in srcs if x), None)
        key = media_key(mp4)
        s = self.widget_common(n, parent)
        s.update({'video_type': 'hosted', 'insert_url': '', 'hosted_url': media(key), 'autoplay': 'yes', 'mute': 'yes', 'loop': 'yes',
                  'controls': '', 'play_on_mobile': 'yes'})
        return {'id': eid(self.p.name + n['_path']), 'elType': 'widget', 'widgetType': 'video', 'settings': s, 'elements': []}

    def shortcode(self, n, parent, code):
        s = self.widget_common(n, parent)
        s['shortcode'] = code
        return {'id': eid(self.p.name + n['_path']), 'elType': 'widget', 'widgetType': 'shortcode', 'settings': s, 'elements': []}

    # ---- dispatch
    def convert(self, n, parent):
        tag = n['tag']
        cl = classes(n)
        hook = SPECIAL.get(next((c for c in cl if c in SPECIAL), None))
        if hook:
            r = hook(self, n, parent)
            if r is not None:
                return r if isinstance(r, list) else [r]
        if tag == 'svg':
            key = save_svg(n['svg'])
            return [self.image_widget(n, parent, svg_key=key)]
        if tag == 'img':
            w = self.image_widget(n, parent)
            return [w] if w else []
        if tag == 'video':
            return [self.video_widget(n, parent)]
        if tag == 'form':
            return [self.shortcode(n, parent, '[folio3_contact_form]')]
        if tag in ('br', 'source', 'canvas', 'input', 'textarea', 'select'):
            return []
        kids = visible_kids(n)
        # button-like link/control
        if tag in ('a', 'button') and ('btn' in cl or any(c.endswith('__btn') or c.endswith('-btn') or c.endswith('__cta') for c in cl)) \
                and all(k['tag'] in ('svg', 'span') for k in kids):
            return [self.button_widget(n, parent)]
        # text leaf
        if (has_text(n) or kids) and is_inline_only(n) and text_of(n).strip():
            if boxy(n) and tag in ('a',) and n['cs']['display'] in ('inline-flex', 'flex', 'inline-block'):
                return [self.button_widget(n, parent)]
            return [self.text_widget(n, parent)]
        # list of text items -> icon list
        if tag in ('ul', 'ol') and kids and all(k['tag'] == 'li' for k in kids) and \
                all(is_inline_only(k) or (len(visible_kids(k)) == 1 and visible_kids(k)[0]['tag'] == 'a' and is_inline_only(visible_kids(k)[0]) and not has_text(k)) for k in kids) \
                and all(not boxy(k) for k in kids):
            return [self.icon_list(n, parent)]
        # collapse plain wrappers with a single child and no styling
        if not kids and not has_text(n):
            if boxy(n) or n['rect'][2] > 0 and n['rect'][3] > 0 and (n['cs']['backgroundColor'] != 'rgba(0, 0, 0, 0)' or n.get('after') or n.get('before')):
                return [self.container(n, parent, kids_override=[])]
            return []
        return [self.container(n, parent)]


# on-load / in-view timings from the Framer components: class -> (delay s, duration s, easing)
SPRING = 'cubic-bezier(0.34,1.56,0.64,1)'
TIMING = {
    'hero__lede': (0.45, 0.6, ''), 'hero__actions': (0.55, 0.6, ''), 'hero__dash': (0.6, 0.9, ''), 'hero__handle': (1.9, 0.6, SPRING),
    'badge--clients': (1.15, 0.6, SPRING), 'badge--sla': (1.25, 0.6, SPRING), 'badge--support': (1.35, 0.6, SPRING), 'badge--response': (1.45, 0.6, SPRING),
    'page-hero__title': (0.1, 0.7, ''), 'page-hero__lede': (0.3, 0.5, ''), 'page-hero__actions': (0.4, 0.5, ''),
    'ty-badge__halo': (0.1, 0.6, ''), 'ty-badge__core': (0, 0.6, SPRING), 'ty-track': (0.3, 0.5, ''), 'ty-hero__actions': (0.42, 0.5, ''),
    'ty-hero__word': (0.3, 1.6, ''),
}


# special-case hooks keyed by original class name
SPECIAL = {}


def special(*names):
    def deco(fn):
        for nm in names:
            SPECIAL[nm] = fn
        return fn
    return deco


def extra_css(conv):
    out = []
    mq = {1440: None, 1024: '(max-width: 1024px)', 390: '(max-width: 767px)'}
    for cls, by in conv.extra.items():
        for w in WIDTHS:
            decls = by.get(w)
            if not decls:
                continue
            rule = f'.{cls}{{{";".join(decls)}}}'
            out.append(rule if not mq[w] else f'@media {mq[w]}{{{rule}}}')
    for cls, (o, t, d, dur, ease) in conv.motion_css.items():
        st = []
        if o is not None:
            st.append(f'opacity:{o}')
        if t:
            st.append(f'transform:{t}')
        vars_ = (f'--f3d:{d}s;' if d else '') + (f'--f3t:{dur}s;' if dur != 0.5 else '') + (f'--f3e:{ease};' if ease else '')
        out.append(f'html.f3-js .{cls}:not(.f3-in){{{";".join(st)}}}' + (f'.{cls}{{{vars_}}}' if vars_ else ''))
    return '\n'.join(out)


def convert_page(exdir, name, root_selector='main'):
    page = Page(exdir, name)
    conv = Converter(page)
    body = page.trees[1440]

    def find(n, tag):
        if n.get('tag') == tag:
            return n
        for k in el_kids(n):
            if k.get('hidden'):
                continue
            r = find(k, tag)
            if r:
                return r
        return None
    root = find(body, root_selector)
    sections = []
    if root_selector != 'main':
        sections = conv.convert(root, None)
        for s in sections:
            s['isInner'] = False
        return sections, extra_css(conv)
    for k in visible_kids(root):
        sections.extend(conv.convert(k, None))
    for s in sections:
        s['isInner'] = False
    return sections, extra_css(conv)



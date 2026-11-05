"""One media file per icon shape.

Many icons in the design are the same drawing in a different colour (or, once, a slightly different
stroke). Each such group is replaced by a single canonical SVG (assets/svg/ic-<sig>.svg). Image widgets
that show a group member point at the canonical file and get two classes: f3ic-<sig> (paints the
img with a CSS mask of the icon) and f3icc-<hex> (the colour). So the colour lives in CSS, and the
media library holds one file per shape.
"""
import glob
import hashlib
import os
import re

ROOT = os.path.dirname(os.path.abspath(__file__))
SVG_DIR = os.path.join(ROOT, '..', 'assets', 'svg')
PUB_ICONS = os.path.join(ROOT, '..', '..', 'public', 'icons')
NAMED = {'white': 'ffffff', 'black': '000000'}
COLOR_ATTR = re.compile(r'(fill|stroke|stop-color|color)="((?!none)[^"]*)"')


def hexcol(v):
    v = v.strip().lower()
    if v in NAMED:
        return NAMED[v]
    m = re.match(r'#([0-9a-f]{3})$', v)
    if m:
        return ''.join(c * 2 for c in m.group(1))
    m = re.match(r'#([0-9a-f]{6})$', v)
    if m:
        return m.group(1)
    m = re.match(r'rgba?\(\s*(\d+)\D+(\d+)\D+(\d+)', v)
    if m:
        return '%02x%02x%02x' % tuple(int(x) for x in m.groups())
    return None


def signature(t):
    t = re.sub(r'<\?xml[^>]*>|<!--.*?-->', '', t, flags=re.S)
    t = re.sub(r'\s(width|height|class|id|xmlns:\w+|aria-hidden|focusable|fill-rule|clip-rule)="[^"]*"', '', t)
    t = COLOR_ATTR.sub(r'\1="C"', t)
    t = re.sub(r'stroke-width="[^"]*"', 'stroke-width="W"', t)
    t = re.sub(r'url\(#[^)]*\)', 'url(#X)', t)
    t = re.sub(r'>\s+<', '><', t)
    t = re.sub(r'\s+', ' ', t).strip()
    t = re.sub(r'<(path|circle|rect|line|polyline|polygon|ellipse)([^>]*)/>', r'<\1\2></\1>', t)
    return hashlib.md5(t.encode()).hexdigest()[:10]


def _files():
    out = {}
    for f in glob.glob(os.path.join(PUB_ICONS, '*.svg')):
        out['icons/' + os.path.basename(f)] = f
    for f in glob.glob(os.path.join(SVG_DIR, '*.svg')):
        if not os.path.basename(f).startswith('ic-'):
            out['svg/' + os.path.basename(f)] = f
    return out


def _build():
    groups = {}
    for key, f in sorted(_files().items()):
        t = open(f).read()
        cols = {hexcol(v) for _, v in COLOR_ATTR.findall(t)}
        if len(cols) != 1 or None in cols:
            continue  # only single-colour icons can be recoloured with one CSS colour
        groups.setdefault(signature(t), []).append((key, f, cols.pop()))
    lookup = {}
    for sig, members in groups.items():
        if len(members) < 2:
            continue
        canon = os.path.join(SVG_DIR, f'ic-{sig}.svg')
        src = open(members[0][1]).read()
        # The canonical file is drawn in currentColor; on the site the colour comes from CSS.
        body = COLOR_ATTR.sub(lambda m: f'{m.group(1)}="currentColor"', src)
        if not os.path.exists(canon) or open(canon).read() != body:
            with open(canon, 'w') as fh:
                fh.write(body)
        for key, _, col in members:
            lookup[key] = (f'svg/ic-{sig}.svg', sig, col)
    return lookup


LOOKUP = _build()


def resolve(key):
    """(canonical key, extra classes) for an icon in a shared group, else None."""
    r = LOOKUP.get(key)
    if not r:
        return None
    canon, sig, col = r
    return canon, f'f3ic f3ic-{sig} f3icc-{col}'


def css():
    sigs = sorted({v[1] for v in LOOKUP.values()})
    cols = sorted({v[2] for v in LOOKUP.values()})
    out = ['/* Shared icons: one file per shape, painted with a mask in the colour set by f3icc-* (see converter/icons.py). */',
           '.f3ic img{background-color:var(--f3ic,currentColor);object-position:-99999px 0;'
           '-webkit-mask-position:center;mask-position:center;-webkit-mask-size:contain;mask-size:contain;'
           '-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat}']
    out += [f'.f3ic-{s} img{{-webkit-mask-image:url(@@url:svg/ic-{s}.svg);mask-image:url(@@url:svg/ic-{s}.svg)}}' for s in sigs]
    out += [f'.f3icc-{c}{{--f3ic:#{c}}}' for c in cols]
    return '\n'.join(out) + '\n'

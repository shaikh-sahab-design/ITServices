"""Hand-tuned conversions for components whose behaviour the generic walk can't infer."""
import re

from convert import (color, dims, eid, global_color, html, px, save_svg, size, special, typo, visible_kids, text_of)

CARET = ('<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path opacity="0.4" '
         'd="M15.5179 7L8.48202 7C6.93844 7 5.97669 8.67443 6.75446 10.0077L10.2724 16.0385C11.0441 17.3615 12.9557 17.3615 13.7275 16.0385L17.2454 10.0077C18.0232 8.67443 17.0615 7 15.5179 7Z" fill="#28303F"/></svg>')


def _q_text(it):
    q = next((k for k in visible_kids(it) if 'faq__q' in (k.get('cls') or '')), it)
    return text_of(q).strip()


@special('faq')
def faq(conv, n, parent):
    """FAQ list -> Elementor Accordion (nested-accordion) with one Text Editor per answer."""
    items = [k for k in visible_kids(n) if 'faq__item' in (k.get('cls') or '')]
    if not items:
        return None
    first = items[0]
    q = next(k for k in visible_kids(first) if 'faq__q' in k['cls'])
    q_text_node = next((k for k in visible_kids(q) if k['tag'] == 'span' and 'faq__caret' not in k['cls']), q)
    open_idx = next((i for i, it in enumerate(items) if it['attrs'].get('data-was-open') == '1'), None)
    open_item = items[open_idx] if open_idx is not None else None

    s = conv.widget_common(n, parent)
    s.pop('_css_classes', None)
    s['_css_classes'] = 'f3-faq' + (f' f3-faq-open-{open_idx}' if open_idx is not None else '')
    s.update({
        'items': [{'_id': eid(conv.p.name + it['_path'] + 'item'), 'item_title': html.escape(_q_text(it)), 'element_css_id': ''}
                  for it in items],
        'title_tag': 'div', 'faq_schema': 'yes', 'default_state': 'all_collapsed', 'max_items_expended': 'one',
        'n_accordion_animation_duration': size(300, 'ms'),
        'accordion_item_title_position_horizontal': 'stretch',
        'accordion_item_title_icon_position': 'end',
        'accordion_item_title_icon': {'value': {'url': '@@url:' + save_svg(CARET), 'id': '@@id:' + save_svg(CARET)}, 'library': 'svg'},
        'accordion_item_title_icon_active': {'value': {'url': '@@url:' + save_svg(CARET), 'id': '@@id:' + save_svg(CARET)}, 'library': 'svg'},
        'accordion_item_title_space_between': size(10),
        'accordion_item_title_distance_from_content': size(0),
        'accordion_background_normal_background': 'classic', 'accordion_background_normal_color': '#ffffff',
        'accordion_border_normal_border': 'solid', 'accordion_border_normal_width': dims(1, 1, 1, 1),
        'accordion_border_normal_color': '#41444e',
        'accordion_border_hover_border': 'solid', 'accordion_border_hover_width': dims(1, 1, 1, 1), 'accordion_border_hover_color': '#41444e',
        'accordion_border_active_border': 'solid', 'accordion_border_active_width': dims(1, 1, 1, 1), 'accordion_border_active_color': '#4a7dee',
        'accordion_border_radius': dims(6, 6, 6, 6), 'accordion_padding': dims(10, 10, 10, 10),
        'normal_title_color': '#0c0e16', 'hover_title_color': '#4a7dee', 'active_title_color': '#4a7dee',
        'icon_size': size(24), 'icon_spacing': size(10), 'normal_icon_color': '#9a9ca5', 'hover_icon_color': '#4a7dee', 'active_icon_color': '#9a9ca5',
        'content_padding': dims(0, 10, 10, 10),
    })
    s.update(typo(q_text_node['cs'], 'title_typography_'))
    # answer typography from the open answer if any
    ans_style = None
    if open_item is not None:
        a = next((k for k in visible_kids(open_item) if 'faq__a' in k['cls']), None)
        p = visible_kids(a)[0] if a and visible_kids(a) else None
        ans_style = p['cs'] if p else None
    children = []
    for it in items:
        answer = it['attrs'].get('data-answer') or ''
        answer = re.sub(r'^<p>(.*)</p>$', r'\1', answer.strip(), flags=re.S)
        te = {'editor': answer, 'text_color': '#41444e', '_element_width': 'inherit', 'paragraph_spacing': size(0),
              'typography_typography': 'custom', 'typography_font_family': 'Inter', 'typography_font_size': size(14),
              'typography_font_weight': '400', 'typography_line_height': {'unit': 'em', 'size': 1.55, 'sizes': []}}
        if ans_style:
            te.update(typo(ans_style))
            te['text_color'] = color(ans_style['color']) or '#41444e'
        children.append({'id': eid(conv.p.name + it['_path'] + 'c'), 'elType': 'container', 'isInner': True,
                         'settings': {'content_width': 'full', 'container_type': 'flex', 'flex_direction': 'column', 'padding': dims(0, 0, 0, 0),
                                      'flex_gap': {'unit': 'px', 'size': 0, 'column': '0', 'row': '0', 'isLinked': True}},
                         'elements': [{'id': eid(conv.p.name + it['_path'] + 't'), 'elType': 'widget', 'widgetType': 'text-editor',
                                       'settings': te, 'elements': []}]})
    return {'id': eid(conv.p.name + n['_path']), 'elType': 'widget', 'widgetType': 'nested-accordion', 'settings': s, 'elements': children}


def _counter(conv, n, parent):
    """'500+', '99.9%', '11min' -> Counter widget that counts up like the Next.js CountUp."""
    txt = text_of(n).strip()
    m = re.match(r'^([^\d]*)([\d,]+(?:\.\d+)?)(.*)$', txt)
    if not m or n['tag'] not in ('p', 'span', 'div', 'strong'):
        return None
    pre, numtxt, suf = m.group(1), m.group(2), m.group(3)
    # Static values in the old site ("00", "08", "24/7", "360°") don't count up.
    if (len(numtxt) > 1 and numtxt.startswith('0') and '.' not in numtxt) or not re.match(r'^\s*(\+|%|x|min|hrs?|k|m)?\s*$', suf, re.I):
        return None
    value = float(numtxt.replace(',', ''))
    s = conv.widget_common(n, parent)
    s.update({'starting_number': 0, 'ending_number': value, 'prefix': pre, 'suffix': suf,
              'duration': 1600, 'thousand_separator': 'yes' if ',' in numtxt else '', 'thousand_separator_char': ',',
              'title': '', 'number_position': 'start', 'title_position': 'after'})
    s.update(typo(n['cs'], 'typography_number_'))
    global_color(s, 'number_color', color(n['cs']['color']))
    al = n['cs']['textAlign']
    s['number_alignment'] = 'center' if al == 'center' else ('end' if al in ('right', 'end') else 'start')
    return {'id': eid(conv.p.name + n['_path']), 'elType': 'widget', 'widgetType': 'counter', 'settings': s, 'elements': []}


special('stat__value', 'stat-box__value', 'stats-band__value')(_counter)

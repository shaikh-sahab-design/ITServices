"""Hand-built site header: logo, main links, Services mega menu, CTA, and the mobile sheet.

Writes wordpress/data/header.json (an Elementor library template the helper plugin prints above every page).
"""
import json
import os

from convert import custom, dims, eid, link, media, size

ROOT = os.path.dirname(os.path.abspath(__file__))
SERVICES_TS = os.path.join(ROOT, '..', '..', 'lib', 'services.ts')
ROUTES_TS = os.path.join(ROOT, '..', '..', 'lib', 'routes.ts')

_n = [0]


def nid(tag):
    _n[0] += 1
    return eid(f'header-{tag}-{_n[0]}')


def con(elements, cls='', **s):
    base = {'content_width': 'full', 'container_type': 'flex', 'flex_direction': 'column', 'flex_gap': {'unit': 'px', 'size': 0, 'column': '0', 'row': '0', 'isLinked': True},
            'padding': dims(0, 0, 0, 0), 'margin': dims(0, 0, 0, 0), 'width': custom('100%'), 'min_height': size(0)}
    base.update(s)
    if cls:
        base['css_classes'] = cls
    return {'id': nid('c'), 'elType': 'container', 'isInner': True, 'settings': base, 'elements': elements}


def typo(family, sz, weight, lh, **extra):
    t = {'typography_typography': 'custom', 'typography_font_family': family, 'typography_font_size': size(sz),
         'typography_font_weight': str(weight), 'typography_line_height': size(lh)}
    t.update(extra)
    return t


def heading(text, href=None, cls='', tag='div', color='#0c0e16', **s):
    st = {'title': text, 'header_size': tag, 'title_color': color, '_element_width': 'auto'}
    if href:
        st['link'] = link(href)
    st.update(s)
    if cls:
        st['_css_classes'] = cls
    return {'id': nid('h'), 'elType': 'widget', 'widgetType': 'heading', 'settings': st, 'elements': []}


def button(text, href, cls='', bg='#4a7dee', fg='#ffffff', sz=14, lh=17, **s):
    st = {'text': text, 'link': link(href), 'background_background': 'classic', 'background_color': bg, 'button_text_color': fg,
          'hover_color': fg, 'button_background_hover_background': 'classic', 'button_background_hover_color': '#3b6fe3' if bg == '#4a7dee' else bg,
          'border_radius': dims(8, 8, 8, 8), 'text_padding': dims(10, 20, 10, 20), '_element_width': 'auto'}
    st.update(typo('Inter', sz, 600, lh))
    st.update(s)
    if cls:
        st['_css_classes'] = cls
    return {'id': nid('b'), 'elType': 'widget', 'widgetType': 'button', 'settings': st, 'elements': []}


def icon(value, cls='', color='#0c0e16', sz=12, **s):
    st = {'selected_icon': {'value': value, 'library': 'fa-solid'}, 'primary_color': color, 'size': size(sz), 'align': 'center',
          '_element_width': 'auto'}
    st.update(s)
    if cls:
        st['_css_classes'] = cls
    return {'id': nid('i'), 'elType': 'widget', 'widgetType': 'icon', 'settings': st, 'elements': []}


def link_list(items, cls='', color='#0c0e16', sz=14, weight=500, lh=20, gap=2):
    st = {'view': 'traditional', 'icon_list': [{'_id': nid('li'), 'text': t, 'link': link(h), 'selected_icon': {'value': '', 'library': ''}} for t, h in items],
          'space_between': size(gap), 'text_color': color, 'text_color_hover': '#4a7dee', 'text_indent': size(0)}
    st.update(typo('Inter', sz, weight, lh, ))
    st = {('icon_' + k if k.startswith('typography_') else k): v for k, v in st.items()}
    if cls:
        st['_css_classes'] = cls
    return {'id': nid('l'), 'elType': 'widget', 'widgetType': 'icon-list', 'settings': st, 'elements': []}


def parse_services():
    """Read lib/services.ts so the menu always matches the Next.js site."""
    import re
    routes = dict(re.findall(r'(\w+): "([^"]+)"', open(ROUTES_TS).read()))
    src = open(SERVICES_TS).read()
    groups = []
    for block in re.findall(r'\{\s*title: "([^"]+)",\s*href: R\.(\w+),\s*tagline: "([^"]+)",\s*links: \[(.*?)\],\s*\}', src, re.S):
        title, href, tagline, links = block
        items = [(lbl, routes[h]) for lbl, h in re.findall(r'label: "([^"]+)", href: R\.(\w+)', links)]
        groups.append({'title': title, 'href': routes[href], 'tagline': tagline, 'links': items})
    return groups, routes


def build():
    groups, R = parse_services()
    nav_links = [('Home', '/'), ('About Us', R['about']), ('Blogs', R['blog']), ('Case Studies', R['caseStudies'])]
    link_typo = typo('Inter', 15, 500, 18)

    # ---- desktop links
    services_item = con([
        heading('Our Services', R['services'], cls='f3-nav__link', **link_typo),
        icon('fas fa-chevron-down', cls='f3-nav__toggle', sz=12),
    ], cls='f3-nav__item', flex_direction='row', flex_align_items='center', flex_gap={'unit': 'px', 'size': 6, 'column': '6', 'row': '6', 'isLinked': True},
        width=custom('auto'), min_height=size(72), margin=dims(-16, 0, -16, 0))
    links = con([
        heading('Home', '/', cls='f3-nav__link', **link_typo),
        services_item,
        *[heading(t, h, cls='f3-nav__link', **link_typo) for t, h in nav_links[1:]],
    ], cls='f3-nav__links', flex_direction='row', flex_align_items='center', width=custom('auto'),
        flex_gap={'unit': 'px', 'size': 32, 'column': '32', 'row': '32', 'isLinked': True},
        flex_gap_tablet={'unit': 'px', 'size': 24, 'column': '24', 'row': '24', 'isLinked': True},
        hide_tablet='hidden-tablet', hide_mobile='hidden-mobile')

    logo = {'id': nid('logo'), 'elType': 'widget', 'widgetType': 'image', 'settings': {
        'image': media('images/logo-nav.png'), 'image_size': 'full', 'link_to': 'custom', 'link': link('/'),
        'width': size(296), 'width_tablet': size(230), 'width_mobile': size(200), '_element_width': 'auto', 'align': 'left',
        '_css_classes': 'f3-nav__logo'}, 'elements': []}

    cta = button('Get Free Consultation', R['contact'], cls='f3-nav__cta', hide_tablet='hidden-tablet', hide_mobile='hidden-mobile')
    burger = icon('fas fa-bars', cls='f3-nav__burger', sz=20, hide_desktop='hidden-desktop', _padding=dims(10, 10, 10, 10))

    bar = con([logo, links, cta, burger], cls='f3-nav__inner', flex_direction='row', flex_justify_content='space-between',
              flex_align_items='center', width=custom('min(100%, 1440px)'), _flex_align_self='center', min_height=size(72),
              min_height_tablet=size(64), padding=dims(16, 64, 16, 64), padding_tablet=dims(12, 20, 12, 20))

    # ---- mega menu
    cols = []
    for g in groups:
        head = con([
            con([heading(g['title'], **typo('Bakbak One', 20, 400, 24)), icon('fas fa-arrow-right', sz=12, cls='f3-mega__arrow')],
                flex_direction='row', flex_align_items='center', flex_gap={'unit': 'px', 'size': 8, 'column': '8', 'row': '8', 'isLinked': True},
                width=custom('auto')),
            heading(g['tagline'], color='#41444e', **typo('Inter', 13, 400, 18)),
        ], cls='f3-mega__head', html_tag='a', link=link(g['href']),
            flex_gap={'unit': 'px', 'size': 6, 'column': '6', 'row': '6', 'isLinked': True},
            padding=dims(0, 0, 16, 0), margin=dims(0, 0, 12, 0),
            border_border='solid', border_width=dims(0, 0, 1, 0), border_color='#eef0f6')
        cols.append(con([head, link_list(g['links'], cls='f3-mega__list')], cls='f3-mega__col'))
    aside = con([
        heading('Our Services', color='#ffffff', **typo('Bakbak One', 22, 400, 26)),
        {'id': nid('t'), 'elType': 'widget', 'widgetType': 'text-editor', 'settings': {
            'editor': 'Managed services that bring cybersecurity, AI security and IT under one team, so your technology runs reliably, stays protected, and is ready for AI.',
            'text_color': '#c9d1e6', **typo('Inter', 14, 400, 21), '_flex_size': 'grow'}, 'elements': []},
        button('View All Services', R['services'], bg='#f5c300', fg='#0c0e16', button_background_hover_color='#f5c300'),
    ], cls='f3-mega__aside', flex_align_items='flex-start', flex_gap={'unit': 'px', 'size': 12, 'column': '12', 'row': '12', 'isLinked': True},
        padding=dims(28, 28, 28, 28), background_background='classic', background_color='#061333', border_radius=dims(12, 12, 12, 12))
    mega_inner = con(cols + [aside], cls='f3-mega__inner', container_type='grid',
                     grid_columns_grid=custom('repeat(3, 1fr) 300px'), grid_columns_grid_tablet=custom('repeat(3, 1fr) 240px'),
                     grid_rows_grid=custom('auto'), grid_gaps={'unit': 'px', 'column': '40', 'row': '40', 'isLinked': True},
                     width=custom('min(100%, 1440px)'), _flex_align_self='center', padding=dims(36, 64, 40, 64))
    mega = con([mega_inner], cls='f3-mega', background_background='classic', background_color='#ffffff',
               border_border='solid', border_width=dims(1, 0, 0, 0), border_color='#e2e8f0',
               box_shadow_box_shadow_type='yes', box_shadow_box_shadow={'horizontal': 0, 'vertical': 24, 'blur': 48, 'spread': 0, 'color': 'rgba(12,14,22,0.1)'},
               hide_tablet='hidden-tablet', hide_mobile='hidden-mobile')

    # ---- mobile sheet
    sheet_link = typo('Inter', 18, 500, 22)
    sheet_groups = []
    for g in groups:
        sheet_groups.append(con([
            heading(g['title'], g['href'], **typo('Bakbak One', 17, 400, 22)),
            link_list(g['links'], color='#41444e', sz=15, weight=400, lh=20, gap=16),
        ], cls='f3-nav__sheet-group', padding=dims(14, 0, 6, 12), flex_gap={'unit': 'px', 'size': 10, 'column': '10', 'row': '10', 'isLinked': True}))
    sheet = con([
        heading('Home', '/', cls='f3-nav__sheet-link', **sheet_link),
        con([heading('Our Services', R['services'], cls='f3-nav__sheet-link', **sheet_link), icon('fas fa-chevron-down', cls='f3-nav__sheet-toggle', sz=16)],
            cls='f3-nav__sheet-row', flex_direction='row', flex_justify_content='space-between', flex_align_items='center'),
        con(sheet_groups, cls='f3-nav__sheet-services'),
        *[heading(t, h, cls='f3-nav__sheet-link', **sheet_link) for t, h in nav_links[1:]],
        button('Get Free Consultation', R['contact'], sz=18, lh=22, _element_width='inherit', align='justify', margin=dims(24, 0, 0, 0)),
    ], cls='f3-nav__sheet', padding=dims(16, 20, 32, 20), background_background='classic', background_color='#ffffff',
        hide_desktop='hidden-desktop')

    header = {'id': eid('site-header'), 'elType': 'container', 'isInner': False, 'settings': {
        'content_width': 'full', 'container_type': 'flex', 'flex_direction': 'column', 'html_tag': 'header',
        'flex_gap': {'unit': 'px', 'size': 0, 'column': '0', 'row': '0', 'isLinked': True}, 'padding': dims(0, 0, 0, 0),
        'background_background': 'classic', 'background_color': '#ffffff', 'border_border': 'solid', 'border_width': dims(0, 0, 1, 0),
        'border_color': '#e2e8f0', 'css_classes': 'f3-nav', 'z_index': 50}, 'elements': [bar, mega, sheet]}
    return [header]


if __name__ == '__main__':
    out = os.path.join(ROOT, '..', 'data', 'header.json')
    json.dump(build(), open(out, 'w'), separators=(',', ':'))
    print('header', os.path.getsize(out))

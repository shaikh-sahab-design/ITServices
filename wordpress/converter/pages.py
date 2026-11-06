"""Route -> WordPress page mapping (slug, parent, title) for every Next.js route."""
import glob
import os
import re

ROOT = os.path.dirname(os.path.abspath(__file__))
APP = os.path.join(ROOT, '..', '..', 'app')


def routes():
    src = open(os.path.join(ROOT, '..', '..', 'lib', 'routes.ts')).read()
    return [v for _, v in re.findall(r'(\w+): "(/[^"]*)"', src)]


def meta_title(route):
    f = os.path.join(APP, route.strip('/'), 'page.tsx') if route != '/' else None
    if f and os.path.exists(f):
        m = re.search(r'^\s*title: "([^"]+)"', open(f).read(), re.M)
        if m:
            return m.group(1).split(' | ')[0]
    return None


def page_list():
    out = []
    cs = open(os.path.join(ROOT, '..', '..', 'lib', 'case-studies.ts')).read()
    for r in routes():
        name = 'home' if r == '/' else r.strip('/').replace('/', '__')
        parts = r.strip('/').split('/')
        slug = 'home' if r == '/' else parts[-1]
        parent = '/'.join(parts[:-1]) if len(parts) > 1 else ''
        title = 'Home' if r == '/' else meta_title(r)
        if not title and parent == 'case-studies':
            m = re.search(r'slug: "%s",\s*meta: \{\s*title: "([^"|]+)' % slug, cs, re.S)
            title = m.group(1).strip() if m else slug.replace('-', ' ').title()
        if not title and parent == 'blog':
            f = os.path.join(APP, r.strip('/'), 'page.tsx')
            m = re.search(r'const TITLE = "([^"]+)"', open(f).read())
            title = m.group(1) if m else None
        if not title:
            title = slug.replace('-', ' ').title()
        if parent == 'blog':
            # Blog articles live in WordPress Posts (permalinks /blogs/%postname%/), not as child pages.
            out.append({'route': r, 'name': name, 'slug': slug, 'parent': '', 'title': title, 'post_type': 'post'})
            continue
        if parent == 'case-studies':
            # Case studies live in the Case Studies post type (permalinks /case-studies/<slug>/).
            out.append({'route': r, 'name': name, 'slug': slug, 'parent': '', 'title': title, 'post_type': 'case_study'})
            continue
        if r == '/blog':
            slug = 'blogs'  # the WordPress blog lives at /blogs/
        out.append({'route': r, 'name': name, 'slug': slug, 'parent': parent, 'title': title})
    return out


if __name__ == '__main__':
    import json
    pl = page_list()
    json.dump(pl, open(os.path.join(ROOT, '..', 'data', 'pages.json'), 'w'), indent=1)
    for p in pl:
        print(p['route'], '|', p['title'], '|', p['parent'])

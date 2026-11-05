"""Convert extracted pages into wordpress/data/*.json plus the shared generated.css.

usage: python3 build.py <extract_dir> page [page...]
"""
import glob
import json
import os
import re
import sys

import convert
import specials  # noqa: F401  registers hooks

ROOT = os.path.dirname(os.path.abspath(__file__))
DATA = os.path.join(ROOT, '..', 'data')
CSSDIR = os.path.join(DATA, 'css')


def keys_in(obj, out):
    if isinstance(obj, dict):
        for v in obj.values():
            keys_in(v, out)
    elif isinstance(obj, list):
        for v in obj:
            keys_in(v, out)
    elif isinstance(obj, str):
        out.update(re.findall(r'@@(?:url|id):([^"\'\s<>]+)', obj))


if __name__ == '__main__':
    exdir, *names = sys.argv[1:]
    os.makedirs(CSSDIR, exist_ok=True)
    for nm in names:
        data, css = convert.convert_page(exdir, nm)
        json.dump(data, open(os.path.join(DATA, f'{nm}.json'), 'w'), separators=(',', ':'))
        open(os.path.join(CSSDIR, f'{nm}.css'), 'w').write(css)
        ks = set()
        keys_in(data, ks)
        print(nm, len(json.dumps(data)) // 1024, 'KB, media', len(ks))
    if 'home' in names:
        data, css = convert.convert_page(exdir, 'home', 'footer')
        json.dump(data, open(os.path.join(DATA, 'footer.json'), 'w'), separators=(',', ':'))
        open(os.path.join(CSSDIR, 'footer.css'), 'w').write(css)
        print('footer', len(json.dumps(data)) // 1024, 'KB')
    # media manifest + generated css across all pages
    allkeys = set()
    for f in glob.glob(os.path.join(DATA, '*.json')):
        if f.endswith('manifest.json'):
            continue
        keys_in(json.load(open(f)), allkeys)
    json.dump(sorted(allkeys), open(os.path.join(DATA, 'media-manifest.json'), 'w'), indent=0)
    pub = os.path.join(ROOT, '..', '..', 'public')
    media = sorted(os.path.relpath(f, pub) for f in glob.glob(os.path.join(pub, '*', '*')))
    media += sorted('svg/' + os.path.basename(f) for f in glob.glob(os.path.join(ROOT, '..', 'assets', 'svg', '*.svg')))
    open(os.path.join(DATA, 'all-media.txt'), 'w').write('\n'.join(media) + '\n')
    open(os.path.join(CSSDIR, '00-icons.css'), 'w').write(convert.icons.css())
    json.dump(sorted(convert.icons.LOOKUP), open(os.path.join(DATA, 'icon-group-members.json'), 'w'))
    gen = '\n'.join(open(f).read() for f in sorted(glob.glob(os.path.join(CSSDIR, '*.css'))))
    gen = re.sub(r'https?://localhost:3000/', '@@url:', gen)
    gen = re.sub(r'url\((["\']?)/(images|icons|videos|svg)/', r'url(\1@@url:\2/', gen)  # resolved to media URLs when the plugin syncs
    open(os.path.join(ROOT, '..', 'plugin', 'folio3-site', 'assets', 'generated.css'), 'w').write(gen)

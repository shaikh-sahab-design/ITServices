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
    # media manifest + generated css across all pages
    allkeys = set()
    for f in glob.glob(os.path.join(DATA, '*.json')):
        if f.endswith('manifest.json'):
            continue
        keys_in(json.load(open(f)), allkeys)
    json.dump(sorted(allkeys), open(os.path.join(DATA, 'media-manifest.json'), 'w'), indent=0)
    gen = '\n'.join(open(f).read() for f in sorted(glob.glob(os.path.join(CSSDIR, '*.css'))))
    open(os.path.join(ROOT, '..', 'plugin', 'folio3-site', 'assets', 'generated.css'), 'w').write(gen)

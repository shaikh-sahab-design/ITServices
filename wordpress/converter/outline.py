import json,sys
def show(e,d=0,maxd=99):
    s=e['settings']
    if e['elType']=='container':
        info=f"[{s.get('container_type')} {s.get('flex_direction','')} w={s.get('width',{}).get('size')}{s.get('width',{}).get('unit','')} cls={s.get('css_classes','')}]"
        print('  '*d+'C'+info)
        if d<maxd:
            for k in e['elements']: show(k,d+1,maxd)
    else:
        t=s.get('title') or s.get('editor') or s.get('text') or (s.get('image') or {}).get('url') or s.get('shortcode') or str([i['text'][:20] for i in s.get('icon_list',[])])
        print('  '*d+e['widgetType']+': '+str(t)[:70]+f"  ew={s.get('_element_width')} cls={s.get('_css_classes','')}")
data=json.load(open(sys.argv[1]))
for e in data[:int(sys.argv[2]) if len(sys.argv)>2 else 99]: show(e)

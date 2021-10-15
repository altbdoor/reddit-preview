import{q as o}from"./common.ab30cf5c.js";import{f as i,m as n,d as a,a as r,b as l}from"./vendor.f6677e3d.js";var d=`_italics_, **bold**, ~~strikethrough~~, \`code\`, [link](https://example.com), normal text^(with superscript)

---

> quoted text

- item one
- item two

1. item one
1. item two

| column one | column two | column three |
|---|--:|:--:|
| (default) left-aligned | right-aligned | center-aligned
| one | two | three

    code block
    with nice code

# header 1
## header 2
### header 3
#### header 4
##### header 5
###### header 6
`;const m=o("#form-subreddit"),t=o("#form-content"),c=[...document.querySelectorAll('[name="form_show"]')],s=o("iframe");i(m,"input").pipe(n(({target:e})=>e.value.trim()||"all"),a(200),r(),n(e=>({action:"subreddit",value:e})),n(e=>JSON.stringify(e))).subscribe(e=>{s.contentWindow.postMessage(e,location.origin)});l(i(t,"input").pipe(n(({target:e})=>e.value.trim()),a(200),r()),i(c,"change")).pipe(n(()=>({action:"content",value:{content:t.value,type:c.find(e=>e.checked).value}})),n(e=>JSON.stringify(e))).subscribe(e=>{s.contentWindow.postMessage(e,location.origin)});o("#form-sample").onclick=()=>{t.value=d,t.dispatchEvent(new Event("input"))};o("#form-copy").onclick=()=>{t.select(),navigator.clipboard.writeText(t.value)};

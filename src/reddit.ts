import { ActionContent, ActionSubreddit, qs } from './common';

window.addEventListener(
    'message',
    (evt) => {
        if (evt.origin !== location.origin) {
            return;
        }

        if (typeof evt.data === 'string') {
            processEvt(JSON.parse(evt.data));
        }
    },
    false
);

const defaultSampleText = '<p>Sample text</p>'

async function processEvt(data: ActionSubreddit | ActionContent) {
    if (data.action === 'subreddit') {
        qs<HTMLLinkElement>('.domain > a').textContent = `self.${data.value}`;
        qs<HTMLLinkElement>(
            '#subreddit-css'
        ).href = `https://old.reddit.com/r/${data.value}/stylesheet.css`;
    } else if (data.action === 'content') {
        const mod = (await import(
            /* webpackChunkName: 'snudown' */ 'snudown-js' as any
        )) as any;

        [...document.querySelectorAll('form.usertext .md')].forEach((elem) => {
            if (elem.getAttribute('data-type') === data.value.type) {
                elem.innerHTML = data.value.content ? mod.markdown(data.value.content) : defaultSampleText;
            } else if (elem.innerHTML.trim() !== defaultSampleText) {
                elem.innerHTML = defaultSampleText;
            }
        });
    }
}

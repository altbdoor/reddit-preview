import { fromEvent, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import './main.css';
import { sample as sampleContent } from './text-content';

const qs = <T extends Element>(arg: string) => document.querySelector<T>(arg)!;

const config = {
    debounceTime: 200,
};

const subredditField = qs<HTMLInputElement>('.settings-input');
const contentField = qs<HTMLTextAreaElement>('textarea');
const typeField = [
    ...document.querySelectorAll<HTMLInputElement>('[name="form_type"]'),
];

fromEvent(subredditField, 'input')
    .pipe(
        map(({ target }) => (target as HTMLInputElement).value || 'all'),
        debounceTime(config.debounceTime),
        distinctUntilChanged()
    )
    .subscribe((res) => {
        qs<HTMLLinkElement>('.domain > a').textContent = `self.${res}`;
        qs<HTMLLinkElement>(
            '#subreddit-css'
        ).href = `https://old.reddit.com/r/${res}/stylesheet.css`;
    });

merge(
    fromEvent(contentField, 'input').pipe(
        map(({ target }) => (target as HTMLTextAreaElement).value),
        debounceTime(config.debounceTime),
        distinctUntilChanged()
    ),
    fromEvent(typeField, 'change')
)
    .pipe(
        map(() => ({
            content: contentField.value,
            type: typeField.find((field) => field.checked)!.value,
        }))
    )
    .subscribe(({ content, type }) => {
        import(/* webpackChunkName: 'snudown' */ 'snudown-js' as any).then(
            (mod) => {
                [...document.querySelectorAll('form.usertext .md')].forEach(
                    (elem) => {
                        if (elem.getAttribute('data-type') === type) {
                            elem.innerHTML = mod.markdown(content);
                        } else {
                            elem.innerHTML = 'Sample text';
                        }
                    }
                );
            }
        );
    });

qs<HTMLButtonElement>('.settings-sample').onclick = () => {
    contentField.value = sampleContent;
    contentField.dispatchEvent(new Event('input'));
};

if (!subredditField.value) {
    subredditField.value = 'all';
}
if (!contentField.value) {
    contentField.value = sampleContent;
}

[subredditField, contentField].forEach((elem) => {
    elem.dispatchEvent(new Event('input'));
});

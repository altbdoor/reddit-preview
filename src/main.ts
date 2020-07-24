import { fromEvent, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { ActionContent, ActionSubreddit, qs } from './common';
import './main.css';
import { sample as sampleContent } from './text-content';

const subredditField = qs<HTMLInputElement>('#form-subreddit');
const contentField = qs<HTMLTextAreaElement>('#form-content');
const showField = [
    ...document.querySelectorAll<HTMLInputElement>('[name="form_show"]'),
];

const redditFrame = qs<HTMLIFrameElement>('iframe');

fromEvent(subredditField, 'input')
    .pipe(
        map(({ target }) => (target as HTMLInputElement).value || 'all'),
        debounceTime(200),
        distinctUntilChanged(),
        map(
            (subreddit) =>
                ({ action: 'subreddit', value: subreddit } as ActionSubreddit)
        ),
        map((data) => JSON.stringify(data))
    )
    .subscribe((data) => {
        redditFrame.contentWindow?.postMessage(data, location.origin);
    });

merge(
    fromEvent(contentField, 'input').pipe(
        map(({ target }) => (target as HTMLTextAreaElement).value),
        debounceTime(200),
        distinctUntilChanged()
    ),
    fromEvent(showField, 'change')
)
    .pipe(
        map(
            () =>
                ({
                    action: 'content',
                    value: {
                        content: contentField.value,
                        type: showField.find((field) => field.checked)!.value,
                    },
                } as ActionContent)
        ),
        map((data) => JSON.stringify(data))
    )
    .subscribe((data) => {
        redditFrame.contentWindow?.postMessage(data, location.origin);
    });

qs<HTMLButtonElement>('#form-sample').onclick = () => {
    contentField.value = sampleContent;
    contentField.dispatchEvent(new Event('input'));
}

qs<HTMLButtonElement>('#form-copy').onclick = () => {
    contentField.select();
    document.execCommand('copy');
}

export interface ActionSubreddit {
    action: 'subreddit';
    value: string;
}

export interface ActionContent {
    action: 'content';
    value: {
        content: string;
        type: string;
    };
}

export const qs = <T extends Element>(arg: string) => document.querySelector<T>(arg)!;

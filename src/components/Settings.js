import React from 'react'

export const Settings = ({
    subreddit,
    onChangeSubreddit,
    pageType,
    onChangePageType,
}) => {
    return (
        <div className="settings-container">
            <div className="settings-block">
                Type:{' '}
                <label className="settings-label">
                    <input
                        type="radio"
                        name="form_type"
                        value="post"
                        onChange={onChangePageType}
                        checked={pageType === 'post'}
                    />{' '}
                    Post
                </label>
                <label className="settings-label">
                    <input
                        type="radio"
                        name="form_type"
                        value="comment"
                        onChange={onChangePageType}
                        checked={pageType === 'comment'}
                    />{' '}
                    Comment
                </label>
            </div>
            <div className="settings-block">
                Subreddit:{' '}
                <input
                    type="text"
                    className="settings-input"
                    value={subreddit}
                    onChange={onChangeSubreddit}
                />
            </div>
        </div>
    )
}

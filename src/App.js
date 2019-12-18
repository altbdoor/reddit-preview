import React, { useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'

import './App.css'
import { Settings } from './components/Settings'
import { Post } from './components/Post'
import { Editor } from './components/Editor';
import { Comment } from './components/Comment';

export const App = () => {
    const [subreddit, setSubreddit] = useState('funny')
    const [pageType, setPageType] = useState('post')
    const [content, setContent] = useState('')
    const [parsedContent, setParsedContent] = useState('')

    const username = 'a_very_nice_username'
    const debounceTime = 500

    const [debouncedContent] = useDebouncedCallback((newContent) => {
        import('snudown-js').then((mod) => {
            setParsedContent(mod.markdown(newContent))
        })
    }, debounceTime)

    const [debouncedSubreddit] = useDebouncedCallback((newSubreddit) => {
        const stylesheet = document.getElementById('subreddit-css')
        stylesheet.href = `https://old.reddit.com/r/${newSubreddit}/stylesheet.css`
    }, debounceTime)

    const onChangeSubreddit = (evt) => {
        setSubreddit(evt.target.value)
        debouncedSubreddit(evt.target.value)
    }
    const onChangePageType = (evt) => setPageType(evt.target.value)
    const onChangeContent = (evt) => {
        setContent(evt.target.value)
        debouncedContent(evt.target.value)
    }

    return (
        <div>
            <Settings
                subreddit={subreddit}
                onChangeSubreddit={onChangeSubreddit}
                pageType={pageType}
                onChangePageType={onChangePageType}
            ></Settings>

            <div className="content">
                <Post
                    username={username}
                    subreddit={subreddit}
                    content={pageType === 'post'? parsedContent : ''}
                ></Post>

                <div className="commentarea">
                    <Editor
                        content={content}
                        onChangeContent={onChangeContent}
                    ></Editor>

                    <Comment
                        username={username}
                        content={pageType === 'comment' ? parsedContent : ''}
                    ></Comment>
                </div>
            </div>
        </div>
    )
}

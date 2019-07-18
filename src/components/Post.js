import React, { useRef } from 'react'
import { defaultPost } from '../data/default_post'

import { getRandomInt } from '../util'

export const Post = ({ username, subreddit, content }) => {
    const upvotes = useRef(getRandomInt(0, 1000))
    const comments = useRef(getRandomInt(0, 20))

    if (content === '') {
        content = defaultPost
    }

    return (
        <div className="sitetable linklisting">
            <div className="thing linkflair odd link self">
                <p className="parent"></p>
                <span className="rank"></span>
                <div className="midcol unvoted">
                    <div className="arrow up login-required access-required"></div>
                    <div className="score dislikes" title={upvotes.current - 1}>
                        {upvotes.current - 1}
                    </div>
                    <div className="score unvoted" title={upvotes.current}>
                        {upvotes.current}
                    </div>
                    <div className="score likes" title={upvotes.current + 1}>
                        {upvotes.current + 1}
                    </div>
                    <div className="arrow down login-required access-required"></div>
                </div>
                <a
                    className="thumbnail invisible-when-pinned self may-blank"
                    href="/#"
                >
                    {''}
                </a>
                <div className="entry unvoted">
                    <div className="top-matter">
                        <p className="title">
                            <a className="title may-blank" href="/#">
                                This is the title for the post
                            </a>
                            <span className="domain">
                                (<a href="/#">self.{subreddit}</a>)
                            </span>
                        </p>

                        <p className="tagline">
                            submitted{' '}
                            <time className="live-timestamp">2 hours ago</time>{' '}
                            by{' '}
                            <a href="/#" className="author may-blank">
                                {username}
                            </a>
                        </p>
                    </div>
                    <div className="expando">
                        <form action="#" className="usertext warn-on-unload">
                            <div className="usertext-body may-blank-within md-container">
                                <div
                                    className="md"
                                    dangerouslySetInnerHTML={{
                                        __html: content,
                                    }}
                                ></div>
                            </div>
                        </form>
                    </div>
                    <ul className="flat-list buttons">
                        <li className="first">
                            <a href="/#" className="bylink comments may-blank">
                                {comments.current} comments
                            </a>
                        </li>
                        <li className="share">
                            <a className="post-sharing-button" href="/#">
                                share
                            </a>
                        </li>
                        <li className="link-save-button save-button login-required">
                            <a href="/#">save</a>
                        </li>
                        <li>
                            <form
                                action="#"
                                className="state-button hide-button"
                            >
                                <span>
                                    <a href="/#">hide</a>
                                </span>
                            </form>
                        </li>
                        <li className="report-button login-required">
                            <a href="/#" className="reportbtn access-required">
                                report
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="child"></div>
                <div className="clearleft"></div>
            </div>
            <div className="clearleft"></div>
        </div>
    )
}

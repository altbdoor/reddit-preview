import React from 'react'
import { defaultComment } from '../data/default_comment';

export const Comment = ({ username, content }) => {
    if (content === '') {
        content = defaultComment
    }

    return (
        <div className="sitetable nestedlisting">
            <div className="thing noncollapsed comment score-hidden">
                <p className="parent">
                    <a href="/#">{''}</a>
                </p>
                <div className="midcol unvoted">
                    <div className="arrow up login-required access-required"></div>
                    <div className="arrow down login-required access-required"></div>
                </div>
                <div className="entry unvoted">
                    <p className="tagline">
                        <a href="/#" className="expand">
                            [–]
                        </a>
                        <a href="/#" className="author may-blank">
                            {username}
                        </a>
                        <span className="userattrs"></span>{' '}
                        <span className="score-hidden">[score hidden]</span>{' '}
                        <time className="live-timestamp">an hour ago</time>
                        <span className="awardings-bar"></span>&nbsp;
                        <a href="/#" className="numchildren">
                            (0 children)
                        </a>
                    </p>
                    <form action="#" className="usertext warn-on-unload">
                        <div className="usertext-body may-blank-within md-container">
                            <div
                                className="md"
                                dangerouslySetInnerHTML={{ __html: content }}
                            ></div>
                        </div>
                    </form>
                    <ul className="flat-list buttons">
                        <li className="first">
                            <a href="/#" className="bylink">
                                permalink
                            </a>
                        </li>
                        <li>
                            <a href="/#" className="embed-comment">
                                embed
                            </a>
                        </li>
                        <li className="comment-save-button save-button login-required">
                            <a href="/#">save</a>
                        </li>
                        <li className="report-button login-required">
                            <a href="/#" className="reportbtn access-required">
                                report
                            </a>
                        </li>
                        <li className="give-gold-button">
                            <a
                                href="/#"
                                className="give-gold login-required access-required gold-give-gold"
                            >
                                give award
                            </a>
                        </li>
                        <li className="reply-button login-required">
                            <a className="access-required" href="/#">
                                reply
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

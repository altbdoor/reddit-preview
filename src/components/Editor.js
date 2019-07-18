import React from 'react'

export const Editor = ({ content, onChangeContent }) => {
    return (
        <div className="usertext">
            <div className="usertext-edit md-container">
                <div className="md">
                    <textarea
                        name="text"
                        onChange={onChangeContent}
                        value={content}
                    ></textarea>
                </div>
                <div className="bottom-area">
                    <div className="usertext-buttons">
                        <button className="save" type="button">
                            save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

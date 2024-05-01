export const Display = () => {


    return (
        <div className="page page__display">
            <div className="page page__display--write-message">
                <div>
                    <div className="me">
                        Hello
                    </div>
                    <div className="to">
                        Hello Man
                    </div>
                </div>
                <textarea>

                </textarea>
                <button>Send</button>
            </div>
            <ul className="page page__display--friend-list">
                <li>Friend One</li>
                <li>Friend Two</li>
            </ul>
        </div>
    )
}
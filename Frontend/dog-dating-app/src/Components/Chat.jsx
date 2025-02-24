import './Chat.css'

function Chat() {

    return (
        <div className="container">
            <div className="left-chat"> hii Kirti!!</div>
            <div className="right-chat"> hii madhu!!</div>

            <div className='type-msg'>
                <div className="prompt"></div>
                <button className='send'>Send</button>
            </div>

        </div>

    )
}

export default Chat
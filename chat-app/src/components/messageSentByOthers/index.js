import "./index.css"

const MessageByOthers=(props)=>{
    const {messageData}=props

    return (
        <div className="message-from-others">
            <h5 className="head">{messageData.username}</h5>
            <p className="para">{messageData.message}</p>
        </div>
    )
}

export default MessageByOthers
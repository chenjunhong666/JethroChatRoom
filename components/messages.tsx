import React, { useEffect, useRef } from 'react';
import { MessageInfo, MsgType } from '../lib/interfaces'
import './messages.less'


type MessageProps = {
    messageInfo: MessageInfo
}
const Message: React.FunctionComponent<MessageProps> = ({ messageInfo }) => {
    switch (messageInfo.msgType) {
        case MsgType.MY:
            return <div className="message-my">
                <p className="message-name">{messageInfo.userName} <span className="message-date">{messageInfo.date}</span></p>
                <span className="message-content">{messageInfo.msgContent}</span>
            </div>
        case MsgType.OTHER:
            return <div className="message-other">
                <p className="message-name">{messageInfo.userName} <span className="message-date">{messageInfo.date}</span></p>
                <span className="message-content">{messageInfo.msgContent}</span>
            </div>
        case MsgType.SYSTEM:
            return <div className="message-system">
                <span>{messageInfo.userName + " " + messageInfo.date + " " + messageInfo.msgContent}</span>
            </div>
        default:
            return <div></div>
    }
}


type MessagesProps = {
    messages: MessageInfo[]
}
const Messages: React.FunctionComponent<MessagesProps> = ({ messages }) => {
    const messageList = useRef(null);
    useEffect(() => {
        window.scrollTo(0, messageList.current.clientHeight + 50);
    });
    return (
        <div className="messages-bg" ref={messageList}>
            {messages.map((messageInfo, index) => (
                <Message messageInfo={messageInfo} key={index}></Message>
            ))}
        </div>

    )
}

export default Messages
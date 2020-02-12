import React, { useState, useEffect } from 'react';
import { Button, Input } from 'antd'
import { MsgType, MessageInfo } from '../lib/interfaces'
// import './messageInput.less'
type Props = {
    messageInfo: MessageInfo
}
const MessageInput: React.FunctionComponent<Props> = ({ messageInfo }) => {
    return (
        <div>
            {messageInfo.msgType + " " + messageInfo.userName + " " + messageInfo.msgContent + " " + messageInfo.date}
        </div>

    )
}

export default MessageInput
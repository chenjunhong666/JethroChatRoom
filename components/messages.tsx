import React, { useState, useEffect } from 'react';
import { Button, Input } from 'antd'
import {MessageInfo} from '../lib/interfaces'
import Message from './message'
// import './messageInput.less'
type Props = {
    messages: MessageInfo[]
  }
const MessageInput: React.FunctionComponent<Props> = ({messages}) => {
    return (
        <div>
            {messages.map((messageInfo,index)=>(
                <Message messageInfo = {messageInfo} key = {index}></Message>
            ))}
        </div>

    )
}

export default MessageInput
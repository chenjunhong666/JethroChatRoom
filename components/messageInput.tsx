import React, { useState, useEffect } from 'react';
import { Button, Input } from 'antd'
import './messageInput.less'
type Props = {
    onSubmit : (messageContent:string)=>number
}


const MessageInput: React.FunctionComponent<Props> = ({onSubmit}) => {
    let [messageContent,setContent] = useState("");
    const onChange = (e)=>{
        setContent(e.target.value)
    }
    return (
        <div className="msi-bg-box">
            <div className="msi-input-box">
                <Input onChange = {onChange} value={messageContent}></Input>
            </div>
            <div className='msi-button-box'>
                <Button className='msi-submit-button' type="primary" onClick={()=>{
                    let ret = onSubmit(messageContent);
                    if(ret == 1){
                        setContent("")
                    }
                }}>发送</Button>
            </div>
        </div>

    )
}

export default MessageInput
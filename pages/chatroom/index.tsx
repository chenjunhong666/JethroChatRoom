import React, { useState, useEffect, useRef } from 'react';
import { withRouter } from 'next/router'
import { withRedux } from '../../lib/redux'
import io from 'socket.io-client'
import useLogin from '../../lib/useLogin'
import routerlist from '../../lib/routerlist'
import { useSelector, useDispatch } from 'react-redux'
import MessageInput from '../../components/messageInput'
import Messages from '../../components/messages'
import { MessageInfo, MsgType } from '../../lib/interfaces'
import './chatroom.less'

const IndexPage = ({ router }) => {
    let roomValue = ""
    const isLogin = useLogin();
    const [socket, setSocket] = useState(null);
    const userID = useSelector(state => state.userID)
    const userName = useSelector(state => state.userName)
    const [messages, setMessage] = useState([])
    const preMessages = useRef(messages);
    const addMessage = (message: MessageInfo) => {
        preMessages.current.push(message)
        setMessage([...preMessages.current]);
    }
    const onSubmit = (messageContent: string) => {
        socket.emit('message', messageContent, (data) => {
            let message: MessageInfo = { msgType: MsgType.MY, msgContent: messageContent, userName, date: data }
            addMessage(message)
        });
        return 1;
    }

    useEffect(() => {
        if (router && router.query && router.query.roomValue && router.query.roomValue != "") {
            roomValue = router.query.roomValue
        } else {
            router.push(routerlist.notFind);
        }
        if (userID != "") {
            let s = io.connect('http://localhost:3001');
            setSocket(s);
            s.on('connect', (data) => {
                // console.log('connect')
            });
            s.emit('enter', { userID, roomValue }, (data) => {
                if (data == 'error') {
                    console.log("强制远程下线")
                } else {
                    // console.log('enter');
                }
            });
            s.on('new', (data) => {
                let message: MessageInfo = { msgType: MsgType.SYSTEM, msgContent: "进入聊天室", userName: data.userName, date: data.date };
                addMessage(message)
            });
            s.on('quit', (data) => {
                let message: MessageInfo = { msgType: MsgType.SYSTEM, msgContent: "退出聊天室", userName: data.userName, date: data.date };
                addMessage(message)
            });
            s.on('disconnect', (data) => {
                let message: MessageInfo = { msgType: MsgType.SYSTEM, msgContent: "您已离线", userName : "", date: "" };
                addMessage(message)
            });
            s.on('forceOut', () => {
                alert("强制下线")
                router.push(routerlist.index)
            })
            s.on('message', (data) => {
                let message: MessageInfo = { msgType: MsgType.OTHER, msgContent: data.message, userName: data.userName, date: data.date };
                addMessage(message)
            });
            return () => s.disconnect();
        }
    }, [userID]);
    return (
        (isLogin) ?
            <div className='chatroom-bg'>
                {/* <div className="chatroom-header">
                    header
                </div> */}
                <div className="chatroom-content">
                    <Messages messages={messages} />
                </div>
                <div className="chatroom-footer">
                    <MessageInput onSubmit={onSubmit} />
                </div>
            </div> :
            <div></div>
    )
}

IndexPage.getInitialProps = async ({ reduxStore }) => {
    // return reduxStore.getState();
    return {}
}

export default withRedux(withRouter(IndexPage))

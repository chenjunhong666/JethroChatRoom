import React, { useState, useEffect } from 'react';
import { withRouter } from 'next/router'
import { withRedux } from '../lib/redux'
import io from 'socket.io-client'
import useLogin from '../lib/useLogin'
import { Button } from 'antd'
import routerlist from '../lib/routerlist'
import { useSelector, useDispatch } from 'react-redux'


const IndexPage = ({ router }) => {
    let isLogin = useLogin();
    let roomValue = "";
    const [socket, setSocket] = useState(null);
    const [message, setMessage] = useState("")
    const userID = useSelector(state => state.userID)
    useEffect(() => {
        if (router && router.query && router.query.roomValue) {
            roomValue = router.query.roomValue;
        } else {
            router.push(routerlist.notFind);
        }
        if (userID != "") {
            let s = io.connect('http://localhost:3001')
            setSocket(s);
            s.on('connect', (data) => {
                console.log('connect')
            });
            s.emit('enter', { userID, roomValue }, (data) => {
                if (data == 'error') {
                    console.log("error")
                } else {
                    console.log('enter');
                }
            });
            s.on('new', (data) => {
                setMessage(data)
            });
            s.on('disconnect', (data) => {
                setMessage("退出聊天室")
            });
            s.on('message', (data) => {
                setMessage(data.message)
            });
            return () => s.disconnect();
        }
    }, [userID]);
    return (
        isLogin ?
            <>
                <p>{message}</p>
                <Button type="primary" onClick={() => {
                    socket.emit('message', Date.now());
                }}>
                    发送
        </Button>
                <Button type="primary" onClick={() => {
                    router.push(routerlist.index);
                }}>
                    回首页
        </Button>
            </> :
            <div></div>
    )
}

IndexPage.getInitialProps = async ({ reduxStore }) => {
    // let data = await api.auth.info();
    // // console.log(data)
    // return {}
    return reduxStore.getState();
}

export default withRedux(withRouter(IndexPage))

import React, { useState, useEffect } from 'react';
import { withRedux } from '../lib/redux'
import { Button, Select } from 'antd'
import router from 'next/router';
import routerlist from '../lib/routerlist'
import api from '../api'

const IndexPage = (props) => {
  const { Option } = Select;
  const [roomValue, setRoomValue] = useState("1");
  return (
    <div>
      <Select defaultValue="1" style={{ width: 120 }} onChange={(value) => {
        setRoomValue(value)
      }}>
        <Option value="1">1号聊天室</Option>
        <Option value="2">2号聊天室</Option>
        <Option value="3">3号聊天室</Option>
      </Select>
      <Button type="primary" onClick={() => {
        router.push({
          pathname: routerlist.chatroom,
          query: { roomValue: roomValue }
        });
      }}>
        进入
        </Button>
    </div>
  )
}

IndexPage.getInitialProps = async ({ reduxStore }) => {
  // let data = await api.auth.info();
  // console.log(data)
  return {}
}

export default withRedux(IndexPage)

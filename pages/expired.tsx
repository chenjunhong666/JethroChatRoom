import React, { Component } from 'react';
import router from 'next/router'

class expired extends Component<any> {
    timer: NodeJS.Timeout;
    UNSAFE_componentWillMount() {
        this.timer = setInterval(() => {
            router.push('/login');
        }, 3000)
    }
    componentWillUnmount() {
        clearInterval(this.timer)
    }

    render() {
        return (
            <h1>
                未登录或登录过期,即将跳转
            </h1>
        );
    }
}

export default expired;
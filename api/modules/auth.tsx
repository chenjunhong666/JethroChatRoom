import axios from '../axios'

/* 
 * 系统登录模块
 */
export const login = (data: any) => {
    return axios({
        url: 'login',
        method: 'post',
        data
    })
}

// 登出
export const logout = () => {
    return axios({
        url: 'logout',
        method: 'post',

    })
}

export const judge = () => {
    return axios({
        url: 'judge',
        method: 'post',

    })
}

export const info = () => {
    return axios({
        url: 'info',
        method: 'post',
    })
}

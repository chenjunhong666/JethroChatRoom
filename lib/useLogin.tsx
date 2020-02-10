// import Router from 'next/router';
// import Cookies from 'js-cookie'
// import routerlist from '../lib/routerlist'
import { useEffect, useState } from 'react';
import api from '../api'
import { useSelector, useDispatch } from 'react-redux'
import {actionType} from '../redux/actionType'

const useLogin = () => {
    const dispatch = useDispatch();
    const setLogin = (isLogin) =>
        dispatch({
            type: actionType.SETLOGIN,
            isLogin : isLogin
        })
    const [innerIsLogin, setInnerLogin] = useState(useSelector(state => state.isLogin));
    let lastLoginDate = useSelector(state => state.lastLoginDate);
    useEffect(() => {
        if(!innerIsLogin || Date.now() - lastLoginDate >= 100000){
            api.auth.judge().then(res => {
                if (res && res.code == 0) {
                    setInnerLogin(true);
                    setLogin(true);
                    lastLoginDate = Date.now();
                }
            });
        }
    }, []);
    return innerIsLogin;
}
export default useLogin;

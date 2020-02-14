import { useEffect, useState } from 'react';
import api from '../api'
import { useSelector, useDispatch } from 'react-redux'
import { actionType } from '../redux/actionType'
import router from 'next/router';
import routerlist from '../lib/routerlist'

const useLogin = () => {
    const dispatch = useDispatch();
    const setLogin = (isLogin) =>
        dispatch({
            type: actionType.SETLOGIN,
            isLogin: isLogin
        })
    const setInfo = ({ username, userID }) =>
        dispatch({
            type: actionType.SETUSERINFO,
            userName: username,
            userID: userID
        })
    const [innerIsLogin, setInnerLogin] = useState(useSelector(state => state.isLogin));
    const userID = useSelector(state => state.userID);
    let lastLoginDate = useSelector(state => state.lastLoginDate);
    useEffect(() => {
        if (!innerIsLogin) {
            api.auth.info().then(res => {
                if (res && res.code == 0) {
                    setInnerLogin(true);
                    setLogin(true);
                    setInfo({
                        username: res.username,
                        userID: res.userID,
                    })
                }else{
                    setLogin(false);
                    router.push(routerlist.login);
                }
            });
        }
        else if (Date.now() - lastLoginDate >= 0) {
            api.auth.judge().then(res => {
                if (res && res.code == 0) {
                    setLogin(true);
                }else{
                    setLogin(false);
                    router.push(routerlist.login);
                }
            });
        }
    }, []);
    return userID == "" ? false : true;
}
export default useLogin;

import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import {actionType} from './actionType'
const initialState = {
  isLogin: false,
  userName: "",
  userID:"",
  lastLoginDate: Date.now(),
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
      case actionType.SETLOGIN:
        if(action.isLogin == true){
          return {
            ...state,
            isLogin: action.isLogin,
            lastLoginDate: Date.now()
          }
        }
        else{
          return {
            ...state,
            isLogin: action.isLogin
          }
        }
        case actionType.SETUSERINFO:
          return {
            ...state,
            userName:action.userName,
            userID:action.userID
          }
    default:
      return state
  }
}

export const initializeStore = (preloadedState = initialState) => {
  return createStore(
    reducer,
    preloadedState,
    composeWithDevTools(applyMiddleware())
  )
}

import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import {actionType} from './actionType'
const initialState = {
  lastUpdate: 0,
  light: false,
  count: 0,
  isLogin: false,
  lastLoginDate: Date.now()
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'TICK':
      return {
        ...state,
        lastUpdate: action.lastUpdate,
        light: !!action.light,
      }
    case 'INCREMENT':
      return {
        ...state,
        count: state.count + 1,
      }
    case 'DECREMENT':
      return {
        ...state,
        count: state.count - 1,
      }
    case 'RESET':
      return {
        ...state,
        count: initialState.count,
      }
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

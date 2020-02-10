import React from 'react'
import { useDispatch } from 'react-redux'
import { withRedux } from '../lib/redux'
import useInterval from '../lib/useInterval'
import Clock from '../components/clock'
import Counter from '../components/counter'
// import api from '../api'
import useLogin from '../lib/useLogin'


const IndexPage = () => {
  // Tick the time every second
  let isLogin = useLogin();
  const dispatch = useDispatch()
  useInterval(() => {
    dispatch({
      type: 'TICK',
      light: true,
      lastUpdate: Date.now(),
    })
  }, 1000)
  return (
    isLogin ?
      <>
        <Clock />
        <Counter />
      </> : 
      <div></div>
  )
}

IndexPage.getInitialProps = async ({ reduxStore }) => {
  // Tick the time once, so we'll have a
  // valid time before first render
  const { dispatch } = reduxStore
  dispatch({
    type: 'TICK',
    light: typeof window === 'object',
    lastUpdate: Date.now(),
  });

  return {}
}

export default withRedux(IndexPage)

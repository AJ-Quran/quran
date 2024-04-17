import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { checkUserAccount, localInitialData } from './js/utils/checkers'
import { checkTheme } from './js/utils/theme'

import './css/App.css'

const Main = React.lazy(() => import('./pages/Main/Main'))
const Signup = React.lazy(() => import('./pages/Account/Signup/Signup'))
const Login = React.lazy(() => import('./pages/Account/Login/Login'))

checkApp()

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/account/signup" element={<Signup />} />
          <Route path="/account/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

function checkApp() {
  localInitialData()
  checkTheme()
  checkUserAccount()
}

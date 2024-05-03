import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { checkUser, localInitialData } from './js/utils/checkers'
import { checkTheme } from './js/utils/theme'
import { deviceIsPhone } from './js/utils/device'

import './css/App.css'

const Main = React.lazy(() => import('./pages/Main/Main'))
const WrongPath = React.lazy(() => import('./pages/WrongPath/WrongPath'))
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
          <Route path="*" element={<WrongPath />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

async function checkApp() {
  const isPhone = deviceIsPhone()
  if (isPhone) document.body.classList.add('is_phone')

  localInitialData()
  checkTheme()
  await checkUser()
}

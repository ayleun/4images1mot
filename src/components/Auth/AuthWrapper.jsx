import { useState } from 'react'
import Login from './Login'
import Signup from './Signup'

function AuthWrapper() {
  const [isLogin, setIsLogin] = useState(true)

  return isLogin ? (
    <Login onSwitch={() => setIsLogin(false)} />
  ) : (
    <Signup onSwitch={() => setIsLogin(true)} />
  )
}

export default AuthWrapper



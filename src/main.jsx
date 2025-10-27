import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { AuthProvider } from './context/AuthContext'
import { useAuth } from './context/AuthContext'
import AuthWrapper from './components/Auth/AuthWrapper'

function Root() {
  const { user } = useAuth()
  
  return user ? <App /> : <AuthWrapper />
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <Root />
    </AuthProvider>
  </React.StrictMode>,
)


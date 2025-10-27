import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import './Auth.css'

function Login({ onSwitch }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!email || !password) {
      setError('Veuillez remplir tous les champs')
      return
    }

    try {
      setError('')
      setLoading(true)
      await login(email, password)
    } catch (err) {
      console.error(err)
      switch (err.code) {
        case 'auth/user-not-found':
          setError('Aucun compte trouvé avec cet email')
          break
        case 'auth/wrong-password':
          setError('Mot de passe incorrect')
          break
        case 'auth/invalid-email':
          setError('Email invalide')
          break
        default:
          setError('Erreur de connexion. Veuillez réessayer.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1 className="auth-title">🎮 4 Images 1 Mot</h1>
        <h2 className="auth-subtitle">Connexion</h2>
        
        {error && <div className="auth-error">{error}</div>}
        
        <form onSubmit={handleSubmit} className="auth-form">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="auth-input"
            disabled={loading}
          />
          
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="auth-input"
            disabled={loading}
          />
          
          <button 
            type="submit" 
            className="auth-button"
            disabled={loading}
          >
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>
        
        <p className="auth-switch">
          Pas encore de compte ?{' '}
          <button onClick={onSwitch} className="auth-link">
            S'inscrire
          </button>
        </p>
      </div>
    </div>
  )
}

export default Login



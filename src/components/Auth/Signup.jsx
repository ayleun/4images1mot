import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import './Auth.css'

function Signup({ onSwitch }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { signup } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!email || !password || !displayName) {
      setError('Veuillez remplir tous les champs')
      return
    }

    if (password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères')
      return
    }

    try {
      setError('')
      setLoading(true)
      await signup(email, password, displayName)
    } catch (err) {
      console.error(err)
      switch (err.code) {
        case 'auth/email-already-in-use':
          setError('Cet email est déjà utilisé')
          break
        case 'auth/invalid-email':
          setError('Email invalide')
          break
        case 'auth/weak-password':
          setError('Mot de passe trop faible')
          break
        default:
          setError('Erreur lors de l\'inscription. Veuillez réessayer.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1 className="auth-title">🎮 4 Images 1 Mot</h1>
        <h2 className="auth-subtitle">Inscription</h2>
        
        {error && <div className="auth-error">{error}</div>}
        
        <form onSubmit={handleSubmit} className="auth-form">
          <input
            type="text"
            placeholder="Nom d'utilisateur"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="auth-input"
            disabled={loading}
          />
          
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
            placeholder="Mot de passe (min. 6 caractères)"
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
            {loading ? 'Inscription...' : 'S\'inscrire'}
          </button>
        </form>
        
        <p className="auth-switch">
          Déjà un compte ?{' '}
          <button onClick={onSwitch} className="auth-link">
            Se connecter
          </button>
        </p>
      </div>
    </div>
  )
}

export default Signup



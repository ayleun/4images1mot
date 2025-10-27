import { useState } from 'react'
import { LogOut, User } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import './UserMenu.css'

function UserMenu() {
  const { user, logout } = useAuth()
  const [showMenu, setShowMenu] = useState(false)

  const handleLogout = async () => {
    try {
      await logout()
    } catch (error) {
      console.error('Erreur déconnexion:', error)
    }
  }

  return (
    <div className="user-menu">
      <button 
        className="user-button" 
        onClick={() => setShowMenu(!showMenu)}
      >
        <User size={20} />
        <span>{user?.displayName || 'Utilisateur'}</span>
      </button>
      
      {showMenu && (
        <div className="user-dropdown">
          <div className="user-info">
            <p className="user-name">{user?.displayName}</p>
            <p className="user-email">{user?.email}</p>
          </div>
          <button className="logout-button" onClick={handleLogout}>
            <LogOut size={18} />
            <span>Se déconnecter</span>
          </button>
        </div>
      )}
    </div>
  )
}

export default UserMenu



import { useState, useEffect } from 'react'
import { Play, Star, Trophy, Coins } from 'lucide-react'
import soundManager from '../utils/sounds'
import './WelcomeScreen.css'

function WelcomeScreen({ onStart, currentLevel, totalLevels, coins }) {
  const [loading, setLoading] = useState(true)
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    // Son de chargement
    soundManager.play('loading')
    
    // Animation de chargement
    const timer = setTimeout(() => {
      setLoading(false)
      setTimeout(() => setShowContent(true), 300)
    }, 2000) // 2 secondes de chargement

    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <div className="welcome-screen">
        <div className="loading-container">
          <div className="game-logo">
            <div className="logo-icon">🎯</div>
            <h1 className="game-title">4 Images 1 Mot</h1>
          </div>
          
          <div className="loading-animation">
            <div className="loading-dots">
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
            </div>
            <p className="loading-text">Chargement...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="welcome-screen">
      <div className="welcome-content">
        {/* Logo et titre */}
        <div className="game-logo">
          <div className="logo-icon">🎯</div>
          <h1 className="game-title">4 Images 1 Mot</h1>
          <p className="game-subtitle">Trouvez le mot avec 4 images</p>
        </div>

        {/* Statistiques du joueur */}
        {showContent && (
          <div className="player-stats">
            <div className="stat-item">
              <Trophy className="stat-icon" />
              <div className="stat-content">
                <span className="stat-label">Niveau</span>
                <span className="stat-value">{currentLevel + 1}</span>
              </div>
            </div>
            
            <div className="stat-item">
              <Coins className="stat-icon" />
              <div className="stat-content">
                <span className="stat-label">Pièces</span>
                <span className="stat-value">{coins}</span>
              </div>
            </div>
          </div>
        )}

        {/* Bouton continuer */}
        {showContent && (
          <div className="welcome-actions">
            <button 
              className="continue-button"
              onClick={() => {
                soundManager.play('button')
                onStart()
              }}
            >
              <Play className="button-icon" />
              Continuer
            </button>
            
            <div className="welcome-tips">
              <div className="tip-item">
                <Star className="tip-icon" />
                <span>Utilisez les indices pour vous aider</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default WelcomeScreen

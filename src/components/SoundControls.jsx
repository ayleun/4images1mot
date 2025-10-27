import { useState, useEffect } from 'react'
import { Volume2, VolumeX, Settings } from 'lucide-react'
import soundManager from '../utils/sounds'
import './SoundControls.css'

function SoundControls() {
  const [isEnabled, setIsEnabled] = useState(true)
  const [volume, setVolume] = useState(0.7)
  const [showVolumeControl, setShowVolumeControl] = useState(false)

  useEffect(() => {
    // Charger les préférences
    soundManager.loadPreferences()
    setIsEnabled(soundManager.enabled)
    setVolume(soundManager.volume)
  }, [])

  const handleMainClick = () => {
    if (!isEnabled) {
      // Si le son est désactivé, l'activer
      setIsEnabled(true)
      soundManager.setEnabled(true)
    } else if (!showVolumeControl) {
      // Si le son est activé mais pas de contrôle visible, montrer le contrôle
      setShowVolumeControl(true)
    } else {
      // Si le contrôle est visible, le cacher
      setShowVolumeControl(false)
    }
  }

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)
    soundManager.setVolume(newVolume)
  }

  const testSound = () => {
    soundManager.play('button')
  }

  const disableSound = () => {
    setIsEnabled(false)
    soundManager.setEnabled(false)
    setShowVolumeControl(false)
  }

  return (
    <div className="sound-controls">
      {/* Bouton principal intelligent */}
      <div className="main-sound-button" onClick={handleMainClick}>
        {!isEnabled ? (
          <VolumeX className="sound-icon" />
        ) : showVolumeControl ? (
          <Settings className="sound-icon" />
        ) : (
          <Volume2 className="sound-icon" />
        )}
      </div>
      
      {/* Contrôle de volume (apparaît quand nécessaire) */}
      {isEnabled && showVolumeControl && (
        <div className="volume-control">
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={handleVolumeChange}
            className="volume-slider"
          />
          <button 
            className="test-sound"
            onClick={testSound}
            title="Tester le son"
          >
            <Volume2 className="test-icon" />
          </button>
          <button 
            className="disable-sound"
            onClick={disableSound}
            title="Désactiver le son"
          >
            <VolumeX className="test-icon" />
          </button>
        </div>
      )}
    </div>
  )
}

export default SoundControls

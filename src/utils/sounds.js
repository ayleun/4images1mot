// Système de gestion des sons pour l'application
class SoundManager {
  constructor() {
    this.sounds = {}
    this.enabled = true
    this.volume = 0.7
    this.initSounds()
  }

  initSounds() {
    // Sons identiques à l'original 4 Images 1 Mot
    this.sounds = {
      // Son de clic sur lettre (comme l'original)
      letterClick: this.createTone(800, 0.08, 'sine'),
      
      // Son de placement de lettre (son de "pop" caractéristique)
      letterPlace: this.createPopSound(),
      
      // Son de retrait de lettre (son de "whoosh")
      letterRemove: this.createWhooshSound(),
      
      // Son de victoire (mélodie ascendante joyeuse)
      victory: this.createVictoryMelody(),
      
      // Son d'erreur (buzz grave)
      error: this.createErrorSound(),
      
      // Son d'aide utilisée (ding caractéristique)
      hint: this.createHintSound(),
      
      // Son de niveau complet (fanfare)
      levelComplete: this.createLevelCompleteMelody(),
      
      // Son de bouton (click doux)
      button: this.createButtonSound(),
      
      // Son de chargement (ambiance douce)
      loading: this.createLoadingSound()
    }
  }

  // Créer un ton simple
  createTone(frequency, duration, type = 'sine') {
    return () => {
      if (!this.enabled) return
      
      const audioContext = new (window.AudioContext || window.webkitAudioContext)()
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()
      
      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)
      
      oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime)
      oscillator.type = type
      
      gainNode.gain.setValueAtTime(0, audioContext.currentTime)
      gainNode.gain.linearRampToValueAtTime(this.volume * 0.3, audioContext.currentTime + 0.01)
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration)
      
      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + duration)
    }
  }

  // Créer une mélodie
  createMelody(frequencies, durations) {
    return () => {
      if (!this.enabled) return
      
      const audioContext = new (window.AudioContext || window.webkitAudioContext)()
      let currentTime = audioContext.currentTime
      
      frequencies.forEach((freq, index) => {
        const oscillator = audioContext.createOscillator()
        const gainNode = audioContext.createGain()
        
        oscillator.connect(gainNode)
        gainNode.connect(audioContext.destination)
        
        oscillator.frequency.setValueAtTime(freq, currentTime)
        oscillator.type = 'sine'
        
        gainNode.gain.setValueAtTime(0, currentTime)
        gainNode.gain.linearRampToValueAtTime(this.volume * 0.2, currentTime + 0.01)
        gainNode.gain.exponentialRampToValueAtTime(0.001, currentTime + durations[index])
        
        oscillator.start(currentTime)
        oscillator.stop(currentTime + durations[index])
        
        currentTime += durations[index]
      })
    }
  }

  // Son de "pop" pour placement de lettre (comme l'original)
  createPopSound() {
    return () => {
      if (!this.enabled) return
      
      const audioContext = new (window.AudioContext || window.webkitAudioContext)()
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()
      
      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)
      
      oscillator.frequency.setValueAtTime(1200, audioContext.currentTime)
      oscillator.frequency.exponentialRampToValueAtTime(600, audioContext.currentTime + 0.1)
      oscillator.type = 'sine'
      
      gainNode.gain.setValueAtTime(0, audioContext.currentTime)
      gainNode.gain.linearRampToValueAtTime(this.volume * 0.4, audioContext.currentTime + 0.01)
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.15)
      
      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + 0.15)
    }
  }

  // Son de "whoosh" pour retrait de lettre
  createWhooshSound() {
    return () => {
      if (!this.enabled) return
      
      const audioContext = new (window.AudioContext || window.webkitAudioContext)()
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()
      
      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)
      
      oscillator.frequency.setValueAtTime(300, audioContext.currentTime)
      oscillator.frequency.exponentialRampToValueAtTime(100, audioContext.currentTime + 0.2)
      oscillator.type = 'sawtooth'
      
      gainNode.gain.setValueAtTime(0, audioContext.currentTime)
      gainNode.gain.linearRampToValueAtTime(this.volume * 0.3, audioContext.currentTime + 0.01)
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.2)
      
      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + 0.2)
    }
  }

  // Mélodie de victoire (comme l'original)
  createVictoryMelody() {
    return () => {
      if (!this.enabled) return
      
      const audioContext = new (window.AudioContext || window.webkitAudioContext)()
      const frequencies = [523, 659, 784, 1047] // C5, E5, G5, C6
      const durations = [0.15, 0.15, 0.15, 0.3]
      let currentTime = audioContext.currentTime
      
      frequencies.forEach((freq, index) => {
        const oscillator = audioContext.createOscillator()
        const gainNode = audioContext.createGain()
        
        oscillator.connect(gainNode)
        gainNode.connect(audioContext.destination)
        
        oscillator.frequency.setValueAtTime(freq, currentTime)
        oscillator.type = 'sine'
        
        gainNode.gain.setValueAtTime(0, currentTime)
        gainNode.gain.linearRampToValueAtTime(this.volume * 0.3, currentTime + 0.01)
        gainNode.gain.exponentialRampToValueAtTime(0.001, currentTime + durations[index])
        
        oscillator.start(currentTime)
        oscillator.stop(currentTime + durations[index])
        
        currentTime += durations[index]
      })
    }
  }

  // Son d'erreur (buzz grave)
  createErrorSound() {
    return () => {
      if (!this.enabled) return
      
      const audioContext = new (window.AudioContext || window.webkitAudioContext)()
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()
      
      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)
      
      oscillator.frequency.setValueAtTime(150, audioContext.currentTime)
      oscillator.type = 'square'
      
      gainNode.gain.setValueAtTime(0, audioContext.currentTime)
      gainNode.gain.linearRampToValueAtTime(this.volume * 0.4, audioContext.currentTime + 0.01)
      gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.3)
      
      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + 0.3)
    }
  }

  // Son d'aide (ding caractéristique)
  createHintSound() {
    return () => {
      if (!this.enabled) return
      
      const audioContext = new (window.AudioContext || window.webkitAudioContext)()
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()
      
      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)
      
      oscillator.frequency.setValueAtTime(1000, audioContext.currentTime)
      oscillator.type = 'sine'
      
      gainNode.gain.setValueAtTime(0, audioContext.currentTime)
      gainNode.gain.linearRampToValueAtTime(this.volume * 0.3, audioContext.currentTime + 0.01)
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.2)
      
      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + 0.2)
    }
  }

  // Mélodie de niveau complet (fanfare)
  createLevelCompleteMelody() {
    return () => {
      if (!this.enabled) return
      
      const audioContext = new (window.AudioContext || window.webkitAudioContext)()
      const frequencies = [523, 659, 784, 1047, 1319, 1568] // C5, E5, G5, C6, E6, G6
      const durations = [0.12, 0.12, 0.12, 0.12, 0.12, 0.4]
      let currentTime = audioContext.currentTime
      
      frequencies.forEach((freq, index) => {
        const oscillator = audioContext.createOscillator()
        const gainNode = audioContext.createGain()
        
        oscillator.connect(gainNode)
        gainNode.connect(audioContext.destination)
        
        oscillator.frequency.setValueAtTime(freq, currentTime)
        oscillator.type = 'sine'
        
        gainNode.gain.setValueAtTime(0, currentTime)
        gainNode.gain.linearRampToValueAtTime(this.volume * 0.25, currentTime + 0.01)
        gainNode.gain.exponentialRampToValueAtTime(0.001, currentTime + durations[index])
        
        oscillator.start(currentTime)
        oscillator.stop(currentTime + durations[index])
        
        currentTime += durations[index]
      })
    }
  }

  // Son de bouton (click doux)
  createButtonSound() {
    return () => {
      if (!this.enabled) return
      
      const audioContext = new (window.AudioContext || window.webkitAudioContext)()
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()
      
      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)
      
      oscillator.frequency.setValueAtTime(600, audioContext.currentTime)
      oscillator.type = 'triangle'
      
      gainNode.gain.setValueAtTime(0, audioContext.currentTime)
      gainNode.gain.linearRampToValueAtTime(this.volume * 0.2, audioContext.currentTime + 0.01)
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.1)
      
      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + 0.1)
    }
  }

  // Son de chargement (ambiance douce)
  createLoadingSound() {
    return () => {
      if (!this.enabled) return
      
      const audioContext = new (window.AudioContext || window.webkitAudioContext)()
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()
      
      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)
      
      oscillator.frequency.setValueAtTime(440, audioContext.currentTime)
      oscillator.type = 'sine'
      
      gainNode.gain.setValueAtTime(0, audioContext.currentTime)
      gainNode.gain.linearRampToValueAtTime(this.volume * 0.1, audioContext.currentTime + 0.5)
      gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 1.5)
      
      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + 1.5)
    }
  }

  // Jouer un son
  play(soundName) {
    if (this.sounds[soundName] && this.enabled) {
      try {
        this.sounds[soundName]()
      } catch (error) {
        console.log('Erreur lecture son:', error)
      }
    }
  }

  // Activer/désactiver les sons
  setEnabled(enabled) {
    this.enabled = enabled
    localStorage.setItem('soundsEnabled', enabled.toString())
  }

  // Définir le volume
  setVolume(volume) {
    this.volume = Math.max(0, Math.min(1, volume))
    localStorage.setItem('soundsVolume', this.volume.toString())
  }

  // Charger les préférences
  loadPreferences() {
    const enabled = localStorage.getItem('soundsEnabled')
    const volume = localStorage.getItem('soundsVolume')
    
    if (enabled !== null) {
      this.enabled = enabled === 'true'
    }
    
    if (volume !== null) {
      this.volume = parseFloat(volume)
    }
  }
}

// Instance globale
const soundManager = new SoundManager()
soundManager.loadPreferences()

export default soundManager

import { useState, useEffect } from 'react'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { db } from './config/firebase'
import { useAuth } from './context/AuthContext'
import { levels } from './data/levels'
import soundManager from './utils/sounds'
import Header from './components/Header'
import ImageGrid from './components/ImageGrid'
import AnswerSlots from './components/AnswerSlots'
import LetterBank from './components/LetterBank'
import HintButtons from './components/HintButtons'
import LevelComplete from './components/LevelComplete'
import WelcomeScreen from './components/WelcomeScreen'
import SoundControls from './components/SoundControls'
import './App.css'

function App() {
  const { user } = useAuth()
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0)
  const [coins, setCoins] = useState(100)
  const [userAnswer, setUserAnswer] = useState([])
  const [availableLetters, setAvailableLetters] = useState([])
  const [showSuccess, setShowSuccess] = useState(false)
  const [shake, setShake] = useState(false)
  const [revealedLetters, setRevealedLetters] = useState([])
  const [loading, setLoading] = useState(true)
  const [showWelcome, setShowWelcome] = useState(true)

  const currentLevel = levels[currentLevelIndex]

  // Initialiser les lettres disponibles
  useEffect(() => {
    const word = currentLevel.word
    const extra = currentLevel.extraLetters
    const wordLetters = word.split('')
    const extraLetters = extra.split('')
    
    // S'assurer que toutes les lettres du mot sont incluses
    // Prendre les lettres du mot + suffisamment de lettres supplémentaires pour atteindre 12
    const neededExtraLetters = 12 - wordLetters.length
    const shuffledExtra = extraLetters.sort(() => Math.random() - 0.5)
    const selectedExtra = shuffledExtra.slice(0, neededExtraLetters)
    
    const allSelectedLetters = [...wordLetters, ...selectedExtra]
    
    // Mélanger toutes les lettres finales
    const finalShuffled = allSelectedLetters.sort(() => Math.random() - 0.5)
    setAvailableLetters(finalShuffled.map((letter, index) => ({ 
      letter, 
      id: index, 
      used: false 
    })))
    setUserAnswer(new Array(word.length).fill(null))
    setRevealedLetters([])
  }, [currentLevelIndex])

  // Charger la progression depuis Firebase
  useEffect(() => {
    const loadUserProgress = async () => {
      if (!user) {
        setLoading(false)
        return
      }

      try {
        const userDoc = await getDoc(doc(db, 'users', user.uid))
        if (userDoc.exists()) {
          const userData = userDoc.data()
          setCurrentLevelIndex(userData.currentLevel || 0)
          setCoins(userData.coins || 100)
        }
      } catch (error) {
        console.error('Erreur chargement progression:', error)
      } finally {
        setLoading(false)
      }
    }

    loadUserProgress()
  }, [user])

  // Sauvegarder la progression dans Firebase
  useEffect(() => {
    const saveProgress = async () => {
      if (!user || loading) return

      try {
        await setDoc(doc(db, 'users', user.uid), {
          displayName: user.displayName,
          email: user.email,
          currentLevel: currentLevelIndex,
          coins: coins,
          lastPlayed: new Date().toISOString()
        }, { merge: true })
      } catch (error) {
        console.error('Erreur sauvegarde progression:', error)
      }
    }

    saveProgress()
  }, [currentLevelIndex, coins, user, loading])

  const handleLetterClick = (letterId) => {
    const letter = availableLetters.find(l => l.id === letterId && !l.used)
    if (!letter) return

    // Son de clic sur lettre
    soundManager.play('letterClick')

    // Trouver le premier emplacement vide
    const emptyIndex = userAnswer.findIndex(slot => slot === null)
    if (emptyIndex === -1) return // Pas d'espace vide

    setAvailableLetters(prev => 
      prev.map(l => l.id === letterId ? { ...l, used: true } : l)
    )
    setUserAnswer(prev => {
      const newAnswer = [...prev]
      newAnswer[emptyIndex] = { letter: letter.letter, id: letterId }
      return newAnswer
    })

    // Son de placement de lettre
    setTimeout(() => soundManager.play('letterPlace'), 50)
  }

  const handleAnswerSlotClick = (index) => {
    if (index >= userAnswer.length || !userAnswer[index]) return
    
    // Son de retrait de lettre
    soundManager.play('letterRemove')
    
    const removedLetter = userAnswer[index]
    setAvailableLetters(prev => 
      prev.map(l => l.id === removedLetter.id ? { ...l, used: false } : l)
    )
    // Remplacer la lettre par null pour garder l'espace vide
    setUserAnswer(prev => {
      const newAnswer = [...prev]
      newAnswer[index] = null
      return newAnswer
    })
  }

  const checkAnswer = () => {
    const answer = userAnswer.filter(a => a !== null).map(a => a.letter).join('')
    if (answer === currentLevel.word) {
      // Son de victoire
      soundManager.play('victory')
      setShowSuccess(true)
      setCoins(prev => prev + 20)
      setTimeout(() => {
        if (currentLevelIndex < levels.length - 1) {
          setCurrentLevelIndex(prev => prev + 1)
        }
        setShowSuccess(false)
      }, 2000)
    } else if (userAnswer.filter(a => a !== null).length === currentLevel.word.length) {
      // Son d'erreur
      soundManager.play('error')
      setShake(true)
      setTimeout(() => setShake(false), 500)
    }
  }

  useEffect(() => {
    const filledSlots = userAnswer.filter(a => a !== null).length
    if (filledSlots === currentLevel.word.length) {
      checkAnswer()
    }
  }, [userAnswer])

  const handleRevealLetter = () => {
    if (coins < 30) return
    
    // Son d'aide utilisée
    soundManager.play('hint')
    
    const answer = currentLevel.word
    const currentAnswer = userAnswer.map(a => a ? a.letter : '').join('')
    
    // Trouver la prochaine lettre à révéler
    for (let i = 0; i < answer.length; i++) {
      if (!revealedLetters.includes(i) && currentAnswer[i] !== answer[i]) {
        setRevealedLetters(prev => [...prev, i])
        setCoins(prev => prev - 30)
        
        // Placer automatiquement la lettre
        if (!userAnswer[i]) {
          const correctLetter = answer[i]
          const letterToUse = availableLetters.find(l => l.letter === correctLetter && !l.used)
          if (letterToUse) {
            setAvailableLetters(prev => 
              prev.map(l => l.id === letterToUse.id ? { ...l, used: true } : l)
            )
            setUserAnswer(prev => {
              const newAnswer = [...prev]
              newAnswer[i] = { letter: correctLetter, id: letterToUse.id }
              return newAnswer
            })
          }
        }
        break
      }
    }
  }

  const handleRemoveLetters = () => {
    if (coins < 25) return
    
    // Son d'aide utilisée
    soundManager.play('hint')
    
    setCoins(prev => prev - 25)
    const correctLetters = currentLevel.word.split('')
    setAvailableLetters(prev => 
      prev.map(l => ({
        ...l,
        used: !correctLetters.includes(l.letter)
      }))
    )
    
    // Retirer les lettres incorrectes des cases de réponse
    setUserAnswer(prev => 
      prev.map(slot => {
        if (slot && !correctLetters.includes(slot.letter)) {
          return null
        }
        return slot
      })
    )
  }

  const handleSolve = () => {
    if (coins < 50) return
    
    // Son d'aide utilisée
    soundManager.play('hint')
    
    setCoins(prev => prev - 50)
    const answer = currentLevel.word.split('')
    const answerArray = new Array(currentLevel.word.length).fill(null)
    
    answer.forEach((letter, index) => {
      const availableLetter = availableLetters.find(l => l.letter === letter && !l.used)
      if (availableLetter) {
        answerArray[index] = { letter: availableLetter.letter, id: availableLetter.id }
      }
    })
    
    // Marquer toutes les lettres utilisées
    setAvailableLetters(prev => 
      prev.map(l => answer.includes(l.letter) ? { ...l, used: true } : l)
    )
    
    setUserAnswer(answerArray)
  }

  const handleStartGame = () => {
    // Son de bouton
    soundManager.play('button')
    setShowWelcome(false)
  }

  if (loading) {
    return (
      <div className="app">
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh',
          color: 'white',
          fontSize: '24px'
        }}>
          Chargement...
        </div>
      </div>
    )
  }

  if (showWelcome) {
    return (
      <WelcomeScreen 
        onStart={handleStartGame}
        currentLevel={currentLevelIndex}
        totalLevels={levels.length}
        coins={coins}
      />
    )
  }

  return (
    <div className="app">
      <SoundControls />
      
      <Header 
        level={currentLevelIndex + 1} 
        totalLevels={levels.length}
        coins={coins}
      />
      
      <div className="game-container">
        <ImageGrid images={currentLevel.images} />
        
        <AnswerSlots 
          word={currentLevel.word}
          userAnswer={userAnswer}
          onSlotClick={handleAnswerSlotClick}
          shake={shake}
          revealedLetters={revealedLetters}
        />
        
        <HintButtons 
          coins={coins}
          onRevealLetter={handleRevealLetter}
          onRemoveLetters={handleRemoveLetters}
          onSolve={handleSolve}
        />
        
        <LetterBank 
          letters={availableLetters}
          onLetterClick={handleLetterClick}
        />
      </div>

      {showSuccess && <LevelComplete />}
    </div>
  )
}

export default App


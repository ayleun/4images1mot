import './LetterBank.css'

function LetterBank({ letters, onLetterClick }) {
  const handleLetterClick = (letterId) => {
    // Vibration pour les appareils mobiles
    if (navigator.vibrate) {
      navigator.vibrate(50) // Vibration de 50ms
    }
    
    // Appeler la fonction originale
    onLetterClick(letterId)
  }

  return (
    <div className="letter-bank">
      {letters.map((letter) => (
        <button
          key={letter.id}
          className={`letter-button ${letter.used ? 'used' : ''}`}
          onClick={() => handleLetterClick(letter.id)}
          disabled={letter.used}
        >
          <span>{letter.letter}</span>
        </button>
      ))}
    </div>
  )
}

export default LetterBank


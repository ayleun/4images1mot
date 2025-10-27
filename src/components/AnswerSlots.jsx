import './AnswerSlots.css'

function AnswerSlots({ word, userAnswer, onSlotClick, shake, revealedLetters }) {
  return (
    <div className={`answer-slots ${shake ? 'shake' : ''}`}>
      {Array.from({ length: word.length }).map((_, index) => (
        <div 
          key={index}
          className={`answer-slot ${userAnswer[index] ? 'filled' : ''} ${revealedLetters.includes(index) ? 'revealed' : ''}`}
          onClick={() => onSlotClick(index)}
        >
          <span>{userAnswer[index] ? userAnswer[index].letter : ''}</span>
        </div>
      ))}
    </div>
  )
}

export default AnswerSlots


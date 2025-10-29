import './LevelComplete.css'

function LevelComplete() {
  return (
    <div className="level-complete-overlay">
      <div className="level-complete-content">
        <div className="success-icon">🎉</div>
        <h2 className="success-title">Bravo !</h2>
        <p className="success-message">Niveau réussi !</p>
        <div className="coins-earned">+20 pièces</div>
      </div>
    </div>
  )
}

export default LevelComplete




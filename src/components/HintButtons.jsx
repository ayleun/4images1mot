import { Eye, X, Check } from 'lucide-react'
import './HintButtons.css'

function HintButtons({ coins, onRevealLetter, onRemoveLetters, onSolve }) {
  return (
    <div className="hint-buttons">
      <button 
        className="hint-button"
        onClick={onRevealLetter}
        disabled={coins < 30}
        title="Révéler une lettre (30 pièces)"
      >
        <Eye size={20} />
        <span className="hint-text">Révéler</span>
        <span className="hint-cost">30</span>
      </button>

      <button 
        className="hint-button"
        onClick={onRemoveLetters}
        disabled={coins < 25}
        title="Enlever les lettres inutiles (25 pièces)"
      >
        <X size={20} />
        <span className="hint-text">Enlever</span>
        <span className="hint-cost">25</span>
      </button>

      <button 
        className="hint-button"
        onClick={onSolve}
        disabled={coins < 50}
        title="Résoudre le niveau (50 pièces)"
      >
        <Check size={20} />
        <span className="hint-text">Résoudre</span>
        <span className="hint-cost">50</span>
      </button>
    </div>
  )
}

export default HintButtons




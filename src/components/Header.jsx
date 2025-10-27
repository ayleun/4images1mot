import { Coins, Lightbulb } from 'lucide-react'
import UserMenu from './UserMenu'
import './Header.css'

function Header({ level, totalLevels, coins }) {
  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          <div className="coins-container">
            <Coins className="coin-icon" size={18} />
            <span className="coins-amount">{coins}</span>
          </div>
        </div>
        
        <div className="level-center">
          <div className="level-label">NIVEAU</div>
          <div className="level-badge">{level}</div>
        </div>
        
        <div className="header-right">
          <UserMenu />
        </div>
      </div>
    </header>
  )
}

export default Header


import { Routes, Route, Link } from 'react-router-dom'
import Plinko from './Plinko.jsx'

function Menu() {
  return (
    <div className="menu">
      <h1>Codex Games</h1>
      <ul>
        <li><Link to="/plinko">Plinko</Link></li>
      </ul>
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Menu />} />
      <Route path="/plinko" element={<Plinko />} />
    </Routes>
  )
}

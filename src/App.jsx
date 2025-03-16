
import './App.css'

import { Outlet } from 'react-router-dom'

import Home from './routes/Home.jsx'

function App() {


  return (
    <div className="App">
      <Outlet />

    </div>
  )
}

export default App

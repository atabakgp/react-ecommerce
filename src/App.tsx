import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Header from './components/header/header'
import './App.scss'
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <div className="App">
      <Header />
      <Home />
    </div>
  )
}

export default App

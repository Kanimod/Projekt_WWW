import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { LoginContainer } from './Components/LoginContainer'

createRoot(document.getElementById('login-container')).render(<LoginContainer />)

createRoot(document.getElementById('root')).render(<App />)

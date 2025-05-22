import './App.css'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { Home } from './Pages/Home'
import { AboutUs } from './Pages/AboutUs'
import { Survey } from './Pages/Survey'
import { Layout } from './WebLayout'


function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/survey" element={<Survey />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App

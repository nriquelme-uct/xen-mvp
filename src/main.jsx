import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import NavbarHome from './components/tabs/navbarHome'
import Home from './components/tabs/home'
import FooterHome from './components/tabs/footerHome'
import Food from './components/tabs/food'
import Training from './components/tabs/trainning'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <NavbarHome/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/food" element={<Food/>}/>
        <Route path="/training" element={<Training/>}/>
      </Routes>
        <FooterHome/>
    </Router>
  </StrictMode>,
)

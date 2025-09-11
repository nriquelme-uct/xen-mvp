import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { AuthProvider } from './contexts/AuthContext'
import NavbarHome from './components/tabs/navbarHome'
import Home from './components/tabs/home'
import FooterHome from './components/tabs/footerHome'
import Food from './components/tabs/food'
import Training from './components/tabs/trainning'
import Login from './components/tabs/login'
import Register from './components/tabs/register'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <Router>
        <NavbarHome/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/food" element={<Food/>}/>
          <Route path="/training" element={<Training/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
        </Routes>
        <FooterHome/>
      </Router>
    </AuthProvider>
  </StrictMode>
)

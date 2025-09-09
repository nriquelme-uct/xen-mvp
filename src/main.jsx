import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import NavbarHome from './components/tabs/navbarHome'
import Home from './components/tabs/home'
import FooterHome from './components/tabs/footerHome'
import App from './components/app'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    
    <NavbarHome/>
    <Home/>
    <FooterHome/>

  </StrictMode>,
)

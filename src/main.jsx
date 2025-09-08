import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Navbar from './components/tabs/navbar'
import Home from './components/tabs/home'
import Footer from './components/tabs/footer'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    
    <Navbar/>
    <Home/>
    <Footer/>

  </StrictMode>,
)

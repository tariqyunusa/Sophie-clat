import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import About from './pages/About.jsx'
import Collections from './pages/Collections'
import Gallery from './pages/Gallery.jsx'

createRoot(document.getElementById('root')).render(

    <BrowserRouter>
        <Routes>
        <Route path='/' element={<App />}/>
        <Route path='/about' element={<About />}/>
        <Route path='/collection' element={<Collections />}/>
        <Route path='/gallery' element={<Gallery />} />

        </Routes>
    </BrowserRouter>
  
)

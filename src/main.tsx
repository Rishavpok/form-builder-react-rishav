import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home.tsx'
import BuilderPage from './pages/BuilderPage/BuilderPage.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/builder" element={<BuilderPage />} />        {/* Create */}
        <Route path="/builder/:id" element={<BuilderPage />} />   {/* Edit */}
      </Routes>
    </BrowserRouter>
  </StrictMode>
)


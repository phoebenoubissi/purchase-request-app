import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ComponentPreview } from './preview/ComponentPreview.tsx'

const isPreview = new URLSearchParams(window.location.search).has('preview')

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {isPreview ? <ComponentPreview /> : <App />}
  </StrictMode>,
)

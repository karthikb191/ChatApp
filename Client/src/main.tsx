import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './Css/Index.css'
//import App from './App.tsx'
import {TestApp} from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TestApp/>
  </StrictMode>,
)

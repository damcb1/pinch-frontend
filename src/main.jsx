import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./styles/main.scss"
import App from './App.jsx'
import {AuthProvider} from "./context/AuthContext.jsx";

document.documentElement.setAttribute('data-theme', localStorage.getItem('theme') || 'light');

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <AuthProvider>
          <App />
      </AuthProvider>
  </StrictMode>,
)
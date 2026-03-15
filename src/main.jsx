import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />

    {/* Toaster for success/error notifications */}
    <Toaster
      position="top-right"
      reverseOrder={false}
      toastOptions={{
        duration: 3000,
        style: {
          background: '#0f172a',
          color: '#fff',
          border: '1px solid rgba(148, 163, 184, 0.25)',
        },
        success: {
          style: { border: '1px solid rgba(34, 197, 94, 0.35)' },
        },
        error: {
          style: { border: '1px solid rgba(239, 68, 68, 0.35)' },
        },
      }}
    />
  </StrictMode>,
)
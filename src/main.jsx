import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import BlockchainProvider from './BlockchainProvider.jsx';
import { BrowserRouter } from "react-router-dom"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BlockchainProvider>
    <BrowserRouter>
    
      <App />
    
    </BrowserRouter>
    </BlockchainProvider>
  </StrictMode>,
)

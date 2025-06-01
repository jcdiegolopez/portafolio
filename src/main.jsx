import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/global.css'
import App from './App.jsx'
import Test from './components/common/Test.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    {/* <Test />   */}
  </StrictMode>,
)


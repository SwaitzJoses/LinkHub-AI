import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import "./emma-core/testEmma.js";   // 👈 TEMP TEST

createRoot(document.getElementById('root')).render(
  <App />
)
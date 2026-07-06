import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// import "./emma-core/testEmma.js";   // 👈 TEMP TEST

// 🧪 TEMP TEST ONLY
import "./emma-core/testConnectors";

createRoot(document.getElementById('root')).render(
  <App />
)
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import firebaseConfig from './firebaseConfig.ts'
import { initializeApp} from 'firebase/app'

initializeApp(firebaseConfig)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

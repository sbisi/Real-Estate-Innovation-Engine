import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx'

console.log('main.jsx loaded')

const container = document.getElementById('root')
console.log('Root container:', container)

if (container) {
  const root = ReactDOM.createRoot(container)
  console.log('React root created')
  root.render(<App />)
  console.log('App rendered')
} else {
  console.error('Root container not found!')
}


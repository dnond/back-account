import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'
import './index.css'
import { createRepository } from './core/repository'

const repository = createRepository()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App repository={repository} />
  </React.StrictMode>
)

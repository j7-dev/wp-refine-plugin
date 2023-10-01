import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import App2 from './App2'
import { renderId1, renderId2 } from '@/utils'

const id1 = document.getElementById(renderId1)

if (!!id1) {
  ReactDOM.createRoot(id1).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )
}

const id2 = document.getElementById(renderId2)

if (!!id2) {
  ReactDOM.createRoot(id2).render(
    <React.StrictMode>
      <App2 />
    </React.StrictMode>,
  )
}

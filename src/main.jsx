import React from 'react'
import ReactDOM from 'react-dom/client'

import './styles.css'
import {  BrowserRouter, HashRouter} from 'react-router-dom'
import { MainPage } from './pages/MainPage'
import { AppProvider } from './context/AppProvider'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <AppProvider>
        <MainPage />
      </AppProvider>
    </HashRouter>
  </React.StrictMode>,
)

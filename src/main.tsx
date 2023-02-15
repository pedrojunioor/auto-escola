import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react'
import ReactDOM from 'react-dom/client'
import { ProSidebarProvider } from 'react-pro-sidebar';
import { StorageProvider } from "../src/context/contextStorage";
import App from './App'
import './index.scss'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ProSidebarProvider>
      <StorageProvider>
        <App />
      </StorageProvider>
    </ProSidebarProvider>
  </React.StrictMode>,
)

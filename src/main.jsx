import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx';
import StoreContextProvider from "./Context/StoreContext";
import {BrowserRouter} from "react-router-dom"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <StoreContextProvider>
      <BrowserRouter>
       <App />
       </BrowserRouter>
    </StoreContextProvider>
   
  </StrictMode>,
)

import { useState } from 'react'
import { BrowserRouter ,Routes,Route } from "react-router-dom";
import './App.css'
import { Landing } from './screens/Landing';
import GamePage from './screens/GamePage';
function App() {
 

  return (
    
     <BrowserRouter>
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/game" element={<GamePage />} />
    </Routes>
  </BrowserRouter>
   
       
    
  )
}

export default App

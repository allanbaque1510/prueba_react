import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './page/Login'
import Posts from './page/Posts'
import Destacados from './page/Destacados'
import { DataProvider } from './context/DataContext'
import ProtectedRoute from './ProtectedRoute'
function App() {

  return (
    <DataProvider>
      <BrowserRouter>
          <Routes>
            <Route path='/login' element={<Login/>} />
            <Route path='/destacados' element={<Destacados/>} />
            
            <Route element={<ProtectedRoute/>}>
              <Route path='/posts' element={<Posts/>} />
            </Route>
          </Routes>
        </BrowserRouter>
    </DataProvider>
  )
}

export default App

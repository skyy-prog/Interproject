import './App.css'
import React, { useContext } from 'react'
import { Routes , Route } from 'react-router-dom'
import Login from './component/Login'
import DashboardUI from './component/Dashboard'
 import { Usercreatecontext } from './Context/usercontext'
 
function App() {
  const {token} = useContext(Usercreatecontext)
  return (
    <>
    <Routes>
      <Route path='/' element={ token ? <DashboardUI/> : <Login/>}/>
      <Route  path='/DashboardUI' element={<DashboardUI/>}/>
    </Routes>
    </>
  )
}

export default App

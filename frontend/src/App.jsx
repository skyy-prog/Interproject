import './App.css'
import React, { useContext } from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './component/Login'
import DashboardUI from './component/Dashboard'
import { Usercreatecontext } from './Context/usercontext'

const ProtectedRoute = ({ children }) => {
  const { token } = useContext(Usercreatecontext);
  return token ? children : <Login />;
};

function App() {
  return (
    <Routes>
      <Route path='/' element={<Login />} />

      <Route
        path='/DashboardUI'
        element={
          <ProtectedRoute>
            <DashboardUI />
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}

export default App;

import './App.css'
import React, { useContext } from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './component/Login'
import DashboardUI from './component/Dashboard'
import { Toaster } from 'react-hot-toast'
import { Usercreatecontext } from './Context/usercontext'

const ProtectedRoute = ({ children }) => {
  const { token } = useContext(Usercreatecontext);
  return token ? children : <Login />;
};

function App() {
  return (
       <> <Toaster
      position="top-center"
      reverseOrder={false}
      gutter={10}
      containerClassName=""
      containerStyle={{}}
      toasterId="default"
      toastOptions={{
        // Define default options
        className: '',
        duration: 3000,
        removeDelay: 1000,
        style: {
          background: '#363636',
          color: '#fff',
        },
    
        // Default options for specific types
        success: {
          duration: 3000,
          iconTheme: {
            primary: 'green',
            secondary: 'black',
          },
        },
      }}
    /> 
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
    </>
  )
}

export default App;

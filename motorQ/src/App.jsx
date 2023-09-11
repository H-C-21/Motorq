import { useState } from 'react'
import './App.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import  RootLayout  from './pages/RootLayout'
import UserPage from './pages/UserPage'
import LoginPage from './pages/LoginPage'

function App() {
  const [count, setCount] = useState(0)


  const router = createBrowserRouter([
    { path: '/', element: <RootLayout/>, children:
      [
        { path: '/userpage', element: <UserPage/> },
        { path: '/login', element: <LoginPage/> },
      ]
    },
  ])


  return (
    <>
     <RouterProvider
    router={router}
    
  />
    </>
  )
}

export default App

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Auth from './components/Auth.jsx'
import App from '../src/App.jsx'
import TaskManager from './components/TaskManager.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'

const appRouter = createBrowserRouter([
  {
    path:"/",
    element:<App/>,
    children:[
      {
        path:"/",
        element:<Auth/>
      },
      {
        path:"/home",
        element:<ProtectedRoute/>,
        children:[
          {
            path:":id",
            element: <TaskManager/>
          }
        ]
      }
    ]
  },
  
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={appRouter}/>
  </StrictMode>,
)

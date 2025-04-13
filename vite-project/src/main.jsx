import { StrictMode, lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createHashRouter, RouterProvider } from 'react-router-dom'
import LoadingSpinner from './components/LoadingSpinner.jsx'

// Lazy-loaded components
const Auth = lazy(() => import('./components/Auth.jsx'))
const App = lazy(() => import('./App.jsx'))
const TaskManager = lazy(() => new Promise(res => {
  setTimeout(() => res(import('./components/TaskManager.jsx')), 2000)
}));

const ProtectedRoute = lazy(() => import('./components/ProtectedRoute.jsx'))

// Suspense wrapper
const Load = (Component) => (
  <Suspense fallback={<LoadingSpinner />}>
    <Component />
  </Suspense>
)

const appRouter = createHashRouter([
  {
    path: '/',
    element: Load(App),
    children: [
      {
        path: '/',
        element: Load(Auth),
      },
      {
        path: '/home',
        element: Load(ProtectedRoute),
        children: [
          {
            path: ':id',
            element: Load(TaskManager),
          },
        ],
      },
    ],
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={appRouter} />
  </StrictMode>
)

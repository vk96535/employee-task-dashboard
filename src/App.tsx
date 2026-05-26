import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Layout from './components/Layout'
import ProtectedRoute from './components/ProtectedRoute'

import Dashboard from './pages/Dashboard'
import ApiTasks from './pages/ApiTasks'
import About from './pages/About'
import Login from './pages/Login'
import NotFound from './pages/NotFound'

import './App.css'

function App() {
  return (
    <>
      <Routes>

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />

          <Route
            path="api-tasks"
            element={<ApiTasks />}
          />

          <Route
            path="about"
            element={<About />}
          />
        </Route>

        <Route
          path="*"
          element={<NotFound />}
        />

      </Routes>

      <ToastContainer />
    </>
  )
}

export default App
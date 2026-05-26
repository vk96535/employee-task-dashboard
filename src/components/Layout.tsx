import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { useState } from 'react'

function Layout() {
  const [darkMode, setDarkMode] = useState(false)

  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn")
    navigate("/login")
  }

  return (
    <div
      className={
        darkMode
          ? 'min-h-screen bg-slate-900 text-white transition-all duration-300'
          : 'min-h-screen bg-gray-100 text-gray-900 transition-all duration-300'
      }
    >
      <header
        className={
          darkMode
            ? 'bg-slate-950 shadow-lg'
            : 'bg-white shadow-lg'
        }
      >
        <div className="max-w-7xl mx-auto px-6 py-8 text-center">

          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Employee Task Dashboard
          </h1>

          <div className="flex justify-center gap-4 mb-6">

            <button
              onClick={() => setDarkMode(!darkMode)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-semibold"
            >
              {darkMode ? 'Light Mode' : 'Dark Mode'}
            </button>

            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-2xl font-semibold"
            >
              Logout
            </button>

          </div>

          <nav className="flex justify-center gap-10 text-2xl font-medium">
            <NavLink to="/">Dashboard</NavLink>

            <NavLink to="/api-tasks">
              API Tasks
            </NavLink>

            <NavLink to="/about">
              About
            </NavLink>
          </nav>

        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10">
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
import { Link, Outlet } from 'react-router-dom'
import { useState } from 'react'

function Layout() {
  const [darkMode, setDarkMode] = useState(false)

  return (
    <div
      className={
        darkMode
          ? "min-h-screen bg-gray-900 text-white"
          : "min-h-screen bg-gray-100 text-gray-900"
      }
    >
      <header
        className={
          darkMode
            ? "bg-gray-800 shadow-md py-6 mb-8"
            : "bg-white shadow-md py-6 mb-8"
        }
      >
        <div className="max-w-6xl mx-auto px-4 md:px-6 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Employee Task Dashboard
          </h1>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="mb-5 rounded-xl bg-blue-600 px-5 py-2 text-white font-semibold hover:bg-blue-700"
          >
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>

          <nav className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-8 text-base md:text-lg font-medium">
            <Link className="text-blue-500 hover:text-blue-700" to="/">
              Dashboard
            </Link>

            <Link className="text-blue-500 hover:text-blue-700" to="/api-tasks">
              API Tasks
            </Link>

            <Link className="text-blue-500 hover:text-blue-700" to="/about">
              About
            </Link>
          </nav>
        </div>
      </header>

      <main>
        <Outlet context={{ darkMode }} />
      </main>
    </div>
  )
}

export default Layout
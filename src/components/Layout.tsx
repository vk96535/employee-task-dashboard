import { Link, Outlet } from 'react-router-dom'
import { useState } from 'react'

function Layout() {
  const [darkMode, setDarkMode] = useState(false)

  return (
    <div className={darkMode ? "container dark-mode" : "container"}>
      <h1 className="title">
        Employee Task Dashboard
      </h1>

      <button onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>

      <nav>
        <Link to="/">Dashboard</Link> |{" "}
        <Link to="/api-tasks">API Tasks</Link> |{" "}
        <Link to="/about">About</Link>
      </nav>

      <Outlet />
    </div>
  )
}

export default Layout
import { useEffect, useState } from 'react'
import Loader from '../components/LoaderTemp'

interface ApiTask {
  id: number
  todo: string
  completed: boolean
}

function ApiTasks() {

  const [apiTasks, setApiTasks] = useState<ApiTask[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const fetchTasks = async () => {

    try {

      setLoading(true)

      const response = await fetch(
        "https://dummyjson.com/todos?limit=5"
      )

      if (!response.ok) {
        throw new Error("Failed to fetch tasks")
      }

      const data = await response.json()

      setApiTasks(data.todos)

    } catch (error) {

      setError("Something went wrong")

      console.log(error)

    } finally {

      setLoading(false)
    }
  }

  useEffect(() => {

    fetchTasks()

  }, [])

  return (
    <div className="api-section">

      <h2>API Tasks</h2>

      {loading && <Loader />}

      {error && (
        <p className="error-message">
          {error}
        </p>
      )}

      {!loading && !error && (

        apiTasks.map((item) => (

          <div
            key={item.id}
            className="task-item"
          >
            {item.todo}
          </div>

        ))
      )}

    </div>
  )
}

export default ApiTasks
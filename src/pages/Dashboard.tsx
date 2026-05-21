import { useEffect, useMemo, useState } from 'react'
import DashboardCard from '../components/DashboardCard'
import TaskItem from '../components/TaskItem'
import useLocalStorage from '../hooks/useLocalStorage'
import { toast } from 'react-toastify'


function Dashboard() {
  const [task, setTask] = useState("")
  const [priority, setPriority] = useState("High")
  const [dueDate, setDueDate] = useState("")
  const [searchText, setSearchText] = useState("")
  const [filterStatus, setFilterStatus] = useState("All")
  const [sortBy, setSortBy] = useState("Default")
  const [editId, setEditId] = useState<number | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [error, setError] = useState("")

  const [taskList, setTaskList] = useLocalStorage<
    {
      id: number
      name: string
      completed: boolean
      priority: string
      dueDate: string
    }[]
  >("tasks", [])

  useEffect(() => {
    console.log("Dashboard Mounted")
  }, [])

  const handleAddTask = () => {
    if (task.trim() === "") {
      setError("Task name is required")
      return
    }

    if (isEditing && editId !== null) {
      const updatedTasks = taskList.map((item) => {
        if (item.id === editId) {
          return {
            ...item,
            name: task,
            priority,
            dueDate
          }
        }

        return item
      })

      setTaskList(updatedTasks)
      setIsEditing(false)
      setEditId(null)
    } else {
      setTaskList([
        ...taskList,
        {
          id: Date.now(),
          name: task,
          completed: false,
          priority,
          dueDate
        }
      ])
    }
    
    toast.success("Task Added Successfully")

    setTask("")
    setPriority("High")
    setDueDate("")
    setError("")
  }

  const handleEditTask = (id: number) => {
    const selectedTask = taskList.find((item) => item.id === id)

    if (!selectedTask) {
      return
    }

    setTask(selectedTask.name)
    setPriority(selectedTask.priority || "High")
    setDueDate(selectedTask.dueDate || "")
    setEditId(id)
    setIsEditing(true)
  }

  const handleDeleteTask = (id: number) => {
    const updatedTasks = taskList.filter((item) => item.id !== id)
    setTaskList(updatedTasks)
    toast.error("Task Deleted")
  }

  const handleCompleteTask = (id: number) => {
    const updatedTasks = taskList.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          completed: !item.completed
        }
      }

      return item
    })

    setTaskList(updatedTasks)
    toast.success("Task Status Updated")
    toast.info("Task Updated")
  }

  const filteredTasks = useMemo(() => {
  const priorityOrder: Record<string, number> = {
    High: 1,
    Medium: 2,
    Low: 3
  }

  const result = taskList.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchText.toLowerCase())

    const matchesFilter =
      filterStatus === "All"
        ? true
        : filterStatus === "Completed"
        ? item.completed
        : !item.completed

    return matchesSearch && matchesFilter
  })

  if (sortBy === "Priority") {
    return [...result].sort(
      (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
    )
  }

  if (sortBy === "DueDate") {
    return [...result].sort((a, b) => {
      if (!a.dueDate) return 1
      if (!b.dueDate) return -1

      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
    })
  }

  return result
}, [taskList, searchText, filterStatus, sortBy])

  const totalTaskCount = taskList.length
  const completedTaskCount = taskList.filter((item) => item.completed).length
  const pendingTaskCount = taskList.filter((item) => !item.completed).length
  const highPriorityCount = taskList.filter(
  (item) => item.priority === "High"
).length

const mediumPriorityCount = taskList.filter(
  (item) => item.priority === "Medium"
).length

const lowPriorityCount = taskList.filter(
  (item) => item.priority === "Low"
).length

  return (
    <div>
      <p className="description">
        Track employee tasks and project progress
      </p>

      <div className="task-input-section">
        <input
          type="text"
          placeholder="Enter task name"
          value={task}
          onChange={(e) => {
            setTask(e.target.value)
            setError("")
          }}
        />

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />

        <button onClick={handleAddTask}>
          {isEditing ? "Update Task" : "Add Task"}
        </button>
      </div>

      {error && (
        <p className="error-message">
          {error}
        </p>
      )}

      

      <div className="filter-section">
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="All">All Tasks</option>
          <option value="Completed">Completed</option>
          <option value="Pending">Pending</option>
        </select>
      </div>


      <div className="sort-section">
  <select
    value={sortBy}
    onChange={(e) => setSortBy(e.target.value)}
  >
    <option value="Default">Default</option>
    <option value="Priority">Priority</option>
    <option value="DueDate">Due Date</option>
  </select>
</div>

      <div className="search-section">
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      <div className="task-list">
        {filteredTasks.length === 0 ? (
          <p>No tasks found</p>
        ) : (
          filteredTasks.map((item) => (
            <TaskItem
              key={item.id}
              id={item.id}
              name={item.name}
              completed={item.completed}
              priority={item.priority}
              dueDate={item.dueDate}
              onEdit={handleEditTask}
              onComplete={handleCompleteTask}
              onDelete={handleDeleteTask}
            />
          ))
        )}
      </div>

      <div className="priority-summary">

  <p>
    High Priority: {highPriorityCount}
  </p>

  <p>
    Medium Priority: {mediumPriorityCount}
  </p>

  <p>
    Low Priority: {lowPriorityCount}
  </p>

</div>

      <div className="card-container">
        <DashboardCard title="Total Tasks" count={totalTaskCount} />
        <DashboardCard title="Completed" count={completedTaskCount} />
        <DashboardCard title="Pending" count={pendingTaskCount} />
      </div>
    </div>

    
  )
}

export default Dashboard
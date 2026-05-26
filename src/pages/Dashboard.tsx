import { useEffect, useMemo, useState } from 'react'
import { toast } from 'react-toastify'
import DashboardCard from '../components/DashboardCard'
import TaskItem from '../components/TaskItem'
import useLocalStorage from '../hooks/useLocalStorage'
import EditTaskModal from '../components/EditTaskModal'
import DeleteConfirmModal from '../components/DeleteConfirmModal'

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
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [deleteId, setDeleteId] = useState<number | null>(null)

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
      toast.warning("Please enter a task name")
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
      toast.info("Task Updated")
      setIsEditing(false)
      setEditId(null)
      setShowEditModal(false)
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

      toast.success("Task Added Successfully")
    }

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
    setShowEditModal(true)
  }

  const handleDeleteTask = (id: number) => {
    setDeleteId(id)
    setShowDeleteModal(true)
  }

  const confirmDeleteTask = () => {
    if (deleteId === null) {
      return
    }

    const updatedTasks = taskList.filter((item) => item.id !== deleteId)

    setTaskList(updatedTasks)
    toast.error("Task Deleted")
    setShowDeleteModal(false)
    setDeleteId(null)
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

    const selectedTask = taskList.find((item) => item.id === id)

    if (selectedTask?.completed) {
      toast.info("Task moved back to pending")
    } else {
      toast.success("Task completed successfully")
    }
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
    <div className="min-h-screen bg-gray-100 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        <p className="text-center text-gray-600 mb-6 text-base md:text-lg">
          Track employee tasks and project progress
        </p>

        <div className="bg-white p-6 rounded-2xl shadow-md flex flex-col md:flex-row md:flex-wrap gap-4 items-center justify-center mb-8">
          <input
            className="w-full md:w-72 border border-gray-300 rounded-xl px-4 py-3 bg-white text-gray-900"
            type="text"
            placeholder="Enter task name"
            value={task}
            onChange={(e) => {
              setTask(e.target.value)
              setError("")
            }}
          />

          <select
            className="w-full md:w-44 border border-gray-300 rounded-xl px-4 py-3 bg-white text-gray-900"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>

          <input
            className="w-full md:w-52 border border-gray-300 rounded-xl px-4 py-3 bg-white text-gray-900"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />

          <button
            className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold"
            onClick={handleAddTask}
          >
            {isEditing ? "Update Task" : "Add Task"}
          </button>
        </div>

        {error && (
          <p className="text-center text-red-600 font-semibold mb-4">
            {error}
          </p>
        )}

        <div className="bg-white p-5 rounded-2xl shadow-md flex flex-col md:flex-row gap-4 items-center justify-center mb-8">
          <select
            className="w-full md:w-48 border border-gray-300 rounded-xl px-4 py-3 bg-white text-gray-900"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="All">All Tasks</option>
            <option value="Completed">Completed</option>
            <option value="Pending">Pending</option>
          </select>

          <select
            className="w-full md:w-48 border border-gray-300 rounded-xl px-4 py-3 bg-white text-gray-900"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="Default">Default</option>
            <option value="Priority">Priority</option>
            <option value="DueDate">Due Date</option>
          </select>

          <input
            className="w-full md:w-80 border border-gray-300 rounded-xl px-4 py-3 bg-white text-gray-900"
            type="text"
            placeholder="Search tasks..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>

        <div className="space-y-4 mb-8">
          {filteredTasks.length === 0 ? (
            <p className="text-center text-gray-600 text-lg">
              No tasks found
            </p>
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

        <div className="bg-white rounded-2xl shadow-md p-6 text-center mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <p className="font-semibold text-red-600">
            High Priority: {highPriorityCount}
          </p>

          <p className="font-semibold text-orange-500">
            Medium Priority: {mediumPriorityCount}
          </p>

          <p className="font-semibold text-green-600">
            Low Priority: {lowPriorityCount}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          <DashboardCard title="Total Tasks" count={totalTaskCount} />
          <DashboardCard title="Completed" count={completedTaskCount} />
          <DashboardCard title="Pending" count={pendingTaskCount} />
        </div>

        {showEditModal && (
          <EditTaskModal
            task={task}
            priority={priority}
            dueDate={dueDate}
            onTaskChange={setTask}
            onPriorityChange={setPriority}
            onDueDateChange={setDueDate}
            onSave={handleAddTask}
            onClose={() => {
              setShowEditModal(false)
              setIsEditing(false)
              setEditId(null)
              setTask("")
              setPriority("High")
              setDueDate("")
            }}
          />
        )}

        {showDeleteModal && (
          <DeleteConfirmModal
            onConfirm={confirmDeleteTask}
            onCancel={() => {
              setShowDeleteModal(false)
              setDeleteId(null)
            }}
          />
        )}
      </div>
    </div>
  )
}

export default Dashboard
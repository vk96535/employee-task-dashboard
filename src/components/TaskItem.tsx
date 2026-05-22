type TaskItemProps = {
  id: number
  name: string
  completed: boolean
  priority: string
  dueDate: string
  onEdit: (id: number) => void
  onComplete: (id: number) => void
  onDelete: (id: number) => void
}

function TaskItem({
  id,
  name,
  completed,
  priority,
  dueDate,
  onEdit,
  onComplete,
  onDelete
}: TaskItemProps) {
  const priorityColor =
    priority === "High"
      ? "bg-red-500"
      : priority === "Medium"
      ? "bg-orange-500"
      : "bg-green-600"

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-2xl shadow-md p-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-4">
        <span
          className={
            completed
              ? "text-gray-400 line-through text-lg"
              : "text-gray-900 text-lg font-medium"
          }
        >
          {name}
        </span>

        {priority && (
          <span
            className={`${priorityColor} text-white px-3 py-1 rounded-full text-sm font-semibold w-fit`}
          >
            {priority}
          </span>
        )}

        {dueDate && (
          <span className="text-gray-500 text-sm">
            Due: {dueDate}
          </span>
        )}
      </div>

      <div className="flex gap-3 flex-wrap">
        <button
          className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
          onClick={() => onEdit(id)}
        >
          Edit
        </button>

        <button
          className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
          onClick={() => onComplete(id)}
        >
          {completed ? "Undo" : "Complete"}
        </button>

        <button
          className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
          onClick={() => onDelete(id)}
        >
          Delete
        </button>
      </div>
    </div>
  )
}

export default TaskItem
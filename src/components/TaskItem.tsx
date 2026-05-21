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
  return (
    <div className="task-item">
      <div className="task-left">
        <span className={completed ? "completed-task" : ""}>
          {name}
        </span>

        {priority && (
          <span className={`priority-badge ${priority.toLowerCase()}`}>
            {priority}
          </span>
        )}

        {dueDate && (
          <span className="due-date">
            Due: {dueDate}
          </span>
        )}
      </div>

      <div className="task-actions">
        <button onClick={() => onEdit(id)}>
          Edit
        </button>

        <button onClick={() => onComplete(id)}>
          {completed ? "Undo" : "Complete"}
        </button>

        <button onClick={() => onDelete(id)}>
          Delete
        </button>
      </div>
    </div>
  )
}

export default TaskItem
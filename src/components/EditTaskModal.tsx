type EditTaskModalProps = {
  task: string
  priority: string
  dueDate: string
  onTaskChange: (value: string) => void
  onPriorityChange: (value: string) => void
  onDueDateChange: (value: string) => void
  onSave: () => void
  onClose: () => void
}

function EditTaskModal({
  task,
  priority,
  dueDate,
  onTaskChange,
  onPriorityChange,
  onDueDateChange,
  onSave,
  onClose
}: EditTaskModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">
          Edit Task
        </h2>

        <input
          className="w-full border border-gray-300 rounded-xl px-4 py-3 mb-4 text-gray-900"
          type="text"
          value={task}
          onChange={(e) => onTaskChange(e.target.value)}
        />

        <select
          className="w-full border border-gray-300 rounded-xl px-4 py-3 mb-4 text-gray-900"
          value={priority}
          onChange={(e) => onPriorityChange(e.target.value)}
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        <input
          className="w-full border border-gray-300 rounded-xl px-4 py-3 mb-6 text-gray-900"
          type="date"
          value={dueDate}
          onChange={(e) => onDueDateChange(e.target.value)}
        />

        <div className="flex gap-4">
          <button
            className="w-full bg-gray-300 hover:bg-gray-400 text-gray-900 py-3 rounded-xl font-semibold"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold"
            onClick={onSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
}

export default EditTaskModal
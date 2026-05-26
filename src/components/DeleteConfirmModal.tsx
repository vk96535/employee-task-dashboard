type DeleteConfirmModalProps = {
  onConfirm: () => void
  onCancel: () => void
}

function DeleteConfirmModal({
  onConfirm,
  onCancel
}: DeleteConfirmModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Delete Task?
        </h2>

        <p className="text-gray-600 mb-6">
          Are you sure you want to delete this task?
        </p>

        <div className="flex gap-4">
          <button
            className="w-full bg-gray-300 hover:bg-gray-400 text-gray-900 py-3 rounded-xl font-semibold"
            onClick={onCancel}
          >
            Cancel
          </button>

          <button
            className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-semibold"
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteConfirmModal
import { Button } from "@/components/common";

const DeleteConfirmationModal = ({ taskName, onConfirm, onCancel }) => (
  <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
    <div className="bg-white p-6 rounded-lg w-80 text-black">
      <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
      <p className="mb-6">
        Are you sure you want to delete the task <strong>{taskName}</strong>?
      </p>
      <div className="flex justify-end space-x-4">
        <Button variant="outline" innerText="Cancel" onClick={onCancel} />
        <Button variant="danger" innerText="Delete" onClick={onConfirm} />
      </div>
    </div>
  </div>
);

export default DeleteConfirmationModal;

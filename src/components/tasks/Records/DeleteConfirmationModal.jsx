import { Button, Modal } from "@/components/common";

const DeleteConfirmationModal = ({ taskName, onConfirm, onCancel }) => (
  <Modal title="Confirm Delete">
    <p className="mb-6">
      Are you sure you want to delete the task <strong>{taskName}</strong>?
    </p>
    <div className="flex justify-end space-x-4">
      <Button variant="outline" innerText="Cancel" onClick={onCancel} />
      <Button variant="danger" innerText="Delete" onClick={onConfirm} />
    </div>
  </Modal>
);

export default DeleteConfirmationModal;

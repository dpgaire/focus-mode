import React from 'react'
import Modal from '../Modal';
import Button from '../Button';

const DeleteModal = ({ recordName, onConfirm, onCancel }) => (
    <Modal title="Confirm Delete">
      <p className="mb-6">
        Are you sure you want to delete the <strong>{recordName}</strong>?
      </p>
      <div className="flex justify-end space-x-4">
        <Button variant="outline" innerText="Cancel" onClick={onCancel} />
        <Button variant="danger" innerText="Delete" onClick={onConfirm} />
      </div>
    </Modal>
  );

export default DeleteModal
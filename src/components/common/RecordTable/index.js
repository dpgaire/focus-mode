import React, { useState } from "react";
import { DownloadUploadLog, Table } from "@/components/common";
import DeleteModal from "./DeleteModal";

const RecordsTable = ({
  records,
  setRecords,
  columns,
  recordType = "record",
  onEditRecord,
  onDeleteRecord,
  EditModal
}) => {
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [recordToDelete, setRecordToDelete] = useState(null);

  const handleDeleteRecord = () => {
    if (recordToDelete) {
      onDeleteRecord(recordToDelete); // Notify parent about deletion
      setRecordToDelete(null); // Close the modal
    }
  };

  return (
    <div className="record-table">
      <DownloadUploadLog
        records={records}
        setRecords={setRecords}
        logName={`${recordType}_logs_`}
      />
      <Table
        columns={columns}
        rowList={records}
        onEdit={setSelectedRecord}
        onDelete={setRecordToDelete}
      />
      {selectedRecord && EditModal && (
        <EditModal
          record={selectedRecord}
          onClose={() => setSelectedRecord(null)}
          onUpdate={(updatedRecord) => {
            onEditRecord(updatedRecord);
            setSelectedRecord(null);
          }}
        />
      )}
      {recordToDelete && DeleteModal && (
        <DeleteModal
          recordName={recordToDelete.taskName || recordToDelete.item || "Record"}
          onConfirm={handleDeleteRecord}
          onCancel={() => setRecordToDelete(null)}
        />
      )}
    </div>
  );
};

export default RecordsTable;
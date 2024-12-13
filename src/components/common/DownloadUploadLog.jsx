import React from "react";
import HeaderTitle from "./HeaderTitle";
import Button from "./Button";

const DownloadUploadLog = ({ records, setRecords, logName }) => {
  const handleDownload = () => {
    const data = JSON.stringify(records, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const currentDate = new Date().toISOString().split("T")[0];
    const link = document.createElement("a");
    link.href = url;
    link.download = `${logName}${currentDate}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleImportLogs = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "application/json";
    fileInput.onchange = async (event) => {
      const file = event.target.files[0];
      if (file) {
        try {
          const text = await file.text();
          const importedRecords = JSON.parse(text);
          if (Array.isArray(importedRecords)) {
            // Merge imported records with existing records
            const mergedRecords = [...records, ...importedRecords];
            // Remove duplicates (if records have a unique 'id')
            const uniqueRecords = Array.from(
              new Map(
                mergedRecords.map((record) => [record.id, record])
              ).values()
            );
            setRecords(uniqueRecords); // Call the update function to apply changes
          } else {
            throw new Error("Invalid file format");
          }
        } catch (error) {
          console.error("Error importing records:", error);
          alert("Failed to import records. Please check the file format.");
        }
      }
    };
    fileInput.click();
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center flex-wrap gap-2 mb-2">
      <HeaderTitle headerText="Records" />
      <div className="flex-col lg:flex-row w-full lg:w-auto flex items-center justify-end flex-grow gap-1">
        <Button
          variant="primary"
          innerText={`Import Logs`}
          onClick={handleImportLogs}
        />
        <Button
          variant="primary"
          innerText={`Download Logs (${records.length})`}
          onClick={handleDownload}
        />
      </div>
    </div>
  );
};

export default DownloadUploadLog;

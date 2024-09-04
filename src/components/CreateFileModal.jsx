// CreateFileModal.jsx
import React, { useState } from "react";
import { storage, BUCKET_ID, ID } from "../AppwriteConfig.js";
import Loader from "./Loader.jsx";
import { toast } from "react-toastify";

const MAX_FILE_SIZE = 52428800; // Maximum file size in Bytes

const CreateFileModal = ({
  isOpen,
  onClose,
  TOTAL_STORAGE,
  storageOccupied,
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [fileName, setFileName] = useState("");
  const [fileExtension, setFileExtension] = useState("");
  const [fileContent, setFileContent] = useState("");

  const handleFileCreation = async () => {
    if (!fileName || !fileExtension || !fileContent) {
      toast.error("Please fill in all fields.");
      return;
    }

    // Create a File object
    const fileBlob = new Blob([fileContent], { type: `text/${fileExtension}` });
    const file = new File([fileBlob], `${fileName}.${fileExtension}`, {
      type: `text/${fileExtension}`,
    });

    if (file.size > MAX_FILE_SIZE) {
      toast.error(`File size exceeds ${MAX_FILE_SIZE} bytes.`);
      return;
    }

    const newStorageOccupied = storageOccupied + file.size;
    if (newStorageOccupied > TOTAL_STORAGE) {
      toast.error("Not enough storage left.");
      return;
    }

    setIsUploading(true);

    try {
      await storage.createFile(BUCKET_ID, ID.unique(), file);
      toast.success("File created successfully!");
      onClose();
    } catch (error) {
      toast.error("Error creating file. Please try again.");
      console.error("Error creating file:", error);
    } finally {
      setIsUploading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-[--bg-color] p-8 rounded-lg shadow-custom w-fit text-[--text-color] border-2 border-[--text-color]">
        <h2 className="text-xl font-semibold mb-4">Create File</h2>
        {isUploading ? (
          <div className="flex justify-center items-center flex-col">
            <Loader /> <p className="ml-2">Creating file...</p>
          </div>
        ) : (
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="mb-4">
              <label className="block">File Name</label>
              <input
                type="text"
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
                className="border p-2 w-full text-black rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block font-semibold mb-1">File Extension</label>
              <input
                type="text"
                value={fileExtension}
                onChange={(e) => setFileExtension(e.target.value)}
                className="border text-black border-gray-300 p-2 w-full rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., pdf, docx, txt"
              />
              <p className="text-xs text-red-500 mt-1">
                Note: Enter extension without the dot (e.g., 'pdf', not '.pdf').
              </p>
            </div>

            <div className="mb-4">
              <label className="block">File Content</label>
              <textarea
                value={fileContent}
                onChange={(e) => setFileContent(e.target.value)}
                className="border p-2 w-full rounded text-black"
                rows="4"
              />
            </div>
            <div className="flex justify-between text-[--default-text-color]">
              <button
                type="button"
                onClick={handleFileCreation}
                className="bg-[--secondary-color] p-2 rounded"
              >
                Create File
              </button>
              <button
                type="button"
                onClick={onClose}
                className="bg-gray-600  p-2 rounded"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default CreateFileModal;

import React, { useState } from "react";
import { storage, BUCKET_ID, PROJECT_ID } from "../AppwriteConfig.js";
import Loader from "./Loader.jsx";

const MAX_FILE_SIZE_MB = 50; // Maximum file size in MB
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024; // Convert MB to bytes

const UploadFileButton = ({ onFileUpload }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (file.size > MAX_FILE_SIZE_BYTES) {
      setError(`File size exceeds ${MAX_FILE_SIZE_MB} MB.`);
      return;
    }

    setError("");
    setIsUploading(true);

    try {
      const response = await storage.createFile(BUCKET_ID, "unique()", file);
      const fileData = {
        id: response.$id,
        name: response.name,
        desc: response.name,
        filesize: `${(file.size / 1024).toFixed(2)} KB`,
        url: `https://cloud.appwrite.io/v1/storage/buckets/${BUCKET_ID}/files/${response.$id}/view?project=${PROJECT_ID}`,
      };
      onFileUpload(fileData);
    } catch (error) {
      setError("Error uploading file. Please try again.");
      console.error("Error uploading file:", error);
    } finally {
      setIsUploading(false);
    }
  };

  return isUploading ? (
    <div className="fixed h-full w-full">
      <span className="fixed top-1/2 left-1/2 text-xl text-center transform -translate-x-1/2 font-semibold text-[--text-color] backdrop-blur-md border border-[--text-color] rounded-3xl p-4 bg-[--card-bg]">
        <Loader /> <p>Uploading...</p>
      </span>
    </div>
  ) : (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 flex justify-between items-center flex-col w-full">
      <label className="cursor-pointer">
        <span className="shadow-custom text-[--text-color] bg-[--secondary-color] transition-all hover:bg-blue-700 px-4 py-2 rounded">
          Upload File
        </span>
        <input
          type="file"
          className="hidden"
          onChange={handleFileChange}
          disabled={isUploading}
        />
      </label>
      {error && <p className="text-[--error-color] mt-2">{error}</p>}
      <p className="text-[--text-color] mt-2">
        Maximum file size: {MAX_FILE_SIZE_MB} MB
      </p>
    </div>
  );
};

export default UploadFileButton;

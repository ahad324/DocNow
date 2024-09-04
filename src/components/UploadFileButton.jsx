import React, { useState } from "react";
import { storage, BUCKET_ID, ID } from "../AppwriteConfig.js";
import Loader from "./Loader.jsx";
import { calculation } from "../utils/utils.js";
import { toast } from "react-toastify";
import { FaCloudUploadAlt } from "react-icons/fa";

const MAX_FILE_SIZE = 52428800; // Maximum file size in Bytes

const UploadFileButton = ({ TOTAL_STORAGE, storageOccupied }) => {
  const [isUploading, setIsUploading] = useState(false);
  const { value, unit } = calculation(MAX_FILE_SIZE);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (file.size > MAX_FILE_SIZE) {
      toast.error(`File size exceeds ${value} ${unit}.`);
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
      toast.success("File uploaded successfully!");
    } catch (error) {
      toast.error("Error uploading file. Please try again.");
      console.error("Error uploading file:", error);
    } finally {
      setIsUploading(false);
    }
  };

  return isUploading ? (
    <div className="fixed h-full w-full">
      <span className="fixed top-1/2 left-1/2 text-xl text-center transform -translate-x-1/2 font-semibold text-[--text-color] backdrop-blur-md border-2 border-[--text-color] rounded-3xl p-4 bg-[--card-bg]">
        <Loader /> <p>Uploading...</p>
      </span>
    </div>
  ) : (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 flex justify-between items-center flex-col w-full">
      <label className="cursor-pointer">
        <span className="flex justify-evenly items-center w-44 shadow-custom text-[--default-text-color] bg-[--secondary-color] transition-colors hover:bg-[--secondary-color-hover] p-3  rounded-2xl text-lg font-semibold border-2 border-[--text-color]">
          Upload File
          <FaCloudUploadAlt size="1.5em" />
        </span>
        <input
          type="file"
          className="hidden"
          onChange={handleFileChange}
          disabled={isUploading}
        />
      </label>
      <p className="text-[--default-text-color] font-semibold mt-3 border-2 border-[--text-color] shadow-custom bg-[--error-color] p-2 rounded-xl">
        Maximum file size: {value + unit}
      </p>
    </div>
  );
};

export default UploadFileButton;

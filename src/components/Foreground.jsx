import React, { useRef, useState, useEffect } from "react";
import Card from "./Card";
import { client, storage, BUCKET_ID, PROJECT_ID } from "../AppwriteConfig.js";
import UploadFileButton from "./UploadFileButton";
import Empty from "../assets/empty.svg";
import Loader from "./Loader.jsx";
import { MdLogout } from "react-icons/md";

const Foreground = ({ isAdmin = false, handleAdminLogout }) => {
  const ref = useRef();
  const [loading, setloading] = useState(false);
  const [data, setData] = useState([]);
  const [deletingFileId, setDeletingFileId] = useState(null);

  useEffect(() => {
    setloading(true);
    const fetchFiles = async () => {
      try {
        const response = await storage.listFiles(BUCKET_ID);
        const filesData = response.files.map((file) => ({
          id: file.$id,
          desc: file.name,
          filesize: `${(file.sizeOriginal / 1024).toFixed(2)} KB`,
          url: `https://cloud.appwrite.io/v1/storage/buckets/${BUCKET_ID}/files/${file.$id}/view?project=${PROJECT_ID}`,
        }));
        setData(filesData);
      } catch (error) {
        console.error("Error fetching files:", error);
      }
    };

    fetchFiles();

    setTimeout(() => {
      setloading(false);
    }, 500);

    // Setting up for Realtime-Updates
    const unsubscribe = client.subscribe("files", (response) => {
      if (response.events.includes(`buckets.${BUCKET_ID}.files.*.create`)) {
        fetchFiles(); // Refresh file list on new upload
      } else if (
        response.events.includes(`buckets.${BUCKET_ID}.files.*.delete`)
      ) {
        fetchFiles();
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleFileUpload = (file) => {
    setData([...data, file]);
  };

  const handleFileDelete = async (fileId) => {
    setDeletingFileId(fileId);
    try {
      await storage.deleteFile(BUCKET_ID, fileId);
      setData(data.filter((item) => item.id !== fileId));
    } catch (error) {
      console.error("Error deleting file:", error);
    }
    setDeletingFileId(null);
  };

  return (
    <div
      ref={ref}
      className="fixed top-0 left-0 z-[3] w-full h-full flex justify-center items-center gap-10 flex-wrap p-5 overflow-auto"
    >
      {isAdmin && (
        <span
          className="absolute top-4 right-20 flex justify-center items-center flex-col cursor-pointer text-[--text-color] font-semibold hover:text-[--error-color] z-10"
          onClick={handleAdminLogout}
        >
          <MdLogout size="1.6em" />
          <p className="text-xs">Logout</p>
        </span>
      )}
      {loading ? (
        <Loader />
      ) : data.length > 0 ? (
        data.map((item) => (
          <Card
            data={item}
            reference={ref}
            key={item.id}
            loading={loading || deletingFileId === item.id}
            onDelete={handleFileDelete}
            isAdmin={isAdmin}
          />
        ))
      ) : (
        <div className="flex justify-center items-center flex-col">
          <h2 className="text-3xl text-[--text-color]">
            Upload file to see here.
          </h2>
          <img src={Empty} alt="Empty Canvas" width="50%" />
        </div>
      )}
      <UploadFileButton onFileUpload={handleFileUpload} />
    </div>
  );
};

export default Foreground;

import React, { useRef, useState, useEffect } from "react";
import Card from "./Card";
import InstructionsModal from "./InstructionsModal";
import { client, storage, BUCKET_ID, PROJECT_ID } from "../AppwriteConfig.js";
import UploadFileButton from "./UploadFileButton";
import Empty from "../assets/empty.svg";
import Loader from "./Loader.jsx";
import { MdLogout } from "react-icons/md";
import { calculation } from "../utils/utils.js";
import { toast } from "react-toastify";
import CreateFileButton from "./CreateFileButton";

const TOTAL_STORAGE = 2147483648; // Total Storage In Bytes
const Foreground = ({ isAdmin = false, handleAdminLogout }) => {
  const ref = useRef();
  const [loading, setloading] = useState(false);
  const [data, setData] = useState([]);
  const [deletingFileId, setDeletingFileId] = useState(null);
  const [storageOccupied, setStorageOccupied] = useState(0);
  const [isInstructionsOpen, setIsInstructionsOpen] = useState(false);

  useEffect(() => {
    setloading(true);
    const fetchFiles = async () => {
      try {
        const response = await storage.listFiles(BUCKET_ID);
        const filesData = response.files.map((file) => {
          const { value, unit } = calculation(file.sizeOriginal); // Deconstruct value and unit
          return {
            id: file.$id,
            desc: file.name,
            filesize: `${value} ${unit}`, // Format the size with value and unit
            downloadUrl: `https://cloud.appwrite.io/v1/storage/buckets/${BUCKET_ID}/files/${file.$id}/download?project=${PROJECT_ID}`,
            viewUrl: `https://cloud.appwrite.io/v1/storage/buckets/${BUCKET_ID}/files/${file.$id}/view?project=${PROJECT_ID}`,
          };
        });
        setData(filesData);

        // Calculate storage usage
        const totalSize = response.files.reduce(
          (acc, file) => acc + file.sizeOriginal,
          0
        );
        setStorageOccupied(totalSize); // Convert bytes to MB
      } catch (error) {
        console.error("Error fetching files:", error);
      }
    };

    fetchFiles();

    // setTimeout(() => {
    setloading(false);
    // }, 500);

    // Setting up for Realtime-Updates
    const unsubscribe = client.subscribe("files", (response) => {
      if (
        response.events.includes(`buckets.${BUCKET_ID}.files.*.create`) ||
        response.events.includes(`buckets.${BUCKET_ID}.files.*.delete`)
      ) {
        fetchFiles(); // Refresh file list on new upload
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);
  const handleFileDelete = async (fileId) => {
    setDeletingFileId(fileId);
    try {
      await storage.deleteFile(BUCKET_ID, fileId);
      setData(data.filter((item) => item.id !== fileId));
      toast.success("Files deleted successfully!");
    } catch (error) {
      toast.success("Failed to delete file.Please try again.");
      console.error("Error deleting file:", error);
    }
    setDeletingFileId(null);
  };

  return (
    <div
      ref={ref}
      className="absolute top-0 left-0 z-[2] w-full h-full flex justify-center items-center gap-10 flex-wrap p-5 overflow-auto py-20"
    >
      <button
        onClick={() => setIsInstructionsOpen(true)}
        className="absolute top-4 left-4 bg-[--secondary-color] border-2 text-sm border-[--text-color] rounded-lg text-[--default-text-color] font-bold py-2 px-2 hover:bg-[--secondary-color-hover] transition"
      >
        Instructions
      </button>
      <InstructionsModal
        isOpen={isInstructionsOpen}
        onClose={() => setIsInstructionsOpen(false)}
      />
      {isAdmin && (
        <section className="fixed top-0 flex justify-between w-full flex-row-reverse pl-4 pr-14 xs:px-16 py-2 bg-[--secondary-color] z-[3] shadow-custom rounded-b-3xl border-b-4 border-[--text-color]">
          <span
            className="right-20 flex justify-center items-center flex-col cursor-pointer text-[--default-text-color] font-semibold hover:text-[--error-color] z-10"
            onClick={handleAdminLogout}
          >
            <MdLogout size="1.6em" />
            <p className="text-xs">Logout</p>
          </span>
          {(() => {
            const storageOccupiedCalculation = calculation(storageOccupied);
            const totalStorageCalculation = calculation(TOTAL_STORAGE);

            return (
              <div className=" bg-black text-[--default-text-color] p-1 xs:p-3 rounded-lg border shadow-custom flex justify-center items-center text-sm xs:text-lg">
                <span className="flex font-semibold">
                  <h2 className="mr-1 xs:mr-2">Storage: </h2>
                  <p>
                    {`${storageOccupiedCalculation.value} ${storageOccupiedCalculation.unit}/`}
                    {`${totalStorageCalculation.value} ${totalStorageCalculation.unit}`}
                  </p>
                </span>
              </div>
            );
          })()}
        </section>
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
      <UploadFileButton
        TOTAL_STORAGE={TOTAL_STORAGE}
        storageOccupied={storageOccupied}
      />
      <CreateFileButton
        TOTAL_STORAGE={TOTAL_STORAGE}
        storageOccupied={storageOccupied}
      />
    </div>
  );
};

export default Foreground;

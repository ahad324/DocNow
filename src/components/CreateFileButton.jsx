// CreateFileButton.jsx
import React, { useState } from "react";
import { MdCreateNewFolder } from "react-icons/md";
import CreateFileModal from "./CreateFileModal";

const CreateFileButton = ({ TOTAL_STORAGE, storageOccupied }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <>
      <button
        onClick={handleOpenModal}
        className="fixed bottom-5 left-4 flex justify-evenly items-center shadow-custom text-[--default-text-color] bg-[--accent-color] border-2 transition-colors hover:bg-[--secondary-color-hover] p-1 rounded-lg text-lg border border-[--text-color] hover:bg-green-700"
      >
        <MdCreateNewFolder size="1.2em" className="mr-1" />
        Create File
      </button>
      <CreateFileModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        TOTAL_STORAGE={TOTAL_STORAGE}
        storageOccupied={storageOccupied}
      />
    </>
  );
};

export default CreateFileButton;

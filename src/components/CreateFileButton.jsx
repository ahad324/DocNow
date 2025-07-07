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
        className="fixed bottom-5 left-4 flex items-center w-10 overflow-hidden whitespace-nowrap transition-all duration-300 ease-in-out bg-[--accent-color] text-[--default-text-color] border-2 border-[--text-color] p-2 rounded-lg shadow-custom hover:w-40 hover:bg-[--secondary-color-hover]"
      >
        <MdCreateNewFolder size="1.2em" className="min-w-[1.2em]" />
        <span className="ml-2 font-medium">Create File</span>
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

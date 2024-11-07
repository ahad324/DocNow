import React from "react";
import { MdClose } from "react-icons/md";

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-10">
      <div className="bg-[--bg-color] p-8 rounded-lg shadow-custom w-full max-w-lg mx-4 text-[--text-color] border-2 border-[--text-color] relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-[--text-color] bg-transparent hover:bg-gray-200 hover:text-black rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center"
        >
          <MdClose size="1.5em" />
        </button>
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
        <div className="max-h-[70vh] overflow-y-auto">{children}</div>
      </div>
    </div>
  );
};

export default Modal;

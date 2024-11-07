import React from "react";
import { motion } from "framer-motion";
import Modal from "./Modal";

const InstructionsModal = ({ isOpen, onClose }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Instructions">
      <motion.div
        className="text-[--text-color] space-y-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.p className="text-center text-lg" variants={itemVariants}>
          This platform allows you to easily share files with others. Whether
          you're in a classroom or a collaborative environment, sharing files
          has never been easier!
        </motion.p>
        <motion.h2
          className="text-xl font-semibold mt-4 text-center text-[--accent-color]"
          variants={itemVariants}
        >
          How to Share Files Publicly
        </motion.h2>
        <ol className="list-decimal list-inside mb-4 space-y-2">
          <motion.li className="mb-2" variants={itemVariants}>
            <strong>Upload from Your System:</strong> Click on the "Upload File"
            button. Select the file you wish to share. Once uploaded, it will be
            accessible to everyone.
          </motion.li>
          <motion.li variants={itemVariants}>
            <strong>Create a File:</strong> Use the "Create File" button located
            at the bottom left of the screen. Fill in the file details and
            content, then click "Create". Your file will be automatically
            uploaded and shared.
          </motion.li>
        </ol>
        <motion.h2
          className="text-xl font-semibold mt-4 text-center text-[--accent-color]"
          variants={itemVariants}
        >
          Perfect for Classroom Environments
        </motion.h2>
        <motion.p className="text-center" variants={itemVariants}>
          Imagine a scenario where one student has the solution to a lab
          assessment. They can upload their file here, allowing everyone to
          access it instantly. This feature is designed to foster collaboration
          and ease of access.
        </motion.p>
        <motion.h2
          className="text-xl font-semibold mt-4 text-center text-[--accent-color]"
          variants={itemVariants}
        >
          😊 Enjoy a Seamless Experience 😊
        </motion.h2>
      </motion.div>
    </Modal>
  );
};

export default InstructionsModal;

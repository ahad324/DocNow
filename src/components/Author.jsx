import React from "react";

const Author = () => {
  return (
    <div className="fixed shadow-custom bottom-3 right-3 bg-gray-800 text-white text-xs p-2 rounded-lg z-10">
      Made by{" "}
      <a
        href="https://ahad324.github.io/AllProjects/"
        target="_blank"
        rel="noopener noreferrer"
        className="underline cursor-pointer hover:text-gray-400 "
      >
        AbdulAhad
      </a>
    </div>
  );
};

export default Author;

import React from "react";
import Error404 from "../../assets/Error404.svg";

const Error = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-[3] bg-[--bg-color] p-4 ">
      <div className="flex justify-center items-center">
        <img
          src={Error404}
          alt="Error 404"
          className="w-full h-screen drop-shadow-xl"
        />
      </div>
    </div>
  );
};

export default Error;

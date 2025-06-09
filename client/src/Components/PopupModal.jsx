import React from "react";

const PopupModal = ({ description, btnName, closeModal, handleClick }) => {
  return (
    <div className="modal overflow-hidden z-50">
      <div className="modalOverlay"></div>
      <div className="w-[350px] sm:w-[400px] h-[200px] bg-white shadow-lg rounded-md p-8 z-50 flex flex-col justify-center items-center absolute top-[37%] left-[7.5%] sm:top-60 sm:left-[600px]">
        <h2 className="font-bold text-center">{description}</h2>
        <div className="flex items-center gap-5 mt-8">
          <button
            className={`text-[12px] font-bold cursor-pointer uppercase border ${
              btnName == "Finish"
                ? "border-green-500 hover:bg-green-300/50 text-green-500"
                : "border-red-500 hover:bg-red-300/50 text-red-500"
            } px-6 py-2 rounded-md`}
            onClick={handleClick}
            type="submit"
          >
            {btnName}{" "}
          </button>
          <button
            className="text-[12px] font-bold cursor-pointer uppercase border border-gray-500 hover:bg-gray-300/50 text-gray-500 px-6 py-2 rounded-md"
            onClick={closeModal}
          >
            cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopupModal;

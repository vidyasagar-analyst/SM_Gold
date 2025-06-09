import { GoAlertFill } from "react-icons/go";

const AlertModal = ({ closeModal }) => {
  return (
    <div className="modal overflow-hidden z-50">
      <div className="modalOverlay"></div>
      <div className="w-[350px] sm:w-[550px] bg-white shadow-lg rounded-md p-8 z-50 flex flex-col justify-center items-center absolute sm:top-50 top-[30%] left-[7.5%] sm:left-[500px]">
        <GoAlertFill size={120} className="text-red-500 animate-pulse" />
        <h2 className="font-bold text-center">
          You are Spending Money more than your Profit!
        </h2>
        <div className="flex items-center gap-5 mt-8">
          <button
            className="text-[12px] font-bold cursor-pointer uppercase border border-gray-500 hover:bg-gray-300/50 text-gray-500 px-6 py-2 rounded-md"
            onClick={closeModal}
          >
            close
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlertModal;

import React, { useContext } from "react";
import { AppContext } from "../Utils/AppContext";

const Footer = () => {
  const year = new Date().getFullYear();
  const { isAuth } = useContext(AppContext);
  return (
    <>
      {isAuth && (
        <div className="w-full py-2 flex items-center justify-center">
          <p className="tracking-wider !text-[7px] sm:!text-[12px]">
            &copy; {year} SRI MAHALAKSHMI FINANCE | Designed and Developed by
            PRABANJAN |{" "}
            <a href="https://syntxinfotech.com/" target="_blank">
              SYNTX Info Tech
            </a>
          </p>
        </div>
      )}
    </>
  );
};

export default Footer;

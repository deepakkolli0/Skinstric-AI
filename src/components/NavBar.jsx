import React from "react";
import { useRouter } from "next/navigation";

const NavBar = () => {
  const router = useRouter();

  const handleLogoClick = () => {
    router.push("/");
  };
  return (
    <nav className="bg-white relative z-30">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div
              className="flex items-center cursor-pointer hover:opacity-80 transition-opacity"
              onClick={handleLogoClick}
            >
              <h1 className="text-[11px] text-black font-bold">
                {" "}
                <span className="text-[10px]">S</span>KIN
                <span className="text-[10px]">S</span>TRIC
              </h1>
              <span className="text-[11px] text-gray-500 ml-4">[ INTRO ]</span>
            </div>
          </div>

          <div className="flex items-center">
            <button className="text-[10px] font-medium text-white px-3 py-2 bg-black hover:border-gray-400 transition-colors">
              ENTER CODE
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

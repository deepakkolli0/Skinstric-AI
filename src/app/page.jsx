import React from "react";

const Page = () => {
  return (
    <div className="h-screen bg-white relative">
      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1/2 rotate-45 z-20 -mt-5">
        <svg
          width="460"
          height="460"
          viewBox="0 0 602 602"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="1"
            y="1"
            width="600"
            height="600"
            stroke="#D1D5DB"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="2 2"
          />
        </svg>
        <div className="absolute top-1/2 right-1/2 transform -translate-y-40 translate-x-50 -rotate-45 z-30">
          <svg
            width="150"
            height="44"
            viewBox="0 0 150 44"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="15"
              y="11"
              width="26"
              height="26"
              fill="none"
              stroke="#1A1B1C"
              transform="rotate(45 24.9 20.9)"
            />

            <polygon points="27.5,20.5 27.5,29.5 19.5,25" fill="#1A1B1C" />

            <text
              x="55"
              y="30"
              fontFamily="Roboto, sans-serif"
              fontSize="14"
              fontWeight="bold"
              fill="#000"
              opacity="0.7"
            >
              DISCOVER AI.
            </text>
          </svg>
        </div>
      </div>

      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2 rotate-45 z-20 -mt-5">
        <svg
          width="460"
          height="460"
          viewBox="0 0 602 602"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="1"
            y="1"
            width="600"
            height="600"
            stroke="#D1D5DB"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="2 2"
          />
        </svg>
        <div className="absolute top-1/2 left-1/2 transform -translate-y-[-100px] -translate-x-50 -rotate-45 z-30">
          <svg
            width="127"
            height="44"
            viewBox="0 0 127 44"
            xmlns="http://www.w3.org/2000/svg"
          >
            <text
              x="2"
              y="30"
              fontFamily="Roboto, sans-serif"
              fontSize="14"
              fontWeight="bold"
              fill="#000"
              opacity="0.7"
            >
              TAKE TEST
            </text>

            <rect
              x="95"
              y="11"
              width="26"
              height="26"
              fill="none"
              stroke="#1A1B1C"
              transform="rotate(45 104.9 20.9)"
            />

            <polygon points="102.5,19.8 102.5,27.8 110.5,23.8" fill="#1A1B1C" />
          </svg>
        </div>
      </div>

      <nav className="bg-white relative z-30">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-[11px] text-black font-bold">
                {" "}
                <span className="text-[10px]">S</span>KIN
                <span className="text-[10px]">S</span>TRIC
              </h1>
              <span className="text-[11px] text-gray-500 ml-4">[ INTRO ]</span>
            </div>

            <div className="flex items-center">
              <button className="text-[10px] font-medium text-white px-3 py-2 bg-black hover:border-gray-400 transition-colors">
                ENTER CODE
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main
        className="flex items-center justify-center h-screen w-full relative z-10"
        style={{ marginTop: "-90px" }}
      >
        <div className="w-[680px] h-[240px] flex items-center justify-center">
          <h2 className="text-[100px] font-extralight text-black font-roboto text-center leading-none tracking-tight">
            Sophisticated skincare
          </h2>
        </div>
      </main>
    </div>
  );
};

export default Page;

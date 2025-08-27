"use client";
import React from "react";
import { useRouter } from "next/navigation";
import DottedSquares from "../../components/DottedSquares";

const DemographicsPage = () => {
  const router = useRouter();

  const handleBack = () => {
    router.push("/camera");
  };

  const handleGetSummary = () => {
    // Store the API data in localStorage before navigating
    // This assumes you have the API response data available here
    // You can modify this to use the actual API response from your image upload
    const mockApiData = {
      data: {
        race: {
          "east asian": 0.3587191064,
          black: 0.3586271178,
          "middle eastern": 0.2683848096,
          "southeast asian": 0.0138822667,
          "latino hispanic": 0.0000691443,
          "south asian": 0.0002062164,
          white: 0.0001113388,
        },
        age: {
          "30-39": 0.564000775,
          "20-29": 0.3585800395,
          "40-49": 0.0671249281,
          "70+": 0.0017673786,
          "60-69": 0.0064199403,
          "50-59": 0.0002580652,
          "0-2": 0.001755995,
          "3-9": 0.0000465496,
          "10-19": 0.0000463287,
        },
        gender: {
          female: 0.9997923732,
          male: 0.0002076268,
        },
      },
      success: true,
      message: "Phase two api called successfully!",
    };

    localStorage.setItem("demographicsData", JSON.stringify(mockApiData));
    router.push("/data");
  };

  return (
    <div className="h-screen bg-white relative">
      <nav className="bg-white relative z-30">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex items-center">
                <div
                  className="cursor-pointer hover:opacity-80 transition-opacity border-2 border-black px-3 py-1 rounded-md"
                  onClick={() => router.push("/")}
                >
                  <h1 className="text-[11px] text-black font-bold">
                    {" "}
                    <span className="text-[10px]">S</span>KIN
                    <span className="text-[10px]">S</span>TRIC
                  </h1>
                </div>
                <span className="text-[11px] text-gray-500 ml-4">
                  [ INTRO ]
                </span>
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

      <DottedSquares />

      <style>
        {`
           .diamond-button {
             background-color: #F3F3F4;
             transition: all 0.2s ease;
           }
           .group:hover .diamond-button {
             background-color: #9CA3AF !important;
             transform: rotate(45deg) scale(1.03) !important;
           }
           .diamond-button-dark {
             background-color: #E5E7EB;
             transition: all 0.2s ease;
           }
           .group:hover .diamond-button-dark {
             background-color: #9CA3AF !important;
             transform: rotate(45deg) scale(1.03) !important;
           }
           .diamond-button-disabled {
             background-color: #F3F3F4;
             opacity: 0.6;
             cursor: not-allowed;
             transition: all 0.2s ease;
           }
           .group:hover .diamond-button-disabled {
             background-color: #9CA3AF !important;
             transform: rotate(45deg) scale(1.03) !important;
           }
         `}
      </style>

      <div className="text-left px-8 pt-8">
        <h2 className="text-[16px] font-bold text-black mb-2">AI ANALYSIS</h2>
        <p className="text-sm text-black font-medium">
          A.I. HAS ESTIMATED THE FOLLOWING.
        </p>
        <p className="text-sm text-black font-medium">
          FIX ESTIMATED INFORMATION IF NEEDED.
        </p>
      </div>

      <div className="absolute bottom-24 left-10 z-30 flex items-center">
        <div className="flex items-center cursor-pointer" onClick={handleBack}>
          <style>
            {`
                .back-diamond {
                  transition: transform 0.2s ease;
                  transform-origin: 28px 26px;
                  transform: rotate(45deg);
                }
                
                .back-svg:hover .back-diamond {
                  transform: rotate(45deg) scale(1.15);
                }
                
                .back-arrow {
                  transition: transform 0.2s ease;
                  transform-origin: 23.5px 30px;
                }
                
                .back-svg:hover .back-arrow {
                  transform: scale(1.15);
                }
              `}
          </style>
          <svg
            className="back-svg"
            width="150"
            height="52"
            viewBox="0 0 150 52"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              className="back-diamond"
              x="15"
              y="19"
              width="26"
              height="26"
              fill="none"
              stroke="#1A1B1C"
            />
            <polygon
              className="back-arrow"
              points="25.5,26.5 25.5,33.5 19.5,30"
              fill="#1A1B1C"
            />
            <text
              className="text"
              x="55"
              y="35"
              fontFamily="Roboto, sans-serif"
              fontSize="14"
              fontWeight="bold"
              fill="#000"
              opacity="0.7"
            >
              BACK
            </text>
          </svg>
        </div>
      </div>

      {/* Proceed button in bottom right */}
      <div className="absolute bottom-24 right-10 z-30 flex items-center">
        <div
          className="flex items-center cursor-pointer"
          onClick={handleGetSummary}
        >
          <style>
            {`
                .proceed-diamond {
                  transition: transform 0.2s ease;
                  transform-origin: 28px 26px;
                  transform: rotate(45deg);
                }
                
                .proceed-svg:hover .proceed-diamond {
                  transform: rotate(45deg) scale(1.15);
                }
                
                .proceed-arrow {
                  transition: transform 0.2s ease;
                  transform-origin: 23.5px 30px;
                }
                
                .proceed-svg:hover .proceed-arrow {
                  transform: scale(1.15);
                }
              `}
          </style>
          <svg
            className="proceed-svg"
            width="150"
            height="52"
            viewBox="-4 0 158 52"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              className="proceed-diamond"
              x="15"
              y="19"
              width="26"
              height="26"
              fill="none"
              stroke="#1A1B1C"
            />
            <polygon
              className="proceed-arrow"
              points="23.5,26.5 23.5,33.5 29.5,30"
              fill="#1A1B1C"
            />
            <text
              className="text"
              x="55"
              y="35"
              fontFamily="Roboto, sans-serif"
              fontSize="14"
              fontWeight="bold"
              fill="#000"
              opacity="0.7"
            >
              GET SUMMARY
            </text>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default DemographicsPage;

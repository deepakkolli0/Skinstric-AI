"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const DottedSquares = () => {
  const router = useRouter();
  const [hoveredDiamond, setHoveredDiamond] = useState(null);
  const [animatingSquares, setAnimatingSquares] = useState({});

  const handleDiamondHover = (diamondType) => {
    console.log("Hovering:", diamondType);

    setAnimatingSquares({});

    setHoveredDiamond(diamondType);

    if (diamondType === "weather") {
      setAnimatingSquares((prev) => ({ ...prev, largest: "enter" }));
    } else if (diamondType === "cosmetic" || diamondType === "skin") {
      setAnimatingSquares((prev) => ({ ...prev, medium: "enter" }));
    } else if (diamondType === "demographics") {
      setAnimatingSquares((prev) => ({ ...prev, smallest: "enter" }));
    }
  };

  const handleDiamondLeave = () => {
    console.log("Leaving diamond");
    setHoveredDiamond(null);
    setAnimatingSquares({});
  };

  const handleDemographicsClick = () => {
    // Get the actual API data from localStorage that was stored by the camera page
    const storedData = localStorage.getItem("skinstricUserData");

    if (storedData) {
      try {
        const userData = JSON.parse(storedData);
        if (userData.imageAnalysis) {
          // Store the image analysis data with the key that the data page expects
          localStorage.setItem(
            "demographicsData",
            JSON.stringify(userData.imageAnalysis)
          );
          router.push("/data");
        } else {
          alert("No image analysis data found. Please upload an image first.");
        }
      } catch (error) {
        console.error("Error parsing stored data:", error);
        alert(
          "Error loading image analysis data. Please try uploading an image again."
        );
      }
    } else {
      alert("No data found. Please upload an image first.");
    }
  };

  console.log("Current hoveredDiamond:", hoveredDiamond);
  console.log("Animating squares:", animatingSquares);

  return (
    <div className="absolute inset-0 z-20">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 squares-container">
        <div
          className={`absolute sparse-dots largest-square ${
            animatingSquares.largest === "enter" ? "fade-up-enter" : ""
          }`}
          style={{
            transform: "rotate(45deg)",
            width: "600px",
            height: "600px",
            top: "50%",
            left: "50%",
            marginTop: "-300px",
            marginLeft: "-300px",
            opacity: hoveredDiamond === "weather" ? 1 : 0,
            transition: "opacity 0.2s ease",
          }}
        ></div>
        <div
          className={`absolute sparse-dots medium-square ${
            animatingSquares.medium === "enter" ? "fade-up-enter" : ""
          }`}
          style={{
            transform: "rotate(45deg)",
            width: "500px",
            height: "500px",
            top: "50%",
            left: "50%",
            marginTop: "-250px",
            marginLeft: "-250px",
            opacity:
              hoveredDiamond === "cosmetic" || hoveredDiamond === "skin"
                ? 1
                : 0,
            transition: "opacity 0.2s ease",
          }}
        ></div>
        <div
          className={`absolute sparse-dots smallest-square ${
            animatingSquares.smallest === "enter" ? "fade-up-enter" : ""
          }`}
          style={{
            transform: "rotate(45deg)",
            width: "400px",
            height: "400px",
            top: "50%",
            left: "50%",
            marginTop: "-200px",
            marginLeft: "-200px",
            opacity: hoveredDiamond === "demographics" ? 1 : 0,
            transition: "opacity 0.2s ease",
          }}
        ></div>
      </div>

      <style>
        {`
           .sparse-dots {
             border: 2px dotted #D1D5DB;
             border-spacing: 40px;
             border-style: dotted;
             border-width: 2px;
             border-color: #D1D5DB;
           }
           
                       .fade-up-enter {
              animation: fadeUpEnter 0.3s ease-in;
            }
            
            @keyframes fadeUpEnter {
              from {
                opacity: 0;
                transform: rotate(45deg) scale(0.8);
              }
              to {
                opacity: 1;
                transform: rotate(45deg) scale(1);
              }
            }
         `}
      </style>

      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -translate-x-[188px]">
        <div
          className="relative z-30 group cosmetic-group"
          onMouseEnter={() => handleDiamondHover("cosmetic")}
          onMouseLeave={handleDiamondLeave}
        >
          <button
            className="w-[150px] h-[150px] diamond-button-disabled"
            style={{ transform: "rotate(45deg)" }}
            disabled
          ></button>
          <div className="absolute inset-0 flex items-center justify-center text-center px-4 pointer-events-none">
            <span className="text-black font-bold text-base leading-tight">
              COSMETIC
              <br />
              CONCERNS
            </span>
          </div>
        </div>
      </div>

      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 translate-x-[29px]">
        <div
          className="relative z-30 group skin-group"
          onMouseEnter={() => handleDiamondHover("skin")}
          onMouseLeave={handleDiamondLeave}
        >
          <button
            className="w-[150px] h-[150px] diamond-button-disabled"
            style={{ transform: "rotate(45deg)" }}
            disabled
          ></button>
          <div className="absolute inset-0 flex items-center justify-center text-center px-4 pointer-events-none">
            <span className="text-black font-bold text-base leading-tight">
              <span className="text-[15px]">S</span>KIN TYPE DETAIL
              <span className="text-[15px]">S</span>
            </span>
          </div>
        </div>
      </div>

      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -translate-y-[190px] -translate-x-[80px]">
        <div
          className="relative cursor-pointer z-30 group demographics-group"
          onMouseEnter={() => handleDiamondHover("demographics")}
          onMouseLeave={handleDiamondLeave}
          onClick={handleDemographicsClick}
        >
          <button
            className="w-[150px] h-[150px] diamond-button-dark"
            style={{ transform: "rotate(45deg)" }}
          ></button>
          <div className="absolute inset-0 flex items-center justify-center text-center px-4 pointer-events-none">
            <span className="text-black font-bold text-base leading-tight">
              DEMOGRAPHICS
            </span>
          </div>
        </div>
      </div>

      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 translate-y-[34px] -translate-x-[79px]">
        <div
          className="relative z-30 group weather-group"
          onMouseEnter={() => handleDiamondHover("weather")}
          onMouseLeave={handleDiamondLeave}
        >
          <button
            className="w-[150px] h-[150px] diamond-button-disabled"
            style={{ transform: "rotate(45deg)" }}
            disabled
          ></button>
          <div className="absolute inset-0 flex items-center justify-center text-center px-4 pointer-events-none">
            <span className="text-black font-bold text-base leading-tight">
              WEATHER
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DottedSquares;

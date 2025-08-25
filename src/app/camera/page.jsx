"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import NavBar from "../../components/NavBar";
import StartAnalysisText from "../../components/StartAnalysisText";
import CameraRotatingBorder from "../../components/CameraRotatingBorder";
import CameraStaticContent from "../../components/CameraStaticContent";
import GalleryRotatingBorder from "../../components/GalleryRotatingBorder";
import GalleryStaticContent from "../../components/GalleryStaticContent";

const CameraPage = () => {
  const router = useRouter();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const storedData = localStorage.getItem("skinstricUserData");
    if (storedData) {
      setUserData(JSON.parse(storedData));
    }
  }, []);

  const handleBack = () => {
    router.push("/");
  };

  return (
    <div className="h-screen bg-white relative">
      <NavBar />

      <div
        style={{
          position: "absolute",
          top: "80px",
          left: "21px",
          zIndex: 50,
          backgroundColor: "white",
          padding: "10px",
        }}
      >
        <p
          style={{
            fontSize: "14px",
            color: "black",
            fontWeight: "bold",
            textTransform: "uppercase",
            letterSpacing: "tight",
            margin: 0,
          }}
        >
          TO START ANALYSIS
        </p>
      </div>

      <style>
        {`
          @keyframes rotate-slow {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }
          
          @keyframes rotate-medium {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }
          
          @keyframes rotate-fast {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }
          
          .svg-container {
            position: relative;
            width: 507px;
            height: 507px;
          }
          
          .rotating-border-slow {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            animation: rotate-slow 45s linear infinite;
          }
          
          .rotating-border-medium {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            animation: rotate-medium 35s linear infinite;
          }
          
          .rotating-border-fast {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            animation: rotate-fast 25s linear infinite;
          }
          
          .static-content {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 2;
          }
        `}
      </style>

      <main
        className="flex items-center justify-center h-screen w-full relative z-10"
        style={{ marginTop: "-110px" }}
      >
        <div
          className="flex items-center justify-center"
          style={{ gap: "400px" }}
        >
          <div
            className="flex flex-col items-center cursor-pointer"
            style={{ marginLeft: "-100px" }}
          >
            <div className="svg-container">
              <CameraRotatingBorder />
              <CameraStaticContent className="static-content" />
            </div>
          </div>

          <div className="flex flex-col items-center cursor-pointer">
            <div className="svg-container">
              <GalleryRotatingBorder />
              <GalleryStaticContent className="static-content" />
            </div>
          </div>
        </div>
      </main>

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
    </div>
  );
};

export default CameraPage;

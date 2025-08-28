"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import NavBar from "../../components/NavBar";
import CameraRotatingBorder from "../../components/CameraRotatingBorder";
import CameraStaticContent from "../../components/CameraStaticContent";
import GalleryRotatingBorder from "../../components/GalleryRotatingBorder";
import GalleryStaticContent from "../../components/GalleryStaticContent";

const CameraPage = () => {
  const router = useRouter();
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showCameraPopup, setShowCameraPopup] = useState(false);
  const [galleryGrayed, setGalleryGrayed] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const storedData = localStorage.getItem("skinstricUserData");
    if (storedData) {
      setUserData(JSON.parse(storedData));
    }
  }, []);

  const handleBack = () => {
    router.push("/");
  };

  const handleScanClick = () => {
    setShowCameraPopup(true);
    setGalleryGrayed(true);
  };

  const handleAllowCamera = () => {
    setShowCameraPopup(false);
    setGalleryGrayed(false);
    // Navigate to scan page
    router.push("/scan");
  };

  const handleDenyCamera = () => {
    setShowCameraPopup(false);
    setGalleryGrayed(false);
  };

  const convertImageToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result.split(",")[1]; // Remove data:image/...;base64, prefix
        resolve(base64String);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleFileSelect = async (file) => {
    setIsLoading(true);

    // Set the selected image for preview
    const imageUrl = URL.createObjectURL(file);
    setSelectedImage(imageUrl);

    try {
      // Convert image to base64
      const base64Image = await convertImageToBase64(file);

      // Call the API
      const response = await axios.post(
        "https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseTwo",
        {
          image: base64Image,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("API Response:", response.data);

      // Store the analysis results
      const analysisData = {
        ...userData,
        imageAnalysis: response.data,
        uploadedImage: base64Image,
        timestamp: new Date().toISOString(),
      };

      localStorage.setItem("skinstricUserData", JSON.stringify(analysisData));

      setIsLoading(false);

      // Show success alert
      alert("Image analyzed successfully!");

      // Navigate to demographics page
      router.push("/demographics");
    } catch (error) {
      console.error("Error analyzing image:", error);
      setIsLoading(false);
      alert("Error analyzing image. Please try again.");
    }
  };

  return (
    <div className="h-screen bg-white relative">
      <NavBar />

      {/* Camera Access Popup */}
      {showCameraPopup && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: "black",
              padding: "40px",
              maxWidth: "400px",
              width: "90%",
              position: "relative",
              marginLeft: "-30px",
            }}
          >
            <p
              style={{
                color: "white",
                fontSize: "18px",
                fontWeight: "bold",
                textAlign: "left",
                marginBottom: "60px",
                marginTop: "-20px",
                marginLeft: "-20px",
                lineHeight: "1.4",
              }}
            >
              ALLOW AI TO ACCESS YOUR CAMERA
            </p>

            <div
              style={{
                position: "absolute",
                bottom: "5px",
                right: "20px",
                display: "flex",
                gap: "20px",
              }}
            >
              <button
                onClick={handleDenyCamera}
                style={{
                  background: "none",
                  border: "none",
                  color: "gray",
                  fontSize: "14px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={(e) => (e.target.style.color = "#666")}
                onMouseLeave={(e) => (e.target.style.color = "gray")}
              >
                DENY
              </button>
              <button
                onClick={handleAllowCamera}
                style={{
                  background: "none",
                  border: "none",
                  color: "white",
                  fontSize: "14px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={(e) => (e.target.style.color = "#ccc")}
                onMouseLeave={(e) => (e.target.style.color = "white")}
              >
                ALLOW
              </button>
            </div>

            {/* White line over the buttons */}
            <div
              style={{
                position: "absolute",
                bottom: "35px",
                left: 0,
                right: 0,
                height: "1px",
                backgroundColor: "white",
              }}
            />
          </div>
        </div>
      )}

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
            fontSize: windowWidth <= 850 ? "12px" : "14px",
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

      {/* Preview Section */}
      <div
        style={{
          position: "absolute",
          top: "80px",
          right: "21px",
          zIndex: 50,
          backgroundColor: "white",
          padding: "10px",
        }}
      >
        <p
          style={{
            fontSize: windowWidth <= 850 ? "12px" : "14px",
            color: "black",
            fontWeight: "bold",
            textTransform: "uppercase",
            letterSpacing: "tight",
            margin: 0,
            marginBottom: "10px",
          }}
        >
          PREVIEW
        </p>
        <div
          style={{
            width: "100px",
            height: "100px",
            border: "2px solid #d3d3d3",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          {selectedImage && (
            <img
              src={selectedImage}
              alt="Preview"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          )}
        </div>
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

          @keyframes bounce {
            0% {
              transform: translateY(0);
            }
            20% {
              transform: translateY(-3px);
            }
            80% {
              transform: translateY(-3px);
            }
            100% {
              transform: translateY(0);
            }
          }
        `}
      </style>

      <main
        className="flex items-center justify-center h-screen w-full relative z-10"
        style={{ marginTop: "-110px" }}
      >
        {isLoading ? (
          <div className="flex flex-col items-center">
            <p className="text-[24px] text-black font-light mb-12">
              Analyzing image...
            </p>
            <div className="flex space-x-6">
              <div
                className="w-2 h-2 bg-gray-400 rounded-full"
                style={{
                  animation: "bounce 2.5s infinite",
                  animationDelay: "0s",
                }}
              ></div>
              <div
                className="w-2 h-2 bg-gray-400 rounded-full"
                style={{
                  animation: "bounce 2.5s infinite",
                  animationDelay: "0.8s",
                }}
              ></div>
              <div
                className="w-2 h-2 bg-gray-400 rounded-full"
                style={{
                  animation: "bounce 2.5s infinite",
                  animationDelay: "1.6s",
                }}
              ></div>
            </div>
          </div>
        ) : (
          <div
            className={`flex items-center justify-center ${
              windowWidth <= 850 ? "flex-col" : "flex-row"
            }`}
            style={{
              gap:
                windowWidth <= 850
                  ? "40px"
                  : windowWidth <= 950
                  ? "20px"
                  : windowWidth <= 1050
                  ? "50px"
                  : windowWidth <= 1150
                  ? "100px"
                  : windowWidth <= 1280
                  ? "200px"
                  : "400px",
              paddingLeft: windowWidth <= 1280 ? "10px" : "0px",
              paddingRight: windowWidth <= 1280 ? "10px" : "0px",
            }}
          >
            <div
              className="flex flex-col items-center cursor-pointer"
              style={{ marginLeft: windowWidth <= 1280 ? "0px" : "-100px" }}
            >
              <div className="svg-container">
                <CameraRotatingBorder />
                <CameraStaticContent
                  className="static-content"
                  onClick={handleScanClick}
                />
              </div>
            </div>

            <div className="flex flex-col items-center cursor-pointer">
              <div className="svg-container">
                <GalleryRotatingBorder />
                <GalleryStaticContent
                  className="static-content"
                  onFileSelect={handleFileSelect}
                  grayed={galleryGrayed}
                />
              </div>
            </div>
          </div>
        )}
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

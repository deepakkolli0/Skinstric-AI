"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import NavBar from "../../components/NavBar";

const ScanPage = () => {
  const router = useRouter();
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const canvasRef = useRef(null);

  const [isLoading, setIsLoading] = useState(true);
  const [iconSize, setIconSize] = useState(1);
  const [isGrayed, setIsGrayed] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const storedData = localStorage.getItem("skinstricUserData");
    if (storedData) {
      setUserData(JSON.parse(storedData));
    }
  }, []);

  const convertImageToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result.split(",")[1];
        resolve(base64String);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const processImage = async (imageBlob) => {
    setIsProcessing(true);

    try {
      const base64Image = await convertImageToBase64(imageBlob);

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

      const analysisData = {
        ...userData,
        imageAnalysis: response.data,
        uploadedImage: base64Image,
        timestamp: new Date().toISOString(),
      };

      localStorage.setItem("skinstricUserData", JSON.stringify(analysisData));

      setIsProcessing(false);

      router.push("/demographics");
    } catch (error) {
      console.error("Error analyzing image:", error);
      setIsProcessing(false);
      alert("Error analyzing image. Please try again.");
    }
  };

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      canvas.toBlob(
        (blob) => {
          const imageUrl = URL.createObjectURL(blob);
          setCapturedImage(imageUrl);
          setShowPreview(true);
          stopCamera();
        },
        "image/jpeg",
        0.8
      );
    }
  };

  const retakePhoto = () => {
    setShowPreview(false);
    setCapturedImage(null);
    startCamera();
  };

  const usePhoto = () => {
    if (capturedImage) {
      fetch(capturedImage)
        .then((res) => res.blob())
        .then((blob) => {
          processImage(blob);
        })
        .catch((error) => {
          console.error("Error processing captured image:", error);
          alert("Error processing image. Please try again.");
        });
    }
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
      });

      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setCameraActive(true);
      } else {
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
      alert("Error accessing camera. Please allow camera permissions.");
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setCameraActive(false);
  };

  const handleBack = () => {
    if (cameraActive) {
      stopCamera();
    }
    router.push("/camera");
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const interval = setInterval(() => {
      setIconSize((prev) => {
        const newSize = prev === 1 ? 1.1 : 1;
        setIsGrayed(newSize === 1.1);
        return newSize;
      });
    }, 1000);

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [mounted]);

  useEffect(() => {
    if (!isLoading && mounted && !cameraActive && !showPreview) {
      const cameraTimer = setTimeout(() => {
        startCamera();
      }, 100);

      return () => clearTimeout(cameraTimer);
    }
  }, [isLoading, mounted, cameraActive, showPreview]);

  if (!mounted) {
    return (
      <div className="h-screen bg-white relative">
        <NavBar page="SCAN" />
        <div className="flex items-center justify-center h-screen">
          <div className="text-black">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-white relative">
      <NavBar page="SCAN" />

      <canvas ref={canvasRef} style={{ display: "none" }} />

      {!isLoading && !showPreview && (
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className={`absolute top-10 left-0 w-full h-[calc(100vh-80px)] object-cover transition-opacity duration-500 ${
            cameraActive ? "opacity-100" : "opacity-0"
          }`}
        />
      )}

      {showPreview && capturedImage && (
        <>
          <img
            src={capturedImage}
            alt="Captured"
            className="absolute top-10 left-0 w-full h-[calc(100vh-80px)] object-cover"
          />
          <div className="absolute top-62 left-1/2 transform -translate-x-1/2 z-40">
            <p className="text-white font-medium text-base drop-shadow-lg">
              GREAT SHOT!
            </p>
          </div>
        </>
      )}

      {isLoading && (
        <div className="flex flex-col items-center justify-center h-screen">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <svg
              width="304"
              height="304"
              viewBox="0 0 375 375"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                animation: "rotate-slow 70s linear infinite",
              }}
            >
              <rect
                x="10"
                y="10"
                width="357"
                height="357"
                stroke="#6B7280"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="0 8"
                fill="none"
              />
            </svg>

            <svg
              width="347"
              height="347"
              viewBox="0 0 390 390"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                animation: "rotate-medium 65s linear infinite",
              }}
            >
              <rect
                x="10"
                y="10"
                width="371"
                height="371"
                stroke="#B8BCC3"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="0 8"
                fill="none"
              />
            </svg>

            <svg
              width="390"
              height="390"
              viewBox="0 0 404 404"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                animation: "rotate-fast 60s linear infinite",
              }}
            >
              <rect
                x="10"
                y="10"
                width="387"
                height="387"
                stroke="#D1D5DB"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="0 8"
                fill="none"
              />
            </svg>
          </div>

          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30"
            style={{ marginTop: "-10px" }}
          >
            <img
              src="/scan-icon.svg"
              alt="Scan"
              className="w-32 h-32"
              style={{
                transform: `scale(${iconSize})`,
                transition:
                  "transform 0.5s ease-in-out, opacity 0.8s ease-in-out",
                opacity: isGrayed ? 0.7 : 1,
              }}
              onLoad={() => {}}
              onError={(e) => console.error("Scan icon failed to load:", e)}
            />
          </div>

          <div
            className="mt-4 text-center"
            style={{
              opacity: isGrayed ? 0.7 : 1,
              transition: "opacity 0.8s ease-in-out",
            }}
          >
            <p className="text-black font-bold text-lg">SETTING UP CAMERA</p>
          </div>

          <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-center">
            <p className="text-black font-medium mb-4">
              TO GET BETTER RESULTS MAKE SURE TO HAVE:
            </p>
            <div className="flex flex-row items-center space-x-6">
              <div className="flex items-center space-x-2">
                <img
                  src="/rect-outer-line.svg"
                  alt="dash"
                  className="w-4 h-4"
                />
                <span className="text-black">NEUTRAL EXPRESSION</span>
              </div>
              <div className="flex items-center space-x-2">
                <img
                  src="/rect-outer-line.svg"
                  alt="dash"
                  className="w-4 h-4"
                />
                <span className="text-black">FRONTAL POSE</span>
              </div>
              <div className="flex items-center space-x-2">
                <img
                  src="/rect-outer-line.svg"
                  alt="dash"
                  className="w-4 h-4"
                />
                <span className="text-black">ADEQUATE LIGHTING</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {isProcessing && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 flex flex-col items-center">
            <p className="text-white font-medium mb-12">Analyzing Image</p>
            <div className="flex space-x-2">
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
        </div>
      )}

      {!isLoading && !showPreview && !isProcessing && (
        <div className="flex flex-col items-center justify-center h-screen">
          <div className="relative">
            {!cameraActive && (
              <div className="absolute top-10 left-0 w-full h-[calc(100vh-80px)] bg-gray-200 flex items-center justify-center">
                <p className="text-gray-500">Camera loading...</p>
              </div>
            )}
          </div>

          {cameraActive && (
            <div className="absolute top-1/2 right-10 transform -translate-y-1/2 z-30 flex items-center space-x-3">
              <span className="text-white font-medium text-lg">
                TAKE PICTURE
              </span>
              <div
                className="w-15 h-15 bg-white rounded-full flex items-center justify-center cursor-pointer relative transition-transform duration-200 hover:scale-105"
                onClick={captureImage}
              >
                <img
                  src="/Ellipse 178.svg"
                  alt="Ellipse 178"
                  className="w-6 h-6 absolute"
                />
                <img
                  src="/Ellipse 179.svg"
                  alt="Ellipse 179"
                  className="w-7 h-7 absolute"
                />
                <img
                  src="/image 225 (Traced).svg"
                  alt="Image 225"
                  className="w-7 h-7 absolute"
                />
              </div>
            </div>
          )}

          <div className="absolute bottom-50 left-1/2 transform -translate-x-1/2 text-center">
            <p className="text-white font-medium mb-4 text-base">
              TO GET BETTER RESULTS MAKE SURE TO HAVE:
            </p>
            <div className="flex flex-row items-center space-x-6">
              <div className="flex items-center space-x-2">
                <img
                  src="/rect-outer-line.svg"
                  alt="dash"
                  className="w-3 h-3"
                  style={{ filter: "brightness(0) invert(1)" }}
                />
                <span className="text-white text-xs">NEUTRAL EXPRESSION</span>
              </div>
              <div className="flex items-center space-x-2">
                <img
                  src="/rect-outer-line.svg"
                  alt="dash"
                  className="w-3 h-3"
                  style={{ filter: "brightness(0) invert(1)" }}
                />
                <span className="text-white text-xs">FRONTAL POSE</span>
              </div>
              <div className="flex items-center space-x-2">
                <img
                  src="/rect-outer-line.svg"
                  alt="dash"
                  className="w-3 h-3"
                  style={{ filter: "brightness(0) invert(1)" }}
                />
                <span className="text-white text-xs">ADEQUATE LIGHTING</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {showPreview && !isProcessing && (
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-center">
          <p className="text-white font-bold mb-4 text-base">PREVIEW</p>
          <div className="flex space-x-8">
            <button
              onClick={retakePhoto}
              className="px-6 py-3 bg-white text-black font-medium hover:bg-gray-100 transition-colors duration-200"
            >
              Retake
            </button>
            <button
              onClick={usePhoto}
              className="px-6 py-3 bg-black text-white font-medium hover:bg-gray-800 transition-colors duration-200"
            >
              Use This Photo
            </button>
          </div>
        </div>
      )}

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
              stroke={cameraActive || showPreview ? "#FFFFFF" : "#1A1B1C"}
            />
            <polygon
              className="back-arrow"
              points="25.5,26.5 25.5,33.5 19.5,30"
              fill={cameraActive || showPreview ? "#FFFFFF" : "#1A1B1C"}
            />
            <text
              className="text"
              x="55"
              y="35"
              fontFamily="Roboto, sans-serif"
              fontSize="14"
              fontWeight="bold"
              fill={cameraActive || showPreview ? "#FFFFFF" : "#000"}
              opacity="0.7"
            >
              BACK
            </text>
          </svg>
        </div>
      </div>

      <style>
        {`
          @keyframes rotate-slow {
            from {
              transform: translate(-50%, -50%) rotate(45deg);
            }
            to {
              transform: translate(-50%, -50%) rotate(405deg);
            }
          }
          @keyframes rotate-medium {
            from {
              transform: translate(-50%, -50%) rotate(55deg);
            }
            to {
              transform: translate(-50%, -50%) rotate(415deg);
            }
          }
          @keyframes rotate-fast {
            from {
              transform: translate(-50%, -50%) rotate(65deg);
            }
            to {
              transform: translate(-50%, -50%) rotate(425deg);
            }
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
    </div>
  );
};

export default ScanPage;

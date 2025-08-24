"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import NavBar from "../../components/NavBar";
import Square from "../../components/Square";
import TakeTestButton from "../../components/TakeTestButton";

const TakeTestPage = () => {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [apiResponse, setApiResponse] = useState(null);
  const [showProceed, setShowProceed] = useState(false);
  const router = useRouter();

  const questions = [
    {
      id: 1,
      placeholder: "Introduce Yourself",
      value: name,
      setValue: setName,
    },
    {
      id: 2,
      placeholder: "Your city name",
      value: city,
      setValue: setCity,
    },
  ];

  const handleKeyPress = async (e, questionId) => {
    if (e.key === "Enter" && e.target.value.trim()) {
      if (questionId === 1) {
        setCurrentQuestion(2);
      } else if (questionId === 2) {
        console.log("Form submitted:", { name, city });
        setIsLoading(true);

        await new Promise((resolve) => setTimeout(resolve, 3000));

        try {
          const response = await axios.post(
            "https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseOne",
            {
              name: name,
              location: city,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          const data = response.data;
          console.log("API Response:", data);
          setApiResponse(data);
          setIsLoading(false);
          setShowProceed(true);

          localStorage.setItem(
            "skinstricUserData",
            JSON.stringify({
              name: name,
              location: city,
              apiResponse: data,
              timestamp: new Date().toISOString(),
            })
          );
        } catch (error) {
          console.error("Error calling API:", error);
          setApiResponse({ success: false, message: "API call failed" });
          setIsLoading(false);
          setShowProceed(true);

          localStorage.setItem(
            "skinstricUserData",
            JSON.stringify({
              name: name,
              location: city,
              apiResponse: { success: false, message: "API call failed" },
              timestamp: new Date().toISOString(),
            })
          );
        }
      }
    }
  };

  const handleBack = () => {
    router.push("/");
  };

  const handleProceed = () => {
    router.push("/congrats");
  };

  const currentQuestionData = questions.find((q) => q.id === currentQuestion);

  return (
    <div className="h-screen bg-white relative">
      <NavBar />

      <style>
        {`
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
      <div className="absolute top-15 left-9 z-20">
        <p className="text-[12px] text-black font-bold uppercase tracking-tight">
          TO START ANALYSIS
        </p>
      </div>

      <main
        className="flex items-center justify-center h-screen w-full relative z-10"
        style={{ marginTop: "-110px" }}
      >
        <div className="relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <Square />
          </div>
          <div className="text-center relative z-10">
            {isLoading ? (
              <div className="flex flex-col items-center">
                <p className="text-[24px] text-black font-light mb-12">
                  Processing submission...
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
            ) : showProceed ? (
              <div className="flex flex-col items-center">
                <p className="text-[24px] text-black font-light mb-2">
                  Thank you!
                </p>
                <p className="text-[16px] text-gray-600">
                  Proceed for the next step
                </p>
              </div>
            ) : (
              <>
                <p className="text-[14px] text-gray-400 mb-2 text-center">
                  CLICK TO TYPE
                </p>
                <input
                  type="text"
                  placeholder={currentQuestionData.placeholder}
                  value={currentQuestionData.value}
                  onChange={(e) => currentQuestionData.setValue(e.target.value)}
                  onKeyPress={(e) => handleKeyPress(e, currentQuestionData.id)}
                  className="text-[100px] font-extralight text-black font-roboto leading-none bg-transparent border-none outline-none text-center w-[597px]"
                  style={{
                    caretColor: "black",
                    fontSize: currentQuestionData.value ? "50px" : "55px",
                    letterSpacing: "-0.05em",
                    color: currentQuestionData.value ? "#1A1A1A" : "#4B5563",
                  }}
                  autoFocus
                />
                <div
                  className="h-[1px] bg-black mx-auto "
                  style={{
                    width: "392px",
                    marginTop: "-8px",
                  }}
                ></div>
              </>
            )}
          </div>
        </div>
      </main>

      {showProceed && (
        <div className="absolute bottom-24 right-10 z-30">
          <TakeTestButton onClick={handleProceed} text="PROCEED" />
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

export default TakeTestPage;

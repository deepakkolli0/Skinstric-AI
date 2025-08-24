"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import NavBar from "../../components/NavBar";

const CongratsPage = () => {
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

      <main
        className="flex items-center justify-center h-screen w-full relative z-10"
        style={{ marginTop: "-90px" }}
      >
        <div className="text-center">
          <h2 className="text-[100px] font-extralight text-black font-roboto leading-none tracking-tight mb-8">
            Congrats!
          </h2>

          {userData && (
            <div className="text-left max-w-md mx-auto bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 text-black">
                Your Information:
              </h3>
              <div className="space-y-2 text-sm">
                <p>
                  <strong>Name:</strong> {userData.name}
                </p>
                <p>
                  <strong>Location:</strong> {userData.location}
                </p>
                <p>
                  <strong>API Status:</strong>
                  <span
                    className={
                      userData.apiResponse.success
                        ? "text-green-600"
                        : "text-red-600"
                    }
                  >
                    {userData.apiResponse.success
                      ? " ✅ Success"
                      : " ❌ Failed"}
                  </span>
                </p>
                <p>
                  <strong>API Message:</strong> {userData.apiResponse.message}
                </p>
                <p>
                  <strong>Submitted:</strong>{" "}
                  {new Date(userData.timestamp).toLocaleString()}
                </p>
              </div>
            </div>
          )}
        </div>
      </main>

      <div className="absolute bottom-24 left-10 z-30 flex items-center">
        <div className="flex items-center cursor-pointer" onClick={handleBack}>
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="7"
              y="7"
              width="26"
              height="26"
              fill="none"
              stroke="#1A1B1C"
              strokeWidth="1"
              transform="rotate(45 20 20)"
            />
            <polygon
              points="15.5,13.8 15.5,21.8 23.5,17.8"
              fill="#1A1B1C"
              transform="rotate(45 20 20)"
            />
          </svg>
          <span className="text-[12px] text-black font-medium ml-3">Back</span>
        </div>
      </div>
    </div>
  );
};

export default CongratsPage;

"use client";
import React, { useState, useEffect } from "react";
import DiscoverButton from "../components/DiscoverButton";
import TakeTestButton from "../components/TakeTestButton";
import DiamondButton from "../components/DiamondButton";
import DashedBorder from "../components/DashedBorder";

const Page = () => {
  const [hoverState, setHoverState] = useState("none");
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLeftHover = () => {
    setHoverState("left");
  };
  const handleRightHover = () => {
    setHoverState("right");
  };
  const handleMouseLeave = () => {
    setHoverState("none");
  };
  return (
    <div
      className={`h-screen bg-white relative ${
        hoverState === "left"
          ? "left-hover"
          : hoverState === "right"
          ? "right-hover"
          : ""
      }`}
    >
      <style>
        {`
           .left-side {
             transition: all 0.8s ease;
           }
           
           .right-side {
             transition: all 0.8s ease;
           }
           
           .main-text {
             transition: all 0.8s ease;
           }

           .left-hover .right-side {
             opacity: 0;
           }

           .right-hover .left-side {
             opacity: 0;
           }

           

         `}
      </style>

      {windowWidth > 1050 && (
        <>
          <div className="left-side absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1/2 rotate-45 z-20 -mt-1">
            <DashedBorder />
            <div
              className="absolute top-1/2 right-1/2 transform -translate-y-36 translate-x-46 -rotate-45 z-30"
              onMouseEnter={handleLeftHover}
              onMouseLeave={handleMouseLeave}
            >
              <DiscoverButton />
            </div>
          </div>

          <div className="right-side absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2 rotate-45 z-20 -mt-1">
            <DashedBorder />
            <div
              className="absolute top-1/2 left-1/2 transform -translate-y-[-80px] -translate-x-45 -rotate-45 z-30"
              onMouseEnter={handleRightHover}
              onMouseLeave={handleMouseLeave}
            >
              <TakeTestButton />
            </div>
          </div>
        </>
      )}

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
        {windowWidth > 1050 ? (
          <>
            <div
              className="main-text w-[680px] h-[240px] flex items-center justify-center"
              style={{
                transition: "all 0.8s ease",
                justifyContent: "center !important",
              }}
            >
              <h2
                className="text-[100px] font-extralight text-black font-roboto leading-none tracking-tight"
                data-hover={hoverState}
                style={{
                  textAlign: "center",
                  transform:
                    windowWidth <= 1450
                      ? hoverState === "right"
                        ? "translateX(calc(-50vw + 340px + 10px))"
                        : hoverState === "left"
                        ? "translateX(calc(50vw - 340px - 10px))"
                        : "translateX(0px)"
                      : hoverState === "right"
                      ? "translateX(-400px)"
                      : hoverState === "left"
                      ? "translateX(400px)"
                      : "translateX(0px)",
                  transition: "transform 0.8s ease",
                }}
              >
                Sophisticated{" "}
                <span
                  style={{
                    transform:
                      windowWidth <= 1450
                        ? hoverState === "right"
                          ? "translateX(-100px)"
                          : hoverState === "left"
                          ? "translateX(100px)"
                          : "translateX(0px)"
                        : hoverState === "right"
                        ? "translateX(-100px)"
                        : hoverState === "left"
                        ? "translateX(100px)"
                        : "translateX(0px)",
                    transition: "transform 0.8s ease",
                    display: "inline-block",
                  }}
                  data-hover={hoverState}
                >
                  skincare
                </span>
              </h2>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center text-center space-y-8 relative">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[500px] h-[500px] border-2 border-gray-300 rotate-45 flex-shrink-0"></div>
              <div className="w-[400px] h-[400px] border-2 border-gray-300 rotate-45 absolute flex-shrink-0"></div>
            </div>

            <h2 className="text-[60px] font-extralight text-black font-roboto leading-none tracking-tight text-center relative z-10">
              Sophisticated
              <br />
              <span className="inline-block">skincare</span>
            </h2>

            <p className="text-[16px] text-gray-500 leading-relaxed max-w-[600px]">
              Skinstric developed an A.I. that creates a<br />
              highly-personalized routine tailored to
              <br />
              what your skin needs.
            </p>

            <div className="-mt-4">
              <DiamondButton />
            </div>
          </div>
        )}
      </main>

      {windowWidth > 1050 && (
        <div className="absolute bottom-24 left-40 z-30">
          <p
            className="text-[13px] text-black leading-relaxed uppercase"
            style={{ width: "500px" }}
          >
            SKINSTRIC DEVELOPED AN A.I. THAT CREATES A<br />
            HIGHLY-PERSONALIZED ROUTINE TAILORED TO
            <br />
            WHAT YOUR SKIN NEEDS.
          </p>
        </div>
      )}
    </div>
  );
};

export default Page;

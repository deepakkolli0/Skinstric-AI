"use client";
import React, { useState } from "react";
import DiscoverButton from "../components/DiscoverButton";
import TakeTestButton from "../components/TakeTestButton";
import DashedBorder from "../components/DashedBorder";

const Page = () => {
  const [hoverState, setHoverState] = useState("none");

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
        <div
          className="main-text w-[680px] h-[240px] flex items-center justify-center"
          style={{
            transition: "all 0.8s ease",
            justifyContent: "center !important",
          }}
        >
          <h2
            className="text-[100px] font-extralight text-black font-roboto leading-none tracking-tight"
            style={{
              textAlign: "center",
              transform:
                hoverState === "right"
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
                  hoverState === "right"
                    ? "translateX(-100px)"
                    : hoverState === "left"
                    ? "translateX(100px)"
                    : "translateX(0px)",
                transition: "transform 0.8s ease",
                display: "inline-block",
              }}
            >
              skincare
            </span>
          </h2>
        </div>
      </main>

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
    </div>
  );
};

export default Page;

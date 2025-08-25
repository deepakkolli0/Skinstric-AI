import React from "react";

const GalleryRotatingBorder = ({ className = "" }) => {
  return (
    <div className={className}>
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
         `}
      </style>
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
  );
};

export default GalleryRotatingBorder;

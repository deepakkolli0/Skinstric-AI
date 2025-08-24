import React from "react";

const Square = () => {
  return (
    <>
      <style>
        {`
            @keyframes rotate1 {
              from {
                transform: rotate(45deg);
              }
              to {
                transform: rotate(405deg);
              }
            }
            @keyframes rotate2 {
              from {
                transform: rotate(50deg);
              }
              to {
                transform: rotate(410deg);
              }
            }
            @keyframes rotate3 {
              from {
                transform: rotate(55deg);
              }
              to {
                transform: rotate(415deg);
              }
            }
         `}
      </style>
      <svg
        width="424"
        height="424"
        viewBox="0 0 524 524"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          animation: "rotate1 65s linear infinite",
          transformOrigin: "center",
          position: "absolute",
        }}
      >
        <rect
          x="10"
          y="10"
          width="504"
          height="504"
          stroke="#6B7280"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="0 8"
          fill="none"
        />
      </svg>

      <svg
        width="484"
        height="484"
        viewBox="0 0 544 544"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          animation: "rotate2 55s linear infinite",
          transformOrigin: "center",
          position: "absolute",
        }}
      >
        <rect
          x="10"
          y="10"
          width="524"
          height="524"
          stroke="#B8BCC3"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="0 8"
          fill="none"
        />
      </svg>

      <svg
        width="544"
        height="544"
        viewBox="0 0 564 564"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          animation: "rotate3 50s linear infinite",
          transformOrigin: "center",
          position: "absolute",
        }}
      >
        <rect
          x="10"
          y="10"
          width="544"
          height="544"
          stroke="#D1D5DB"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="0 8"
          fill="none"
        />
      </svg>
    </>
  );
};

export default Square;

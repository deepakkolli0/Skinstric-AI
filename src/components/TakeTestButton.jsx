import React from "react";
import { useRouter } from "next/navigation";

const TakeTestButton = ({ onClick, text = "TAKE TEST" }) => {
  const router = useRouter();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      router.push("/take-test");
    }
  };

  return (
    <div style={{ display: "inline-block" }}>
      <style>
        {`
          .diamond {
            transition: transform 0.2s ease;
            transform-origin: 104.9px 19.9px;
            transform: rotate(45deg);
          }
          
          .take-test-svg:hover .diamond {
            transform: rotate(45deg) scale(1.15);
          }
          
          .arrow-icon {
            transition: transform 0.2s ease;
            transform-origin: 106.5px 28.8px;
          }
          
          .take-test-svg:hover .arrow-icon {
            transform: scale(1.15);
          }
        `}
      </style>

      <svg
        className="take-test-svg"
        width="127"
        height="50"
        viewBox="0 0 127 50"
        xmlns="http://www.w3.org/2000/svg"
        onClick={handleClick}
        style={{ cursor: "pointer" }}
      >
        <text
          className="text"
          x="2"
          y="35"
          fontFamily="Roboto, sans-serif"
          fontSize="14"
          fontWeight="bold"
          fill="#000"
          opacity="0.7"
        >
          {text}
        </text>

        <rect
          className="diamond"
          x="95"
          y="15"
          width="26"
          height="26"
          fill="none"
          stroke="#1A1B1C"
        />

        <polygon
          className="arrow-icon"
          points="99.5,23.8 99.5,31.8 107.5,27.8"
          fill="#1A1B1C"
        />
      </svg>
    </div>
  );
};

export default TakeTestButton;

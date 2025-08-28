import React from "react";
import { useRouter } from "next/navigation";

const DiamondButton = ({ onClick }) => {
  const router = useRouter();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      router.push("/take-test");
    }
  };

  return (
    <div
      className="flex items-center gap-2 button-container"
      style={{ display: "inline-flex", cursor: "pointer" }}
      onClick={handleClick}
    >
      <style>
        {`
           .diamond {
             transition: transform 0.2s ease;
             transform-origin: 40px 28px;
             transform: rotate(45deg);
           }
           
                       .button-container:hover .diamond {
              transform: rotate(45deg) scale(1.08);
            }
            
            .arrow-icon {
              transition: transform 0.2s ease;
              transform-origin: 40px 28px;
            }
            
            .button-container:hover .arrow-icon {
              transform: scale(1.08);
            }
            
            .text-animation {
              transition: transform 0.2s ease;
              transform-origin: center;
            }
            
            .button-container:hover .text-animation {
              transform: scale(1.08) translateX(15px) !important;
            }
         `}
      </style>

      <span
        className="text-[14px] font-bold text-black opacity-70 text-animation"
        style={{ transform: "translateX(15px)", marginTop: "6px" }}
      >
        ENTER EXPERIENCE
      </span>

      <svg
        className="diamond-svg"
        width="80"
        height="50"
        viewBox="0 0 80 50"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          className="diamond"
          x="27"
          y="15"
          width="26"
          height="26"
          fill="none"
          stroke="#1A1B1C"
          strokeWidth="2"
        />

        <polygon
          className="arrow-icon"
          points="37.5,23.8 37.5,31.8 45.5,27.8"
          fill="#1A1B1C"
        />
      </svg>
    </div>
  );
};

export default DiamondButton;

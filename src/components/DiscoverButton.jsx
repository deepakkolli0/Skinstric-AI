import React from "react";

const DiscoverButton = () => {
  return (
    <div style={{ display: "inline-block" }}>
      <style>
        {`
          .discover-diamond {
            transition: transform 0.2s ease;
            transform-origin: 28px 26px;
            transform: rotate(45deg);
          }
          
          .discover-svg:hover .discover-diamond {
            transform: rotate(45deg) scale(1.15);
          }
          
          .play-icon {
            transition: transform 0.2s ease;
            transform-origin: 23.5px 30px;
          }
          
          .discover-svg:hover .play-icon {
            transform: scale(1.15);
          }
        `}
      </style>

      <svg
        className="discover-svg"
        width="150"
        height="52"
        viewBox="0 0 150 52"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          className="discover-diamond"
          x="15"
          y="19"
          width="26"
          height="26"
          fill="none"
          stroke="#1A1B1C"
        />

        <polygon
          className="play-icon"
          points="27.5,25.5 27.5,34.5 19.5,30"
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
          DISCOVER AI.
        </text>
      </svg>
    </div>
  );
};

export default DiscoverButton;

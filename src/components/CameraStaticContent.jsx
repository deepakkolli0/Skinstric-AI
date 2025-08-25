import React from "react";

const CameraStaticContent = ({ className = "" }) => {
  return (
    <div
      className={className}
      style={{
        width: "507px",
        height: "507px",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <div
          className="hover:scale-108 duration-700 ease-in-out cursor-pointer"
          style={{
            transformOrigin: "center center",
          }}
        >
          <img src="/scan-icon.svg" alt="Scan Icon" width="143" height="143" />
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          top: "calc(50% - 120px)",
          left: "calc(50% + 47px)",
        }}
      >
        <img
          src="/scan-title.svg?v=1"
          alt="Scan Title"
          width="219"
          height="97"
          style={{ width: "219px", height: "97px" }}
        />
      </div>
    </div>
  );
};

export default CameraStaticContent;

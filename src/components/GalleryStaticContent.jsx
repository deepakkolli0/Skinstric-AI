import React from "react";

const GalleryStaticContent = ({ className = "" }) => {
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
          <img
            src="/gallery-icon.svg"
            alt="Gallery Icon"
            width="143"
            height="143"
          />
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          top: "calc(50% + 49px)",
          left: "calc(50% - 225px)",
        }}
      >
        <img
          src="/gallery-title.svg"
          alt="Gallery Title"
          width="188"
          height="84"
        />
      </div>
    </div>
  );
};

export default GalleryStaticContent;

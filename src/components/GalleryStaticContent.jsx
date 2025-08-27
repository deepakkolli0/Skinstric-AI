import React, { useRef } from "react";

const GalleryStaticContent = ({
  className = "",
  onFileSelect,
  grayed = false,
}) => {
  const fileInputRef = useRef(null);

  const handleGalleryClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && onFileSelect) {
      onFileSelect(file);
    }
  };

  return (
    <div
      className={className}
      style={{
        width: "507px",
        height: "507px",
        position: "relative",
      }}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
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
          onClick={handleGalleryClick}
        >
          <img
            src="/gallery-icon.svg"
            alt="Gallery Icon"
            width="143"
            height="143"
            style={{
              filter: grayed ? "grayscale(100%)" : "none",
              opacity: grayed ? 0.5 : 1,
            }}
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
          style={{
            filter: grayed ? "grayscale(100%)" : "none",
            opacity: grayed ? 0.5 : 1,
          }}
        />
      </div>
    </div>
  );
};

export default GalleryStaticContent;

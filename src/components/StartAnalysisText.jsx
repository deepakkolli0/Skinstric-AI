import React from "react";

const StartAnalysisText = ({ className = "" }) => {
  return (
    <div className={`absolute top-15 left-9 z-20 ${className}`}>
      <p className="text-[12px] text-black font-bold uppercase tracking-tight">
        TO START ANALYSIS
      </p>
    </div>
  );
};

export default StartAnalysisText;

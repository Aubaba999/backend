// components/LoadingIndicator.js
import React from "react";

const LoadingIndicator = () => {
  return (
    <div className="camera-container">
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <div className="loading-text">กำลังโหลด Face Detection Models...</div>
      </div>
    </div>
  );
};

export default LoadingIndicator;
// components/CameraStatus.js
import React from "react";

const CameraStatus = ({ isPageVisible }) => {
  if (isPageVisible) return null;

  return (
    <div className="camera-paused">
      <div className="camera-paused-content">
        <div className="camera-paused-icon">📷</div>
        <div>กล้องหยุดทำงานเมื่อออกจากหน้าเว็บ</div>
      </div>
    </div>
  );
};

export default CameraStatus;
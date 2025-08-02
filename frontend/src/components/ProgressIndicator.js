// components/ProgressIndicator.js
import React from "react";

const ProgressIndicator = ({ currentPose, poseInstructions }) => {
  const totalPoses = poseInstructions.length; // ใช้ length ของ prop

  return (
    <div className="progress-indicator">
      <div className="progress-header">
        {/* ใช้ตัวแปร totalPoses */}
        <div className="progress-title">ถ่ายภาพ {currentPose + 1}/{totalPoses}</div>
        <div className="progress-subtitle">{poseInstructions[currentPose]}</div>
      </div>
      <div className="progress-dots">
        {/* สร้าง Array แบบ dynamic ตามจำนวนท่า */}
        {Array.from({ length: totalPoses }, (_, index) => (
          <div
            key={index}
            className={`progress-dot ${index <= currentPose ? "active" : ""} ${
              index < currentPose ? "completed" : ""
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ProgressIndicator;
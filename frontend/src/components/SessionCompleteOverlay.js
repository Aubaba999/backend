// components/SessionCompleteOverlay.js
import React from "react";

const SessionCompleteOverlay = ({
  capturedImages,
  resetSession,
  goHome,
  poseInstructions,
}) => {
  return (
    <div className="session-complete-overlay">
      <div className="session-complete-content">
        <div className="session-complete-icon">🎉</div>
        <div className="session-complete-title">ถ่ายภาพเสร็จสิ้น!</div>
        <div className="session-complete-subtitle">
          ได้รับภาพทั้งหมด {capturedImages.length} ท่า
        </div>

        {/* *** ส่วนที่แก้ไข: ใช้ index เป็น key เพื่อให้ไม่ซ้ำกัน *** */}
        <div className="captured-images-preview">
          {capturedImages.map((imgData, index) => (
            <div key={index} className="preview-image-container">
              <img
                src={imgData.image}
                alt={imgData.pose}
                className="preview-image"
              />
              <p className="preview-label">{imgData.pose}</p>
            </div>
          ))}
        </div>
        {/* *** สิ้นสุดส่วนที่แก้ไข *** */}

        <div className="session-actions">
          <button
            onClick={resetSession}
            className="session-button session-button-retry"
          >
            ถ่ายใหม่
          </button>
          <button
            onClick={goHome}
            className="session-button session-button-finish"
          >
            เสร็จสิ้น
          </button>
        </div>
      </div>
    </div>
  );
};

export default SessionCompleteOverlay;
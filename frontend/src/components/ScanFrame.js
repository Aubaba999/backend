// components/ScanFrame.js
import React from "react";

const ScanFrame = ({ faceInFrame, hasGlasses, direction, isCountingStable }) => {
  // สร้างตัวแปรเก็บสถานะของกรอบไว้ที่เดียว
  const frameStatusClass =
    faceInFrame && !hasGlasses
      ? "success"
      : hasGlasses
      ? "warning"
      : "default";
  
  const directionMessageClass = `direction-${frameStatusClass}`;
  const cornerClass = `corner-${frameStatusClass}`;
  const frameBorderClass = `frame-border-${frameStatusClass}`;

  return (
    <div className="scan-frame-container">
      <div className="scan-frame-wrapper">
        <div className="scan-frame">
          <div className="scan-corners">
            {/* เรียกใช้ตัวแปร สั้นลงเยอะ! */}
            <div className={`corner corner-tl ${cornerClass}`} />
            <div className={`corner corner-tr ${cornerClass}`} />
            <div className={`corner corner-bl ${cornerClass}`} />
            <div className={`corner corner-br ${cornerClass}`} />
          </div>

          <div className={frameBorderClass}></div>
        </div>

        <div className="direction-text">
          <div className={`direction-message ${directionMessageClass}`}>
            {isCountingStable && !hasGlasses
              ? "กำลังเตรียมถ่ายภาพ..."
              : direction || "กำลังตรวจจับใบหน้า..."}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScanFrame;
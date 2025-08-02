// components/LightingIndicator.js
import React from "react";

const LightingIndicator = ({ lightingCondition }) => {
  return (
    <div className="lighting-indicator">
      <div className={`lighting-status lighting-${lightingCondition}`}>
        {lightingCondition === "good" && (
          <>
            <span className="lighting-icon">💡</span>
            <span>แสงดี</span>
          </>
        )}
        {lightingCondition === "low" && (
          <>
            <span className="lighting-icon">🌑</span>
            <span>แสงน้อย</span>
          </>
        )}
        {lightingCondition === "high" && (
          <>
            <span className="lighting-icon">☀️</span>
            <span>แสงจ้า</span>
          </>
        )}
      </div>
    </div>
  );
};

export default LightingIndicator;
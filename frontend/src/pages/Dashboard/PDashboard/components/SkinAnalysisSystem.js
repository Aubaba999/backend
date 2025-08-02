import React from "react";
import { FiCamera } from "react-icons/fi";
import { BsShieldCheck } from "react-icons/bs";

const SkinAnalysisSystem = ({ setCurrentPage }) => (
  <div className="pd-card pd-skin-analysis-card">
    <h3 className="pd-card-header">
      <BsShieldCheck /> Skin Analysis System
    </h3>
    <div className="pd-analysis-content">
      <div className="pd-camera-icon-wrapper">
        <FiCamera size={48} />
      </div>
      <button
        className="pd-take-photo-btn"
        onClick={() => setCurrentPage("camera")}
      >
        <FiCamera /> Take Photo for Analysis
      </button>
      <p className="pd-analysis-caption">
        Capture your skin condition for medical analysis
      </p>
    </div>
  </div>
);

export default SkinAnalysisSystem;
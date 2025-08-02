import React from "react";
import { FiBox } from "react-icons/fi";

const SkinModel3D = () => (
  <div className="pd-card pd-skin-model-card">
    <h3 className="pd-card-header">3D Skin Model</h3>
    <div className="pd-model-placeholder">
      <FiBox className="pd-model-icon" />
      <p>3D Skin Model</p>
      <span>Generated after analysis</span>
    </div>
  </div>
);

export default SkinModel3D;
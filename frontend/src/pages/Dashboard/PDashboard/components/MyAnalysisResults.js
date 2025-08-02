// components/MyAnalysisResults.js
import React from "react";
import { FiImage } from "react-icons/fi";

const MyAnalysisResults = ({ analysisImages = [] }) => { // <--- รับ props analysisImages
  const defaultImages = [
    { id: 0, image: null, pose: "หน้าตรง" },
    { id: 1, image: null, pose: "หน้าเอียงซ้าย" },
    { id: 2, image: null, pose: "หน้าเอียงขวา" },
  ];

  // ผสานรูปที่ได้รับมากับรูปเริ่มต้น
  const imagesToShow = defaultImages.map((defaultImg) => {
    const foundImage = analysisImages.find((img) => img.id === defaultImg.id);
    return foundImage || defaultImg;
  });

  return (
    <div className="pd-card">
      <h3 className="pd-card-header">My Analysis Results</h3>
      <div className="pd-analysis-results-grid">
        {imagesToShow.map((img, index) => (
          <div key={index} className="pd-result-item">
            {img.image ? (
              <img src={img.image} alt={img.pose} className="pd-result-image" />
            ) : (
              <FiImage className="pd-result-icon" />
            )}
            <span>{img.pose}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAnalysisResults;
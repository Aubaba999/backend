import React from "react";
import { FiUser } from "react-icons/fi";

const MyDoctors = ({ doctors }) => (
  <div className="pd-card">
    <h3 className="pd-card-header">
      <FiUser /> My Doctors
    </h3>
    <div className="pd-doctor-list">
      {doctors.map((doc, index) => (
        <div key={index} className="pd-doctor-item">
          <div className="pd-doctor-avatar-placeholder"></div>
          <div className="pd-doctor-info">
            <p className="pd-doctor-name">{doc.name}</p>
            <p className="pd-doctor-specialty">{doc.specialty}</p>
            <p className="pd-doctor-visit">{doc.next}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default MyDoctors;
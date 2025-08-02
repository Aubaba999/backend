import React from "react";

const PatientInfo = ({ patient }) => (
  <div className="pd-card pd-patient-info-card">
    <div className="pd-patient-avatar-placeholder">{patient.avatarInitial}</div>
    <h2 className="pd-patient-name">{patient.name}</h2>
    <p className="pd-patient-role">Patient</p>
    <div className="pd-patient-details">
      <p>
        <strong>Patient ID:</strong> {patient.id}
      </p>
      <p>
        <strong>Age:</strong> {patient.age} years
      </p>
      <p>
        <strong>Blood Type:</strong> {patient.bloodType}
      </p>
    </div>
  </div>
);

export default PatientInfo;
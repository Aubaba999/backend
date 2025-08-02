import React from "react";

const DoctorInfo = ({ doctor }) => (
  <div className="pd-card pd-patient-info-card">
    <div className="pd-patient-avatar-placeholder">{doctor.avatarInitial}</div>
    <h2 className="pd-patient-name">{doctor.name}</h2>
    <p className="pd-patient-role">{doctor.specialty}</p>
    <div className="pd-patient-details">
      <p>
        <strong>Doctor ID:</strong> {doctor.id}
      </p>
      <p>
        <strong>Age:</strong> {doctor.age} years
      </p>
      <p>
        <strong>Specialty:</strong> {doctor.specialty}
      </p>
    </div>
  </div>
);

export default DoctorInfo;
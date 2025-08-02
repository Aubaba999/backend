import React from "react";
import { FiClock } from "react-icons/fi";

const RecentPatients = ({ patients }) => (
  <div className="pd-card">
    <h3 className="pd-card-header">
      <FiClock /> Recent Patients
    </h3>
    <div className="pd-recent-patients-list">
      {patients.map((patient, index) => (
        <div key={index} className="pd-recent-patient-item">
          <div className="pd-patient-basic-info">
            <p className="pd-patient-name-recent">{patient.name}</p>
            <p className="pd-patient-condition">{patient.condition}</p>
            <p className="pd-patient-last-visit">
              Last visit: {patient.lastVisit}
            </p>
          </div>
          <div
            className={`pd-patient-status-badge ${patient.status
              .toLowerCase()
              .replace(" ", "-")}`}
          >
            {patient.status}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default RecentPatients;
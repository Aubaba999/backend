import React from "react";

const DoctorNotes = () => (
  <div className="pd-card">
    <div className="pd-notes-header">
      <div className="pd-doctor-avatar-placeholder small"></div>
      <div>
        <p className="pd-notes-doctor-name">
          Dr. Sarah Chen <span className="pd-notes-date">Jan 5, 2025</span>
        </p>
      </div>
    </div>
    <div className="pd-notes-content">
      <p>
        Based on the analysis results, I recommend continuing with the
        prescribed topical treatment. The skin condition shows improvement.
        Please schedule a follow-up appointment in 2 weeks.
      </p>
      <p>
        <strong>Prescribed Medications:</strong>
      </p>
      <ul className="pd-medication-list">
        <li>Tretinoin 0.025% cream - Apply once daily at night</li>
        <li>Benzoyl peroxide 2.5% gel - Apply twice daily</li>
        <li>Gentle moisturizer - Use as needed</li>
      </ul>
    </div>
  </div>
);

export default DoctorNotes;
import React from "react";
import { FiCalendar } from "react-icons/fi";

const UpcomingAppointments = ({ appointments }) => (
  <div className="pd-card">
    <h3 className="pd-card-header">
      <FiCalendar /> Upcoming Appointments
    </h3>
    <div className="pd-appointments-list">
      {appointments.map((appt, index) => (
        <div key={index} className="pd-appointment-item">
          <div className="pd-appt-date-box">{appt.day}</div>
          <div className="pd-appt-details">
            <p className="pd-appt-title">{appt.title}</p>
            <p className="pd-appt-doctor">{appt.doctor}</p>
            <p className="pd-appt-time">{appt.time}</p>
          </div>
          <div className={`pd-appt-status ${appt.status.toLowerCase()}`}>
            {appt.status}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default UpcomingAppointments;
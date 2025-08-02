import React from "react";

const AppointmentsCalendar = () => (
  <div className="pd-card">
    <div className="pd-calendar-header-container">
      <h3 className="pd-calendar-title">My Schedule</h3>
      <span className="pd-calendar-month">January 2025</span>
    </div>
    <div className="pd-calendar-grid">
      {/* แก้ปัญหา key ซ้ำ: ใช้ index เป็น key แทน day */}
      {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
        <div key={index} className="pd-calendar-day-name">
          {day}
        </div>
      ))}
      {/* เพิ่มช่องว่างให้ตรงกับปฏิทินจริง (ม.ค. 2025 วันที่ 1 คือวันพุธ) */}
      <div />
      <div />
      <div />
      {Array.from({ length: 31 }, (_, i) => i + 1).map((date) => (
        <div
          key={date}
          className={`pd-calendar-day ${
            [15, 29, 30].includes(date) ? "active" : ""
          }`}
        >
          {date}
        </div>
      ))}
    </div>
  </div>
);

export default AppointmentsCalendar;
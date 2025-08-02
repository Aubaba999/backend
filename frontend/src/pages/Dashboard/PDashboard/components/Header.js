import React, { useState } from "react"; // ต้อง import useState เข้ามาด้วยนะ
import { FiBell } from "react-icons/fi"; // ต้องแน่ใจว่า FiBell ถูก import แล้ว

const Header = ({ patient }) => {
  // เพิ่ม state สำหรับเก็บวันที่ที่ถูกเลือก เริ่มต้นด้วยวันที่ปัจจุบัน
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().slice(0, 10)
  );

  return (
    <header className="pd-app-header">
      <div className="logo">
        <img src="/images/logo.png" alt="GENSKIN Logo" />
      </div>
      <div className="pd-header-right">
        {/* เพิ่ม Dropdown เลือกวันที่ตรงนี้เลย */}
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="pd-date-picker" // เพิ่ม class สำหรับ styling
        />
        <div className="pd-patient-id">ID: {patient.id}</div>
        <button className="pd-icon-button">
          <FiBell />
        </button>
        <div className="pd-user-profile">
          <div className="pd-user-avatar-placeholder">
            {patient.avatarInitial}
          </div>
          <span className="pd-user-name">{patient.name}</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
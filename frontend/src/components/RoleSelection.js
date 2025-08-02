import React from 'react';
import './RoleSelection.css';

function RoleSelection({ setCurrentPage }) {
  return (
    <div className="role-selection-page">
      <h1>เริ่มต้นใช้งานในฐานะ...</h1>
      
      <div className="role-options">
        <div 
          className="role-card patient"
          onClick={() => setCurrentPage('claim-and-create-account')}
        >
          <h3>ผู้รับบริการ</h3>
          <p>สำหรับผู้ที่ต้องการวิเคราะห์และติดตามสภาพผิว</p>
        </div>
        
        <div 
          className="role-card doctor"
          onClick={() => setCurrentPage('fill-doctor')} // เปลี่ยนเป็น 'doctor-dashboard' เมื่อเลือกแพทย์
        >
          <h3>บุคลากรทางการแพทย์</h3>
          <p>สำหรับผู้ให้บริการทางการแพทย์</p>
        </div>
      </div>
    </div>
  );
}

export default RoleSelection;

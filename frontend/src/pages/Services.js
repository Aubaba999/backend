import React from 'react';
import './PageStyles.css';
function Services() {
  return (
    <div className="simple-page">
      <img src="/images/logo.png" alt="GENSKIN" />
      <h2>บริการของเรา</h2>
      
      <div className="page-content">
        <div className="service-card">
          <h3>วิเคราะห์ผิวหน้า</h3>
          <p>วิเคราะห์สภาพผิวด้วยเทคโนโลยีภาพถ่ายและ AI</p>
        </div>
        
        <div className="service-card">
          <h3>ติดตามผลการรักษา</h3>
          <p>บันทึกและติดตามพัฒนาการของผิวหน้า</p>
        </div>
        
        <div className="service-card">
          <h3>ปรึกษาแพทย์</h3>
          <p>ปรึกษากับแพทย์ผู้เชี่ยวชาญทางออนไลน์</p>
        </div>
      </div>
    </div>
  );
}

export default Services;
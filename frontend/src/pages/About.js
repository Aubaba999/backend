import React from 'react';
import './PageStyles.css';

function About() {
  return (
    <div className="simple-page">
      <img src="/images/logo.png" alt="GENSKIN" />
      <h2>เกี่ยวกับเรา</h2>
      
      <div className="page-content">
        <p>
          GENSKIN เป็นแพลตฟอร์มที่มุ่งเน้นการวิเคราะห์และติดตามสภาพผิวหน้า 
          ด้วยเทคโนโลยีภาพถ่ายและโมเดล 3D ที่แม่นยำ
        </p>
        
        <h3>วิสัยทัศน์</h3>
        <p>
          เรามุ่งมั่นที่จะเป็นผู้นำด้านเทคโนโลยีการวิเคราะห์ผิวหน้า 
          เพื่อช่วยให้ทุกคนมีสุขภาพผิวที่ดีขึ้น
        </p>
      </div>
    </div>
  );
}

export default About;
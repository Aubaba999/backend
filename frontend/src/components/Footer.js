import React from 'react';
import './Footer.css';

function Footer({ setCurrentPage }) {
  return (
    <footer className="main-footer">
      <div className="footer-content">
        <div className="footer-logo">
          <img src="/images/logo-white.png" alt="GENSKIN Logo" />
          <p>ใส่ใจผิวทุกวัน</p>
        </div>
        
        <div className="footer-links">
          <div className="link-group">
            <h4>ลิงก์ด่วน</h4>
            <ul>
              <li>หน้าหลัก</li>
              <li>เกี่ยวกับเรา</li>
              <li>บริการ</li>
              <li>ติดต่อ</li>
            </ul>
          </div>
          
          <div className="link-group">
            <h4>กฎหมาย</h4>
            <ul>
              <li>นโยบายความเป็นส่วนตัว</li>
              <li>ข้อกำหนดการใช้งาน</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>© 2023 GENSKIN. สงวนลิขสิทธิ์ทุกประการ</p>
      </div>
    </footer>
  );
}

export default Footer;
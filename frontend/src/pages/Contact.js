import React from 'react';
import './PageStyles.css';

function Contact() {
  return (
    <div className="simple-page">
      <img src="/images/logo.png" alt="GENSKIN" />
      <h2>ติดต่อเรา</h2>
      
      <div className="page-content">
        <div className="contact-info">
          <h3>ข้อมูลติดต่อ</h3>
          <p><strong>อีเมล:</strong> contact@genskin.com</p>
          <p><strong>โทรศัพท์:</strong> 02-123-4567</p>
          <p><strong>ที่อยู่:</strong> 123 ถนนสุขุมวิท กรุงเทพมหานคร</p>
        </div>
        
        <div className="contact-hours">
          <h3>เวลาทำการ</h3>
          <p>จันทร์ - ศุกร์: 9:00 - 18:00 น.</p>
          <p>เสาร์ - อาทิตย์: 10:00 - 15:00 น.</p>
        </div>
      </div>
    </div>
  );
}

export default Contact;
import React from 'react';
import './Register.css';

function Register({ setCurrentPage }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    // หลังลงทะเบียนสำเร็จ
    setCurrentPage('role-selection');
  };

  return (
    <div className="register-page">
      <img src="/images/logo.png" alt="GENSKIN Logo" />
      <h2>ลงทะเบียน</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>ชื่อผู้ใช้</label>
          <input type="text" required />
        </div>
        
        <div className="form-group">
          <label>อีเมล</label>
          <input type="email" placeholder="example@gmail.com" required />
        </div>
        
        <div className="form-group">
          <label>รหัสผ่าน</label>
          <input 
            type="password" 
            placeholder="อย่างน้อย 8 ตัวอักษร" 
            minLength="8"
            required
          />
        </div>
        
        <div className="form-group">
          <label>ยืนยันรหัสผ่าน</label>
          <input type="password" required />
        </div>
        
        <button type="submit" className="submit-btn">ลงทะเบียน</button>
      </form>
      
      <p className="login-link">
        มีบัญชีอยู่แล้ว? 
        <span onClick={() => setCurrentPage('login')}>เข้าสู่ระบบที่นี่</span>
      </p>
    </div>
  );
}

export default Register;
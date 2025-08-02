import React, { useState } from 'react';
import './CreateNVeri.css'; // ใช้ CSS เดิมได้เลย

function ClaimAndCreateAccount({ setCurrentPage, patientsDatabase, onAccountClaimed }) {
  const [formData, setFormData] = useState({
    claimCode: '', // เพิ่ม state สำหรับรหัส 5 ตัว
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    // ปรับการจัดการ input เพื่อให้รองรับรหัส Claim Code ด้วย
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'claimCode' ? value.toUpperCase() : value // ให้ Claim Code เป็นตัวพิมพ์ใหญ่เสมอ
    });
  };

  const handleSubmit = () => {
    // ใช้ e.preventDefault() ถ้า component นี้อยู่ใน <form> จริงๆ
    // e.preventDefault(); 
    
    const newErrors = {};

    // --- Step 1: ตรวจสอบ Claim Code ก่อน ---
    if (!formData.claimCode) {
      newErrors.claimCode = 'กรุณากรอกรหัสยืนยัน';
    } else if (formData.claimCode.length !== 5) {
      newErrors.claimCode = 'รหัสต้องมี 5 ตัวอักษร';
    } else {
      const foundPatient = patientsDatabase.find(
        (p) => p.claimCode === formData.claimCode && !p.isClaimed
      );
      if (!foundPatient) {
        newErrors.claimCode = 'รหัสไม่ถูกต้องหรือไม่สามารถใช้งานได้';
      }
    }
    
    // --- Step 2: ตรวจสอบ Email, Password ตามปกติ ---
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = 'กรุณากรอก Email';
    } else if (!emailPattern.test(formData.email)) {
      newErrors.email = 'รูปแบบ Email ไม่ถูกต้อง';
    }

    if (!formData.password) {
      newErrors.password = 'กรุณากรอกรหัสผ่าน';
    } else if (formData.password.length < 6) {
      newErrors.password = 'รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'กรุณายืนยันรหัสผ่าน';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'รหัสผ่านไม่ตรงกัน';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // --- Step 3: ถ้าข้อมูลถูกต้องทั้งหมดก็ดำเนินการสร้างบัญชี ---
    setErrors({});
    
    // ตรงนี้เราต้องหาข้อมูลคนไข้อีกครั้ง เพราะเราตรวจสอบแค่ว่ามีจริง
    const patientDetails = patientsDatabase.find(
      (p) => p.claimCode === formData.claimCode && !p.isClaimed
    );

    console.log("Creating account for:", formData.email, "with patient ID:", patientDetails.id);
    onAccountClaimed({
      ...patientDetails,
      email: formData.email,
      isClaimed: true,
      claimCode: null,
    });
    
    alert('สร้างบัญชีสำเร็จ! กำลังนำไปยังหน้าเข้าสู่ระบบ');
    setCurrentPage('login'); // หรือจะเปลี่ยนเป็น 'patient-dashboard' ก็ได้แล้วแต่มึงเลย
  };

  return (
    <div className="create-account-page">
      <div className="create-account-container">
        <h1>สร้างบัญชีผู้ใช้</h1>
        <p className="subtitle">กรอกรหัสยืนยันและข้อมูลเพื่อสร้างบัญชี</p>
        
        <div className="create-account-form">
          {/* ช่องสำหรับรหัส 5 ตัว ที่เพิ่มเข้ามา */}
          <div className="form-group">
            <label htmlFor="claimCode">รหัสยืนยัน</label>
            <input
              type="text"
              id="claimCode"
              name="claimCode"
              value={formData.claimCode}
              onChange={handleChange}
              placeholder="กรอกรหัส 5 หลัก เช่น A5S2J"
              className="form-input"
              maxLength={5}
            />
            {errors.claimCode && <span className="error-message">{errors.claimCode}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@email.com"
              className="form-input"
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="password">รหัสผ่าน</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="กรอกรหัสผ่าน"
              className="form-input"
            />
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="confirmPassword">ยืนยันรหัสผ่าน</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="กรอกรหัสผ่านอีกครั้ง"
              className="form-input"
            />
            {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
          </div>
          
          <button onClick={handleSubmit} className="create-button">
            สร้างบัญชี
          </button>
        </div>
      </div>
    </div>
  );
}

export default ClaimAndCreateAccount;
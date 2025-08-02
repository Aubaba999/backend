import React from 'react';
import './FormStyles.css';

function FillUserForm({ setCurrentPage }) {
  return (
    <div className="form-page">
      <img src="/images/logo.png" alt="GENSKIN" />
      <h2>กรอกข้อมูล</h2>
      <form>
        <div className="form-group">
          <label>ชื่อ - นามสกุล</label>
          <input type="text" />
        </div>

        <div className="form-group">
          <label>วัน/เดือน/ปีเกิด</label>
          <input type="date" />
        </div>

        {/* ✅ เพิ่มช่องเลือกเพศตรงนี้ */}
        <div className="form-group">
          <label>เพศ</label>
          <select>
            <option value="">-- กรุณาเลือกเพศ --</option>
            <option value="male">ชาย</option>
            <option value="female">หญิง</option>
            <option value="other">อื่นๆ</option>
          </select>
        </div>

        <div className="form-group">
          <label>เบอร์โทรศัพท์</label>
          <input type="tel" />
        </div>

        <div>
          <button
            type="button"
            className="submit-btn"
            onClick={() => setCurrentPage('patient-dashboard')}
          >
            สร้างบัญชี
          </button>
        </div>
      </form>
    </div>
  );
}

export default FillUserForm;

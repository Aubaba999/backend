import React, { useState } from 'react';
import './Login.css';

function Login({ setCurrentPage, setCurrentUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:3001/users');
      const users = await res.json();

      const matchedUser = users.find(
        (user) => user.email === email && user.password === password
      );

      if (matchedUser) {
        console.log("✅ เข้าระบบสำเร็จ:", matchedUser);

        setCurrentUser(matchedUser); // เก็บ user ไว้ใช้ในหน้าอื่น

        if (matchedUser.role === 1) {
          setCurrentPage('doctor-dashboard'); // ไปหน้าหมอ
        } else if (matchedUser.role === 0) {
          setCurrentPage('patient-dashboard'); // ไปหน้าคนไข้
        } else {
          setError('สิทธิ์ผู้ใช้ไม่ถูกต้อง');
        }
      } else {
        setError('อีเมลหรือรหัสผ่านไม่ถูกต้อง');
      }
    } catch (err) {
      console.error("❌ error:", err);
      setError('เกิดข้อผิดพลาดในการเชื่อมต่อ');
    }
  };

  return (
    <div className="login-page">
      <img src="/images/logo.png" alt="GENSKIN" />
      <h2>เข้าสู่ระบบ</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>อีเมล</label>
          <input
            type="email"
            placeholder="example@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>รหัสผ่าน</label>
          <input
            type="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && <p className="error-msg">{error}</p>}

        <button type="submit" className="submit-btn">เข้าสู่ระบบ</button>
      </form>

      <p className='register-link'>
        ยังไม่มีบัญชีใช่ไหม?
        <span onClick={() => setCurrentPage('role-selection')}>ลงทะเบียนที่นี่</span>
      </p>
    </div>
  );
}

export default Login;

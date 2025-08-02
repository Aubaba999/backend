import React from 'react';
import { TypeAnimation } from 'react-type-animation';
import './HomePage.css';

function HomePage({ setCurrentPage }) {
  return (
    <div className="homepage">
      <div className="content">
        <h1>
          <TypeAnimation
            sequence={[
              'วิเคราะห์หน้า ใส่ใจผิว',
              2000,
              '',
              500,
            ]}
            wrapper="span"
            speed={25}
            repeat={Infinity}
          />
        </h1>
        <p>ติดตามการรักษาโรคผิวหนังบนใบหน้าด้วยโมเดล 3D และภาพถ่ายอย่างแม่นยำ</p>
        <button 
          className="start-btn"
          onClick={() => setCurrentPage('login')}
        >
          เริ่มต้นใช้งาน
        </button>
      </div>
      <div className="doc">
        <img src="/images/doc.png" alt="doc" />
      </div>
    </div>
  );
}

export default HomePage;
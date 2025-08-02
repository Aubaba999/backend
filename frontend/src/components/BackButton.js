import React from "react";

const BackButton = ({ onClick, setCurrentPage, currentUser, stopCamera }) => {
  const handleClick = () => {
    // 1. ปิดกล้องก่อนเลย
    if (typeof stopCamera === 'function') {
      stopCamera();
    }

    // 2. ถ้ามี onClick พิเศษที่ส่งมา ก็เรียกใช้
    if (onClick) {
      onClick();
    }

    // 3. แล้วค่อยเปลี่ยนหน้าตาม role ของผู้ใช้
    if (typeof setCurrentPage === 'function') {
      if (currentUser && currentUser.role === 1) {
        setCurrentPage('doctor-dashboard'); // ไปหน้าหมอ
      } else if (currentUser && currentUser.role === 0) {
        setCurrentPage('patient-dashboard'); // ไปหน้าคนไข้
      } else {
        setCurrentPage('home');
      }
    }
  };

  return (
    <button onClick={handleClick} className="back-button">
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m12 19-7-7 7-7" />
        <path d="M19 12H5" />
      </svg>
    </button>
  );
};

export default BackButton;
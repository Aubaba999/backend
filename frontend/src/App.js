import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import Contact from './pages/Contact';
import About from './pages/About';
import Services from './pages/Services';
import Login from './pages/Login';
import Register from './pages/Register';
import RoleSelection from './components/RoleSelection';
import ClaimAndCreateAccount from './components/ClaimAndCreateAccount';
import FillDoctorForm from './pages/FillDoctorForm';
import FillUserForm from './pages/FillUserForm';
import PatientDashboard from './pages/Dashboard/PDashboard/PatientDashboard';
import DoctorDashboard from './pages/Dashboard/DDashboard/DoctorDashboard';
import CameraPage from './pages/CameraPage';
import History from './pages/History';
import PersonalInformation from './pages/PersonalInformation';
import Calendar from './pages/Calendar';
import SignOut from './pages/SignOut';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [currentUser, setCurrentUser] = useState(null);
  const [currentDoctorId, setCurrentDoctorId] = useState(null);
  const [chatType, setChatType] = useState('patient');
  const [analysisImages, setAnalysisImages] = useState([]); // <-- State ที่จะเก็บรูปภาพ

  const [patientsDatabase, setPatientsDatabase] = useState([
    { id: 'P001', name: 'John Doe', claimCode: 'A7J25', isClaimed: false },
    { id: 'P002', name: 'Jane Smith', claimCode: 'B8K36', isClaimed: true, email: 'jane.s@email.com' },
    { id: 'P003', name: 'Peter Jones', claimCode: 'C9L47', isClaimed: false },
  ]);

  const handleAccountClaimed = (updatedPatient) => {
    setPatientsDatabase(patientsDatabase.map(p => 
      p.id === updatedPatient.id ? updatedPatient : p
    ));
    console.log("Database updated:", patientsDatabase.map(p => 
      p.id === updatedPatient.id ? updatedPatient : p
    ));
  };
  
  // *** ส่วนที่เพิ่มเข้ามาใหม่ ***
  // สร้างฟังก์ชันนี้ขึ้นมาใหม่เพื่อรับข้อมูลรูปภาพจาก CameraPage
  const handleSessionComplete = (images) => {
    console.log('ได้รับรูปจาก CameraPage แล้ว:', images);
    setAnalysisImages(images); // อัปเดต state analysisImages ใน App.js
    
    // เปลี่ยนหน้าไป Dashboard ที่ถูกต้อง
    if (currentUser && currentUser.role === 1) { // 1 คือ Doctor
      setCurrentPage('doctor-dashboard');
    } else { // หรือเป็น Patient
      setCurrentPage('patient-dashboard');
    }
  };
  // *** สิ้นสุดส่วนที่เพิ่มเข้ามาใหม่ ***

  const renderPage = () => {
    switch(currentPage) {
      case 'home': return <HomePage setCurrentPage={setCurrentPage} />;
      case 'contact': return <Contact />;
      case 'about': return <About />;
      case 'services': return <Services />;
      case 'login': return <Login setCurrentPage={setCurrentPage} setCurrentUser={setCurrentUser} />;
      case 'register': return <Register setCurrentPage={setCurrentPage} />;
      case 'role-selection': return <RoleSelection setCurrentPage={setCurrentPage} />;
      case 'claim-and-create-account':
        return (
          <ClaimAndCreateAccount
            setCurrentPage={setCurrentPage}
            patientsDatabase={patientsDatabase}
            onAccountClaimed={handleAccountClaimed}
          />
        );
      case 'fill-doctor': return <FillDoctorForm setCurrentPage={setCurrentPage} />;
      case 'fill-user': return <FillUserForm setCurrentPage={setCurrentPage} />;
      case 'patient-dashboard': return (
        <PatientDashboard
          setCurrentPage={setCurrentPage}
          setCurrentDoctorId={setCurrentDoctorId}
          setChatType={setChatType}
          currentUser={currentUser}
          analysisImages={analysisImages} // <-- ส่ง analysisImages ไป
        />
      );
      case 'doctor-dashboard': return (
        <DoctorDashboard
          setCurrentPage={setCurrentPage}
          setChatType={setChatType}
          currentUser={currentUser}
          analysisImages={analysisImages} // <-- ส่ง analysisImages ไป
        />
      );
      case 'camera': return (
        <CameraPage
          setCurrentPage={setCurrentPage}
          currentUser={currentUser}
          onSessionComplete={handleSessionComplete} // <-- ส่งฟังก์ชันนี้ไป
        />
      );
      case 'patient-history': return <History />;
      case 'patient-profile': return <PersonalInformation />;
      case 'patient-calendar': return <Calendar />;
      case 'sign-out': return <SignOut />;
      default: return <HomePage setCurrentPage={setCurrentPage} />;
    }
  };

  const showHeaderFooter = currentPage !== 'patient-dashboard' &&
                          currentPage !== 'doctor-dashboard' &&
                          currentPage !== 'camera';

  return (
    <div className="app">
      {showHeaderFooter && <Header setCurrentPage={setCurrentPage} />}
      {renderPage()}
      {showHeaderFooter && <Footer />}
    </div>
  );
}

export default App;
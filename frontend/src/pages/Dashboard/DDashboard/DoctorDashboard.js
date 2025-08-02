import React from "react";
import "./DoctorDashboard.css";

// Import individual components
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import DoctorInfo from "./components/DoctorInfo";
import AppointmentsCalendar from "./components/AppointmentsCalendar";
import MyPatients from "./components/MyPatients";
import UpcomingAppointments from "./components/UpcomingAppointments";
import SkinAnalysisSystem from "./components/SkinAnalysisSystem";
import AnalysisResults from "./components/AnalysisResults";
import SkinModel3D from "./components/SkinModel3D";
import RecentPatients from "./components/RecentPatients";
import CalendarPage from "./components/CalendarPage";

// Mock Data
const doctorData = {
  name: "Dr. Sarah Chen",
  id: "DR-2025-001",
  age: 38,
  specialty: "Dermatologist",
  avatarInitial: "SC",
};

const patientsData = [
  {
    name: "Alice Wonderland",
    id: "PT-2025-002",
    avatarInitial: "AW",
    phoneNumber: "090-111-2222",
    claimCode: "ABCDE",
    isClaimed: false,
    status: "pending",
  },
  {
    name: "Bob The Builder",
    id: "PT-2025-003",
    avatarInitial: "BB",
    phoneNumber: "065-333-4444",
    claimCode: null,
    isClaimed: true,
    status: "completed",
  },
];

const appointmentsData = [
  {
    day: "29",
    title: "Follow-up Consultation",
    patient: "John Smith - Skin Analysis Review",
    time: "Jan 29, 2025 at 2:00 PM",
    status: "Confirmed",
  },
  {
    day: "30",
    title: "Initial Consultation",
    patient: "Emily Johnson - Skin Condition Assessment",
    time: "Jan 30, 2025 at 10:30 AM",
    status: "Scheduled",
  },
];

const recentPatientsData = [
  {
    name: "John Smith",
    condition: "Acne Treatment",
    lastVisit: "Jan 15, 2025",
    status: "Improving",
  },
  {
    name: "Emily Johnson",
    condition: "Eczema Management",
    lastVisit: "Jan 12, 2025",
    status: "Stable",
  },
  {
    name: "Michael Lee",
    condition: "Psoriasis Treatment",
    lastVisit: "Jan 10, 2025",
    status: "Under Review",
  },
];

// Main Component
const DoctorDashboard = ({
  currentUser,
  setCurrentPage,
  setCurrentDoctorId,
  setChatType,
  analysisImages, // <-- เพิ่ม props analysisImages ที่รับมาจาก App.js
}) => {
  const doctor = currentUser || doctorData;

  return (
    <div className="pd-main-container">
      <Sidebar />
      <div className="pd-content-wrapper">
        <Header doctor={doctor} />
        <main className="pd-main-content">
          <div className="pd-left-column">
            <DoctorInfo doctor={doctor} />
            <AppointmentsCalendar />
            <MyPatients patients={patientsData} />
          </div>
          <div className="pd-right-column">
            <UpcomingAppointments appointments={appointmentsData} />
            <SkinAnalysisSystem setCurrentPage={setCurrentPage} />
            <div className="pd-analysis-section">
              <AnalysisResults analysisImages={analysisImages} /> {/* <-- ส่ง analysisImages ต่อไปให้ AnalysisResults */}
              <SkinModel3D />
            </div>
            <RecentPatients patients={recentPatientsData} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DoctorDashboard;
import React from "react";
import "./PatientDashboard.css";

// Import components
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import PatientInfo from "./components/PatientInfo";
import AppointmentsCalendar from "./components/AppointmentsCalendar";
import MyDoctors from "./components/MyDoctors";
import UpcomingAppointments from "./components/UpcomingAppointments";
import SkinAnalysisSystem from "./components/SkinAnalysisSystem";
import MyAnalysisResults from "./components/MyAnalysisResults";
import SkinModel3D from "./components/SkinModel3D";
import DoctorNotes from "./components/DoctorNotes";

// Mock Data
const patientData = {
  name: "John Smith",
  id: "PT-2025-001",
  age: 32,
  bloodType: "O+",
  avatarInitial: "JS",
  role: 0,
};

const appointmentsData = [
  {
    day: "29",
    title: "Analysis Results Review",
    doctor: "Dr. Sarah Chen - Dermatology",
    time: "Jan 29, 2025 at 2:00 PM",
    status: "Confirmed",
  },
  {
    day: "15",
    title: "Follow-up Consultation",
    doctor: "Dr. Sarah Chen - Dermatology",
    time: "Feb 15, 2025 at 10:30 AM",
    status: "Scheduled",
  },
];

const doctorsData = [
  {
    name: "Dr. Sarah Chen",
    specialty: "Dermatologist",
    next: "Next: Jan 29, 2025",
  },
  {
    name: "Dr. Michael Lee",
    specialty: "General Practitioner",
    next: "Last visit: Dec 15, 2024",
  },
  {
    name: "Dr. Emily Johnson",
    specialty: "Oncologist",
    next: "Last visit: Nov 20, 2024",
  },
];

// Main Component - เหมือน DoctorDashboard
const PatientDashboard = ({ 
  currentUser, 
  setCurrentPage,
  setCurrentDoctorId, 
  setChatType,
  analysisImages, // <-- เพิ่ม props analysisImages ที่รับมาจาก App.js
}) => {
  const patient = currentUser || patientData;

  return (
    <div className="pd-main-container">
      <Sidebar />
      <div className="pd-content-wrapper">
        <Header patient={patient} />
        <main className="pd-main-content">
          <div className="pd-left-column">
            <PatientInfo patient={patient} />
            <AppointmentsCalendar />
            <MyDoctors doctors={doctorsData} />
          </div>
          <div className="pd-right-column">
            <UpcomingAppointments appointments={appointmentsData} />
            <SkinAnalysisSystem setCurrentPage={setCurrentPage} />
            <div className="pd-analysis-section">
              <MyAnalysisResults analysisImages={analysisImages} /> {/* <-- ส่ง analysisImages ต่อไปให้ MyAnalysisResults */}
              <SkinModel3D />
            </div>
            <DoctorNotes />
          </div>
        </main>
      </div>
    </div>
  );
};

export default PatientDashboard;
import React, { useState } from "react";
import { FiHome, FiUser, FiCalendar, FiLogOut, FiBell, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import "./AppointmentsPage.css";

// Sidebar Component
const Sidebar = ({ activeTab, setActiveTab }) => (
  <aside className="pd-sidebar">
    <nav className="pd-sidebar-nav">
      <a 
        href="#home" 
        className={`pd-nav-item ${activeTab === 'home' ? 'active' : ''}`} 
        aria-label="Dashboard"
        onClick={() => setActiveTab('home')}
      >
        <FiHome />
      </a>
      <a 
        href="#profile" 
        className={`pd-nav-item ${activeTab === 'profile' ? 'active' : ''}`} 
        aria-label="Profile"
        onClick={() => setActiveTab('profile')}
      >
        <FiUser />
      </a>
      <a 
        href="#appointments" 
        className={`pd-nav-item ${activeTab === 'appointments' ? 'active' : ''}`} 
        aria-label="Appointments"
        onClick={() => setActiveTab('appointments')}
      >
        <FiCalendar />
      </a>
    </nav>
    <div className="pd-sidebar-footer">
      <a href="#logout" className="pd-nav-item" aria-label="Log Out">
        <FiLogOut />
      </a>
    </div>
  </aside>
);

// Header Component
const Header = ({ patient }) => (
  <header className="pd-app-header">
    <div className="logo">
      <img src="/images/logo.png" alt="GENSKIN Logo" />
    </div>
    <div className="pd-header-right">
      <div className="pd-patient-id">ID: {patient.id}</div>
      <button className="pd-icon-button">
        <FiBell />
      </button>
      <div className="pd-user-profile">
        <div className="pd-user-avatar-placeholder">
          {patient.avatarInitial}
        </div>
        <span className="pd-user-name">{patient.name}</span>
      </div>
    </div>
  </header>
);

// Calendar Component
const Calendar = ({ appointments }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    
    return days;
  };
  
  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };
  
  const hasAppointment = (day) => {
    return appointments.some(apt => parseInt(apt.day) === day);
  };
  
  const days = getDaysInMonth(currentDate);
  
  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button className="nav-button" onClick={() => navigateMonth(-1)}>
          <FiChevronLeft />
        </button>
        <h2 className="calendar-title">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h2>
        <button className="nav-button" onClick={() => navigateMonth(1)}>
          <FiChevronRight />
        </button>
      </div>
      
      <div className="calendar-grid">
        {daysOfWeek.map(day => (
          <div key={day} className="calendar-day-header">
            {day}
          </div>
        ))}
        
        {days.map((day, index) => (
          <div 
            key={index} 
            className={`calendar-day ${day ? 'has-date' : 'empty'} ${hasAppointment(day) ? 'has-appointment' : ''}`}
          >
            {day && (
              <>
                <span className="day-number">{day}</span>
                {hasAppointment(day) && <div className="appointment-indicator"></div>}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// UpcomingAppointments Component
const UpcomingAppointments = ({ appointments }) => (
  <div className="pd-card">
    <h3 className="pd-card-header">
      <FiCalendar /> Upcoming Appointments
    </h3>
    <div className="pd-appointments-list">
      {appointments.map((appt, index) => (
        <div key={index} className="pd-appointment-item">
          <div className="pd-appt-date-box">{appt.day}</div>
          <div className="pd-appt-details">
            <p className="pd-appt-title">{appt.title}</p>
            <p className="pd-appt-doctor">{appt.doctor}</p>
            <p className="pd-appt-time">{appt.time}</p>
          </div>
          <div className={`pd-appt-status ${appt.status.toLowerCase()}`}>
            {appt.status}
          </div>
        </div>
      ))}
    </div>
  </div>
);

// Mock Data
const patientData = {
  name: "John Smith",
  id: "PT-2025-001",
  age: 32,
  bloodType: "O+",
  avatarInitial: "JS",
  role: 0
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

// Main Component
const AppointmentsPage = () => {
  const [activeTab, setActiveTab] = useState('appointments');
  
  return (
    <div className="pd-main-container">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="pd-content-wrapper">
        <Header patient={patientData} />
        <main className="appointments-main-content">
          <div className="appointments-layout">
            <div className="calendar-section">
              <Calendar appointments={appointmentsData} />
            </div>
            <div className="appointments-section">
              <UpcomingAppointments appointments={appointmentsData} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AppointmentsPage;
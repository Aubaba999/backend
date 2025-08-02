import React, { useState } from "react";
import { FiChevronLeft, FiChevronRight, FiPlus, FiClock, FiUser } from "react-icons/fi";

const CalendarPage = ({ appointments, patient }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  // Get current month and year
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  // Month names
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Get first day of month and number of days
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
  const firstDayWeekday = firstDayOfMonth.getDay();
  const daysInMonth = lastDayOfMonth.getDate();

  // Navigate months
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
  };

  // Generate calendar days
  const generateCalendarDays = () => {
    const days = [];
    
    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDayWeekday; i++) {
      days.push(null);
    }
    
    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    
    return days;
  };

  // Check if date has appointments
  const hasAppointments = (day) => {
    if (!day) return false;
    // Simple check - in real app, you'd properly parse dates
    return appointments.some(apt => apt.day === day.toString());
  };

  // Get appointments for specific day
  const getAppointmentsForDay = (day) => {
    if (!day) return [];
    return appointments.filter(apt => apt.day === day.toString());
  };

  // Format date for display
  const formatDateForDisplay = (day) => {
    if (!day) return "";
    return `${monthNames[currentMonth]} ${day}, ${currentYear}`;
  };

  const calendarDays = generateCalendarDays();

  return (
    <div className="calendar-page">
      <div className="calendar-header">
        <div className="calendar-title">
          <h1>Appointments Calendar</h1>
          <p>Manage your medical appointments and schedule</p>
        </div>
        <button className="add-appointment-btn">
          <FiPlus /> New Appointment
        </button>
      </div>

      <div className="calendar-container">
        <div className="calendar-section">
          <div className="calendar-nav">
            <button onClick={goToPreviousMonth} className="nav-btn">
              <FiChevronLeft />
            </button>
            <h2 className="month-year">
              {monthNames[currentMonth]} {currentYear}
            </h2>
            <button onClick={goToNextMonth} className="nav-btn">
              <FiChevronRight />
            </button>
          </div>

          <div className="calendar-grid">
            <div className="calendar-weekdays">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
                <div key={day} className="weekday">{day}</div>
              ))}
            </div>
            
            <div className="calendar-days">
              {calendarDays.map((day, index) => (
                <div
                  key={index}
                  className={`calendar-day ${day ? 'active' : 'inactive'} ${
                    hasAppointments(day) ? 'has-appointments' : ''
                  } ${selectedDate === day ? 'selected' : ''}`}
                  onClick={() => day && setSelectedDate(day)}
                >
                  {day && (
                    <>
                      <span className="day-number">{day}</span>
                      {hasAppointments(day) && (
                        <div className="appointment-indicators">
                          {getAppointmentsForDay(day).map((apt, idx) => (
                            <div key={idx} className="appointment-dot"></div>
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="appointment-details">
          <div className="details-header">
            <h3>
              {selectedDate 
                ? `Appointments for ${formatDateForDisplay(selectedDate)}`
                : 'Select a date to view appointments'
              }
            </h3>
          </div>

          <div className="appointments-list">
            {selectedDate && getAppointmentsForDay(selectedDate).length > 0 ? (
              getAppointmentsForDay(selectedDate).map((appointment, index) => (
                <div key={index} className="appointment-card">
                  <div className="appointment-header">
                    <h4>{appointment.title}</h4>
                    <span className={`status ${appointment.status.toLowerCase()}`}>
                      {appointment.status}
                    </span>
                  </div>
                  <div className="appointment-details-info">
                    <div className="detail-item">
                      <FiUser className="detail-icon" />
                      <span>{appointment.doctor}</span>
                    </div>
                    <div className="detail-item">
                      <FiClock className="detail-icon" />
                      <span>{appointment.time}</span>
                    </div>
                  </div>
                  <div className="appointment-actions">
                    <button className="action-btn primary">Reschedule</button>
                    <button className="action-btn secondary">Cancel</button>
                  </div>
                </div>
              ))
            ) : selectedDate ? (
              <div className="no-appointments">
                <p>No appointments scheduled for this date.</p>
                <button className="add-appointment-btn">
                  <FiPlus /> Schedule Appointment
                </button>
              </div>
            ) : (
              <div className="select-date-prompt">
                <p>Click on a date to view or schedule appointments.</p>
              </div>
            )}
          </div>

          <div className="upcoming-section">
            <h4>Upcoming Appointments</h4>
            <div className="upcoming-list">
              {appointments.map((appointment, index) => (
                <div key={index} className="upcoming-item">
                  <div className="upcoming-date">
                    <span className="date-day">{appointment.day}</span>
                    <span className="date-month">Jan</span>
                  </div>
                  <div className="upcoming-info">
                    <h5>{appointment.title}</h5>
                    <p>{appointment.doctor}</p>
                    <small>{appointment.time}</small>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
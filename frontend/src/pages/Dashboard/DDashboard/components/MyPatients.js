import React, { useState } from "react";
import { FiUsers, FiSearch, FiClock, FiPlus, FiCopy } from "react-icons/fi";

// Helper functions
const generateCode = () => {
  const chars = "0123456789ABCDEF";
  let code = "";
  for (let i = 0; i < 5; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
};

const copyToClipboard = (text) => {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      console.log("Code copied to clipboard");
    })
    .catch((err) => {
      console.error("Failed to copy: ", err);
    });
};

const MyPatients = ({ patients }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [patientsState, setPatientsState] = useState(patients);
  const [showCodeModal, setShowCodeModal] = useState(false);
  const [generatedCode, setGeneratedCode] = useState("");
  const [showAddPatientModal, setShowAddPatientModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    birthDay: "",
    birthMonth: "",
    birthYear: "",
    gender: "",
    phone: "",
  });

  const filteredPatients = patientsState.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.id.includes(searchTerm)
  );

  const updatePatientStatus = (patientId, newStatus) => {
    setPatientsState((prevPatients) =>
      prevPatients.map((p) =>
        p.id === patientId ? { ...p, status: newStatus } : p
      )
    );
  };

  const handleViewHistory = (patientId) => {
    console.log(`View history for patient ${patientId}`);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setFormData({
      name: "",
      birthDay: "",
      birthMonth: "",
      birthYear: "",
      gender: "",
      phone: "",
    });
  };

  const closeModal = () => {
    setShowAddPatientModal(false);
    resetForm();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newId = `PT-2025-${String(
      Math.max(...patientsState.map((p) => parseInt(p.id.split("-")[2]))) + 1
    ).padStart(3, "0")}`;

    const nameParts = formData.name.split(" ");
    const avatarInitial =
      nameParts.length > 1
        ? nameParts[0][0] + nameParts[1][0]
        : nameParts[0][0] + nameParts[0][1];

    const patientCode = generateCode();

    const newPatient = {
      id: newId,
      name: formData.name,
      avatarInitial: avatarInitial.toUpperCase(),
      phoneNumber: formData.phone,
      claimCode: patientCode,
      isClaimed: false,
      status: "เลือกสถานะ",
      birthDate: formData.birthDate,
      gender: formData.gender,
      lastVisit: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
    };

    setPatientsState((prev) => [...prev, newPatient]);
    setShowAddPatientModal(false);
    setGeneratedCode(patientCode);
    setShowCodeModal(true);
    resetForm();

    console.log("New patient added:", newPatient);
  };

  return (
    <div className="pd-card">
      <div className="pd-patients-header">
        <h3 className="pd-card-header">
          <FiUsers /> My Patients
        </h3>
        <button
          className="pd-add-patient-btn"
          onClick={() => setShowAddPatientModal(true)}
        >
          <FiPlus /> Add Patient
        </button>
      </div>

      <div className="pd-search-container">
        <FiSearch className="pd-search-icon" />
        <input
          type="text"
          placeholder="Search patients..."
          className="pd-search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="pd-patients-list">
        {filteredPatients.map((patient) => (
          <div key={patient.id} className="pd-patient-item">
            <div className="pd-patient-avatar-placeholder">
              {patient.avatarInitial}
            </div>
            
              <div className="pd-patient-info">
              <div className="pd-patient-name">{patient.name}</div>
              <div className="pd-patient-id">#{patient.id}</div>
            </div>
            
            <div className="pd-patient-actions">
              <select
                className={`pd-status-select ${
                  patient.status === "เลือกสถานะ"
                    ? "pending"
                    : patient.status === "เสร็จสิ้น"
                    ? "completed"
                    : patient.status === "รอประเมิน"
                    ? "in-progress"
                    : ""
                }`}
                value={patient.status}
                onChange={(e) => {
                  const newStatus = e.target.value;
                  updatePatientStatus(patient.id, newStatus);
                  console.log(
                    `Patient ${patient.id} status changed to: ${newStatus}`
                  );
                }}
              >
                <option value="เลือกสถานะ">เลือกสถานะ</option>
                <option value="รอประเมิน">รอประเมิน</option>
                <option value="เสร็จสิ้น">เสร็จสิ้น</option>
              </select>
              
              <button
                className="pd-history-btn"
                onClick={() => handleViewHistory(patient.id)}
                title="ดูประวัติการประเมิน"
              >
                <FiClock />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Patient Modal */}
      {showAddPatientModal && (
        <div className="pd-modal-overlay">
          <div className="pd-modal-content">
            <div className="pd-modal-header">
              <h3>กรอกข้อมูล</h3>
              <button className="pd-modal-close" onClick={closeModal}>
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className="pd-modal-form">
              <div className="pd-form-group">
                <label htmlFor="name">ชื่อ - นามสกุล</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="กรอกชื่อ-นามสกุล"
                  required
                />
              </div>

              <div className="pd-form-group">
                <label>วัน/เดือน/ปีเกิด</label>
                <div className="pd-date-input-group">
                  <select
                    name="birthDay"
                    value={formData.birthDay || ""}
                    onChange={handleInputChange}
                    className="pd-date-select"
                    required
                  >
                    <option value="">DD</option>
                    {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                      <option key={day} value={day.toString().padStart(2, "0")}>
                        {day.toString().padStart(2, "0")}
                      </option>
                    ))}
                  </select>

                  <select
                    name="birthMonth"
                    value={formData.birthMonth || ""}
                    onChange={handleInputChange}
                    className="pd-date-select"
                    required
                  >
                    <option value="">MM</option>
                    {Array.from({ length: 12 }, (_, i) => i + 1).map(
                      (month) => (
                        <option
                          key={month}
                          value={month.toString().padStart(2, "0")}
                        >
                          {month.toString().padStart(2, "0")}
                        </option>
                      )
                    )}
                  </select>

                  <select
                    name="birthYear"
                    value={formData.birthYear || ""}
                    onChange={handleInputChange}
                    className="pd-date-select"
                    required
                  >
                    <option value="">YYYY</option>
                    {Array.from(
                      { length: 80 },
                      (_, i) => new Date().getFullYear() - i
                    ).map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="pd-form-group">
                <label htmlFor="gender">เพศโดยกำเนิด</label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">-- กรุณาเลือกเพศ --</option>
                  <option value="male">ชาย</option>
                  <option value="female">หญิง</option>
                </select>
              </div>

              <div className="pd-form-group">
                <label htmlFor="phone">เบอร์โทรศัพท์</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="กรอกเบอร์โทรศัพท์"
                  required
                />
              </div>

              <div className="pd-modal-actions">
                <button
                  type="button"
                  className="pd-btn-cancel"
                  onClick={closeModal}
                >
                  ยกเลิก
                </button>
                <button type="submit" className="pd-btn-submit">
                  สร้างข้อมูล
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Code Modal */}
      {showCodeModal && (
        <div className="pd-modal-overlay">
          <div className="pd-modal-content">
            <div className="pd-modal-header">
              <h3>รหัสสำหรับคนไข้</h3>
              <button
                className="pd-modal-close"
                onClick={() => setShowCodeModal(false)}
              >
                ×
              </button>
            </div>

            <div className="pd-modal-form">
              <div className="pd-code-display-container">
                <div className="pd-code-display">
                  <span className="pd-code-hash">#</span>
                  <span className="pd-code-text">{generatedCode}</span>
                </div>
                <button
                  className="pd-copy-btn"
                  onClick={() => copyToClipboard(`#${generatedCode}`)}
                  title="คัดลอกรหัส"
                >
                  <FiCopy />
                </button>
              </div>

              <p className="pd-code-instruction">
                นำรหัสนี้ไปให้คนไข้ของคุณ เพื่อใช้ในการลงทะเบียนบัญชีและ claim
                บัญชีให้เป็นของตัวคนไข้เอง
              </p>

              <div className="pd-modal-actions">
                <button
                  type="button"
                  className="pd-btn-submit"
                  onClick={() => setShowCodeModal(false)}
                >
                  เข้าใจแล้ว
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyPatients;
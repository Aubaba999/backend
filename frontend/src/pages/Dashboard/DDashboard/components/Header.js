import React from "react";
import { FiBell } from "react-icons/fi";

const Header = ({ doctor }) => (
  <header className="pd-app-header">
    <div className="logo">
      <img src="/images/logo.png" alt="GENSKIN Logo" />
    </div>
    <div className="pd-header-right">
      <div className="pd-patient-id">ID: {doctor.id}</div>
      <button className="pd-icon-button">
        <FiBell />
      </button>
      <div className="pd-user-profile">
        <div className="pd-user-avatar-placeholder">{doctor.avatarInitial}</div>
        <span className="pd-user-name">{doctor.name}</span>
      </div>
    </div>
  </header>
);

export default Header;
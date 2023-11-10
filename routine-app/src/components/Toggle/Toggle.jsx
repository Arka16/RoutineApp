// ToggleSwitch.js
import React from 'react';
import './Toggle.css';

const Toggle = ({ checked, onChange }) => {
  return (
    <label className="toggle-switch">
      <input type="checkbox" checked={checked} onChange={onChange} />
      <span className="switch"></span>
    </label>
  );
};

export default Toggle

import React from "react";

function Alert({ message, onCancel, onOK }) {
  return (
    <div className="custom-dialog">
      <p>{message}</p>
      <button onClick={onCancel}>Cancel</button>
      <button onClick={onOK}>OK</button>
    </div>
  );
}

export default Alert
  
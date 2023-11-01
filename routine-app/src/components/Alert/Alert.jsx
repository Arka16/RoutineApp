import React from "react";
function Alert() {
    const showAlert = () => {
      window.alert("This is a simple alert!");
    };
  
    return (
      <div>
        <button onClick={showAlert}>Show Alert</button>
      </div>
    );
  }


  export default Alert
  
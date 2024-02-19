import React from "react";

const CancelSubscriptionButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      style={{
        backgroundColor: "#f44336",
        color: "white",
        border: "none",
        borderRadius: "4px",
        padding: "10px 20px",
        cursor: "pointer",
        fontSize: "16px",
        fontWeight: "bold",
        transition: "background-color 0.3s ease",
        outline: "none",
      }}
    >
      Cancel Subscription
    </button>
  );
};

export default CancelSubscriptionButton;

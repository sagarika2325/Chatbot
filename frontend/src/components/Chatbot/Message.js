import React from "react";
import "./Message.css";

const Message = ({ sender, text }) => {
  return (
    <div className={`message ${sender}`}>
      <div className="message-bubble">{text}</div>
    </div>
  );
};

export default Message;

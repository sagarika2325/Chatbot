import React, { useState } from "react";
import ChatbotPanel from "./components/Chatbot/ChatbotPanel";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="App">
      <button
        className="chatbot-launcher"
        onClick={() => setIsOpen(!isOpen)}
      >
        💬
      </button>
      {isOpen && <ChatbotPanel onClose={() => setIsOpen(false)} />}
    </div>
  );
}

export default App;

import React, { useState, useRef } from "react";

import "./ChatbotPanel.css";

const ChatbotPanel = ({ onClose }) => {
    const [activeTab, setActiveTab] = useState("home");
    const [messages, setMessages] = useState([
        { sender: "bot", text: "Hi there! I’m your Varmodel Assistant. How can I help you today?" }
    ]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const inputRef = useRef(null);


    const handleSend = async () => {
        if (!input.trim()) return;

        const newMessages = [...messages, { sender: "user", text: input }];
        setMessages(newMessages);
        setIsTyping(true);

        try {
            const response = await fetch("http://127.0.0.1:8000/ask", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ question: input }),
            });
            const data = await response.json();
            setMessages((prev) => [
                ...prev,
                { sender: "bot", text: data.answer },
            ]);
        } catch (error) {
            setMessages((prev) => [
                ...prev,
                { sender: "bot", text: "Sorry, something went wrong." },
            ]);
        }

        setInput("");
        setIsTyping(false);
    };



    return (
        <div className="chatbot-panel">
            <div className="chatbot-panel-header">
                <div className="logo">
                    <img src="/logo192.png" alt="Varmodel" />
                    <span>Varmodel Assistant</span>
                </div>
                <button onClick={onClose} className="close-btn">✖</button>
            </div>

            <div className="chatbot-panel-tabs">
                <button
                    className={activeTab === "home" ? "active" : ""}
                    onClick={() => setActiveTab("home")}
                >Home</button>
                <button
                    className={activeTab === "messages" ? "active" : ""}
                    onClick={() => setActiveTab("messages")}
                >Messages</button>
                <button
                    className={activeTab === "help" ? "active" : ""}
                    onClick={() => setActiveTab("help")}
                >Help</button>
                <button
                    className={activeTab === "news" ? "active" : ""}
                    onClick={() => setActiveTab("news")}
                >News</button>
            </div>

            <div className="chatbot-panel-content">
                {activeTab === "home" && (
                    <div className="home-tab">
                        <h3>Hello there 👋</h3>
                        <p>How can we help you today?</p>

                        <div className="recent-message-card">
                            <h4>Recent message</h4>
                            <div className="recent-message-preview">
                                <p>I’m here and ready to assist you. How can I help?</p>
                            </div>
                        </div>

                        <button
                            className="ask-btn"
                            onClick={() => {
                                setActiveTab("messages");
                                setTimeout(() => {
                                    inputRef.current?.focus();
                                }, 100);
                            }}
                        >
                            Ask a question
                        </button>

                    </div>

                )}


                <div className="home-tab">
                    <h3>Hello there 👋</h3>
                    <p>How can we help you today?</p>

                    <div className="recent-message-card">
                        <h4>Recent message</h4>
                        <div className="recent-message-preview">
                            <p>I’m here and ready to assist you. How can I help?</p>
                        </div>
                    </div>

                    <button
                        className="ask-btn"
                        onClick={() => {
                            setActiveTab("messages");
                            setTimeout(() => {
                                inputRef.current?.focus();
                            }, 100);
                        }}
                    >
                        Ask a question
                    </button>
                </div>


                {activeTab === "messages" && (
                    <div className="messages-tab">
                        <div className="messages-list">
                            {messages.map((msg, idx) => (
                                <div
                                    key={idx}
                                    className={`message-bubble ${msg.sender}`}
                                >
                                    {msg.text}
                                </div>
                            ))}
                            {isTyping && (
                                <div className="message-bubble bot typing">
                                    <span className="dot"></span>
                                    <span className="dot"></span>
                                    <span className="dot"></span>
                                </div>
                            )}
                        </div>

                        {/* messages input */}
                        <div className="messages-input">
                            <input
                                type="text"
                                placeholder="Ask a question..."
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                                ref={inputRef}
                            />
                            <button onClick={handleSend}>Send</button>
                        </div>

                        {/* privacy note goes AFTER the input block */}
                        <div className="privacy-note">
                            By chatting with us, you agree to the monitoring and recording of this chat to deliver our services and processing of your personal data in accordance with our Privacy Policy.
                        </div>
                    </div>

                )}




                {activeTab === "help" && (
                    <div className="help-tab">
                        <p>Search help articles here.</p>
                    </div>
                )}
                {activeTab === "news" && (
                    <div className="news-tab">
                        <p>Latest product updates.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChatbotPanel;

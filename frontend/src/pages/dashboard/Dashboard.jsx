import './Dashboard.css';
import Navbar from '../../components/navbar/Navbar';
import { useParams } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import axios from "axios";

export default function Dashboard() {
  const params = useParams();
  const name = params.name;
  const [isVisible, setIsVisible] = useState(true);
  const [showChatPrompt, setShowChatPrompt] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);

  const chatHistoryRef = useRef(null);

  useEffect(() => {
    if (chatHistoryRef.current) {
      chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
    }
  }, [chatHistory]);

  useEffect(() => {
    // Timer for hiding welcome message and showing chat prompt box
    const timer = setTimeout(() => {
      setIsVisible(false);
      setShowChatPrompt(true);
    }, 3500); // 3.5 seconds

    return () => clearTimeout(timer);
  }, []);

  const handlePromptSubmit = (e) => {
    e.preventDefault();
    const promptInput = e.target.elements.prompt.value.trim();
  
    if (!promptInput) return; // Don't process empty messages
  
    // First add the user's message
    setChatHistory((prevHistory) => [
      ...prevHistory,
      { author: "User", message: promptInput }
    ]);
  
    // Clear the input form
    e.target.reset();
  
    // Then make the API call
    axios.post('http://localhost:5000/api/', {
      question: promptInput
    })
      .then(function (response) {
        setChatHistory((prevHistory) => [
          ...prevHistory,
          { author: "Pookie", message: response.data.answer.content }
        ]);
      })
      .catch(function (error) {
        console.log(error);
        // Optionally add error message to chat
        setChatHistory((prevHistory) => [
          ...prevHistory,
          { author: "System", message: "Sorry, there was an error processing your message." }
        ]);
      });
  };

  return (
    <>
      <Navbar />
      <section className="hero-ribbon-section">
        <div className='chatbox'>
          {isVisible && (
            <div className="chatbox-title blinking">
              Welcome {name}
            </div>
          )}

          {showChatPrompt && (
            <div className="chat-prompt-box">
              <div className="chat-history" ref={chatHistoryRef}
              style={{
                maxHeight: '400px',
                overflowY: 'auto',
                scrollBehavior: 'smooth'
              }}              >
                {chatHistory.length > 0 ? (
                  chatHistory.map((message, index) => (
                    <div key={index} className="chat-message"> <b>{message.author}:</b> {message.message}</div>
                  ))
                ) : (
                  <div className="chat-placeholder">What can I do for you?</div>
                )}
              </div>

              <form onSubmit={handlePromptSubmit} className="prompt-form">
                <input
                  type="text"
                  name="prompt"
                  placeholder="Ask your Pookie"
                  required
                  className="prompt-input"
                />
                <button type="submit" className="prompt-submit">Send</button>
              </form>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

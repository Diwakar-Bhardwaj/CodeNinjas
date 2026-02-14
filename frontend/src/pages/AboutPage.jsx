import React, { useState } from "react";
import "./AboutPage.css";
import { useNavigate } from "react-router-dom";

const AboutPage = () => {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const [showSafety, setShowSafety] = useState(false); // Safety Modal control

  const toggleMode = () => setDarkMode(!darkMode);

  return (
    <div className={darkMode ? "about-wrapper dark" : "about-wrapper"}>
      {/* Navigation */}
      <nav className="nav-bar">
        <button className="btn-secondary" onClick={() => navigate("/")}>← Home</button>
        <button className="theme-pill" onClick={toggleMode}>
          {darkMode ? "Light ✨" : "Dark 🌙"}
        </button>
      </nav>

      {/* Hero Section */}
      <header className="hero-minimal">
        <h1>Share <span className="accent">Circle</span></h1>
        <p>Building trust, one borrow at a time.</p>
      </header>

      {/* Mission Section */}
      <div className="section-label">Our Philosophy</div>
      <section className="values-grid">
        <div className="value-card pastel-green">
          <div className="val-icon">🌿</div>
          <h3>Eco-Friendly</h3>
          <p>Buying less means less waste. Sharing is caring for our planet's future.</p>
        </div>
        <div className="value-card pastel-blue">
          <div className="val-icon">💰</div>
          <h3>Save Money</h3>
          <p>Don't buy it for one-time use. Borrow it from a neighbor and save big.</p>
        </div>
        <div className="value-card pastel-peach">
          <div className="val-icon">🤝</div>
          <h3>Community</h3>
          <p>Connect with amazing people living right next door to you.</p>
        </div>
      </section>

      {/* Community Guidelines */}
      <section className="guidelines-clean">
        <div className="section-label">The Rules</div>
        <h2>How we roll</h2>
        <div className="rule-list">
          <div className="rule-item">
            <span className="rule-icon">📦</span>
            <div>
              <h4>Respect the Item</h4>
              <p>Treat borrowed things better than your own. Return them clean.</p>
            </div>
          </div>
          <div className="rule-item">
            <span className="rule-icon">🕒</span>
            <div>
              <h4>Be Punctual</h4>
              <p>Neighbors rely on you. Always return items on the agreed time.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section className="support-section">
        <div className="section-label">Need Help?</div>
        <h2>We've got your back</h2>
        <div className="support-container">
          <div className="support-card">
            <div className="support-icon">🚩</div>
            <h4>Report a Problem</h4>
            <p>Kisine rule toda? Humein batayein, hum handle karenge.</p>
            <button className="btn-outline" onClick={() => navigate("/help")}>
              Raise a Ticket
            </button>
          </div>

          <div className="support-card">
            <div className="support-icon">🛡️</div>
            <h4>Safety Guide</h4>
            <p>Essential tips for a safe and happy sharing experience.</p>
            <button className="btn-text" onClick={() => setShowSafety(true)}>
              Read Safety Guide
            </button>
          </div>
        </div>
      </section>

      {/* Footer Call to Action */}
      <footer className="action-footer text-center mt-20">
        <button className="btn-primary" onClick={() => navigate("/upload")}>
          Start Sharing Now
        </button>
      </footer>

      {/* --- SAFETY MODAL --- */}
      {showSafety && (
        <div className="modal-overlay" onClick={() => setShowSafety(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>🛡️ Safety Checklist</h3>
            <ul className="safety-list">
              <li><b>Meet in Public:</b> Exchange items in well-lit, busy areas.</li>
              <li><b>Verify Quality:</b> Check the item thoroughly before taking it.</li>
              <li><b>Keep it on App:</b> Always use Share Circle chat for records.</li>
              <li><b>Fair Usage:</b> Discuss any fuel/cleaning requirements upfront.</li>
            </ul>
            <button className="btn-primary" onClick={() => setShowSafety(false)}>Got it, Thanks!</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AboutPage;
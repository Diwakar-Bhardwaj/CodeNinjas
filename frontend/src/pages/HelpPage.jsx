import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./HelpPage.css";

const HelpPage = () => {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // Yahan tum apna backend logic ya email logic daal sakte ho
  };

  return (
    <div className="help-container">
      <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>
      
      <div className="help-content">
        {/* Left Side: Form */}
        <div className="form-section">
          <h1>Raise a <span className="highlight">Ticket</span></h1>
          <p>Kisine rule toda ya koi problem hai? Humein batayein, hum handle karenge.</p>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="complaint-form">
              <div className="input-group">
                <label>Problem Type</label>
                <select required>
                  <option value="">Select an issue</option>
                  <option value="damage">Damaged Item</option>
                  <option value="return">Late/No Return</option>
                  <option value="fake">Fake Listing</option>
                  <option value="behavior">Bad Behavior</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="input-group">
                <label>Your Email</label>
                <input type="email" placeholder="so we can reach you" required />
              </div>

              <div className="input-group">
                <label>Description</label>
                <textarea rows="5" placeholder="Explain what happened..." required></textarea>
              </div>

              <button type="submit" className="submit-btn">Send Report</button>
            </form>
          ) : (
            <div className="success-message">
              <div className="check-icon">✅</div>
              <h3>Report Submitted!</h3>
              <p>Humari team 24-48 hours mein action legi. Shanti banaye rakhein.</p>
              <button onClick={() => navigate("/")} className="btn-text">Go to Home</button>
            </div>
          )}
        </div>

        {/* Right Side: Quick Info */}
        <div className="info-section">
          <div className="info-card pastel-yellow">
            <h4>Pehle ye check karein:</h4>
            <ul>
              <li>Kya aapne us member se chat pe baat ki?</li>
              <li>Kya aapke paas transaction/item ki photos hain?</li>
            </ul>
          </div>
          <div className="info-card pastel-purple">
            <h4>Emergency?</h4>
            <p>Direct contact: <br/> <b>support@sharecircle.com</b></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpPage;
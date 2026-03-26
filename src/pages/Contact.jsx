import React, { useState } from 'react';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('${import.meta.env.VITE_API_URL}/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Thanks for reaching out! Your message has been saved and we will get back to you soon.");
        setFormData({ name: '', email: '', message: '' }); // Clear the form
      } else {
        alert('Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to connect to the server.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-page">
      <div className="contact-header">
        <h2>Get In Touch</h2>
        <div className="divider"></div>
        <p>Have a question about our classes? Drop us a line!</p>
      </div>

      <div className="contact-container">
        {/* Left Side: Contact Info */}
        <div className="contact-info">
          <h3>Contact Information</h3>
          <div className="info-item">
            <FaMapMarkerAlt className="info-icon" />
            <div>
              <h4>Our Studio</h4>
              <p>H 12, Chouksey Nagar, DIG Bunglow<br/>Bhopal, Madhya Pradesh 462016</p>
            </div>
          </div>
          
          <div className="info-item">
            <FaPhoneAlt className="info-icon" />
            <div>
              <h4>Call Us</h4>
              <p>+91 76970 02309</p>
            </div>
          </div>

          <div className="info-item">
            <FaEnvelope className="info-icon" />
            <div>
              <h4>Email Us</h4>
              <p>shreebanwarircc@gmail.com</p>
            </div>
          </div>

          {/* Placeholder for a Google Map */}
          <div className="map-placeholder">
            <p></p>
          </div>
        </div>

        {/* Right Side: Contact Form */}
        <div className="contact-form-wrapper">
          <h3>Send a Message</h3>
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="input-group">
              <label>Your Name</label>
              <input 
                type="text" 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                required 
                placeholder="Name" 
              />
            </div>
            <div className="input-group">
              <label>Email Address</label>
              <input 
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                required 
                placeholder="Email" 
              />
            </div>
            <div className="input-group">
              <label>Your Message</label>
              <textarea 
                name="message" 
                rows="5" 
                value={formData.message} 
                onChange={handleChange} 
                required 
                placeholder="How can we help you?"
              ></textarea>
            </div>
            <button type="submit" className="cta-button full-width" disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
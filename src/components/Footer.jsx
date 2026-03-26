import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaGoogle, FaInstagram, FaPhone, FaWhatsapp } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Rasoi Cooking Classes</h3>
          <p>Bringing the authentic taste to your kitchen.</p>
        </div>
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/courses">Courses</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Connect With Us</h3>
          <div className="social-icons">
            <a href="https://www.facebook.com/rcc31bpl/"><FaFacebook /></a>
            <a href="https://www.instagram.com/rcc_bhopal/"><FaInstagram /></a>
            <a href="https://share.google/iWa2f6fETwflvsol2"><FaGoogle /></a>
            <a href="tel:+917697002309"><FaPhone/></a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Rasoi Cooking Classes. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
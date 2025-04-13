import React from "react";
import { Facebook, Twitter, Linkedin, Instagram, Clock } from "lucide-react";
import "./Footer.css"; // Import the new CSS file

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-grid">
        <div>
          <h4 className="footer-heading">Follow Us</h4>
          <div className="footer-social-icons">
            <a href="https://www.facebook.com" className="footer-social-icon">
              <Facebook />
            </a>
            <a href="https://www.twitter.com" className="footer-social-icon">
              <Twitter />
            </a>
            <a href="https://www.linkedin.com" className="footer-social-icon">
              <Linkedin />
            </a>
            <a
              href="https://www.instagram.com/ajanicenter?utm_source=qr&igsh=bGh2dHR6OWU4MGps"
              className="footer-social-icon"
            >
              <Instagram />
            </a>
          </div>
        </div>

        <div>
          <h4 className="footer-heading">
            <Clock className="footer-clock-icon" size={20} />
            Business Hours
          </h4>
          <p className="footer-hours">
            Monday - Friday: 9:00 AM - 5:00 PM
            <br />
            Saturday: 10:00 AM - 3:00 PM
            <br />
            Sunday: Closed
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

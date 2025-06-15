import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} Govind Gothi</p>
      
      <div className="footer-icons">
        <a href="https://www.linkedin.com/in/your-linkedin" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-linkedin"></i>
        </a>
        <a href="https://github.com/your-github" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-github"></i>
        </a>
        <a href="mailto:your.email@example.com">
          <i className="fas fa-envelope"></i>
        </a>
      </div>

      <p className="footer-quote">"Code is like humor. When you have to explain it, it’s bad." – Cory House</p>
    </footer>
  );
};

export default Footer;

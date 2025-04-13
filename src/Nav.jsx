import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import "./Navigation.css"; // Import the new CSS file

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="navigation-header">
      <nav className="navigation-container">
        <div className="logo-container">
          <img src="/logo.jpeg" alt="Logo" className="logo" />
        </div>

        <button className="menu-button" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>
    </header>
  );
};

export default Navigation;

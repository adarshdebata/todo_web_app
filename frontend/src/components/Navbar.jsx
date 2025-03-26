import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FaBars, FaTimes, FaSignOutAlt } from "react-icons/fa";

// Navbar container
const Header = styled.header`
  width: 100%;
  padding: 0.8rem 2rem;
  background: rgb(5, 0, 37);
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 2px 4px rgb(5, 0, 37);
  position: sticky;
  top: 0;
  z-index: 100;
`;

// Left section (Menu button)
const LeftSection = styled.div`
  display: flex;
  align-items: center;
`;

// Center section (Logo)
const CenterSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
`;

// Right section (Logout button)
const RightSection = styled.div`
  display: flex;
  align-items: center;
`;

// TaskIt logo
const Logo = styled(Link)`
  font-size: 2rem;
  font-weight: 700;
  text-decoration: none;
  color: white;
  display: flex;
  align-items: center;
  gap: 3px;

  span:first-child {
    color: rgb(255, 87, 87);
    font-size: 2.5rem;
  }
  span.middle {
    color: white;
    font-size: 2rem;
    font-weight: 500;
  }

  @media (max-width: 768px) {
    font-size: 1.5rem;
    span:first-child {
      font-size: 2rem;
    }
    span.middle {
      font-size: 1.5rem;
    }
  }
`;

// Regular navigation links (hidden on mobile)
const NavLinks = styled.div`
  display: flex;
  gap: 2rem;

  a {
    text-decoration: none;
    font-size: 1rem;
    color: #ffffff;
    font-weight: 500;
    &:hover {
      color: rgb(255, 87, 87);
    }
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

// Menu Button (Visible only on mobile)
const MenuButton = styled.button`
  background: transparent;
  border: none;
  color: white;
  font-size: 1.8rem;
  cursor: pointer;

  @media (min-width: 769px) {
    display: none;
  }
`;

// Sidebar Menu for Mobile
const Sidebar = styled.div`
  position: fixed;
  top: 0;
  left: ${({ open }) => (open ? "0" : "-100%")};
  width: 250px;
  height: 100vh;
  background: rgb(5, 0, 37);
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: left 0.3s ease-in-out;
  box-shadow: 2px 0 5px rgba(255, 87, 87, 0.2);
  z-index: 200;

  a {
    text-decoration: none;
    font-size: 1.2rem;
    color: #ffffff;
    margin: 1rem 0;
    &:hover {
      color: rgb(255, 87, 87);
    }
  }
`;

// Close Button inside Sidebar
const CloseButton = styled.button`
  background: transparent;
  border: none;
  color: white;
  font-size: 1.8rem;
  position: absolute;
  top: 10px;
  right: 15px;
  cursor: pointer;
`;

// Logout Button (Always Visible)
const LogoutButton = styled.button`
  background: transparent;
  border: none;
  color: #ffffff;
  font-size: 1.2rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  &:hover {
    color: rgb(255, 87, 87);
  }
`;

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <Header>
      {/* Left - Menu Icon */}
      <LeftSection>
        <MenuButton onClick={() => setMenuOpen(true)}>
          <FaBars />
        </MenuButton>
      </LeftSection>

      {/* Center - Logo */}
      <CenterSection>
        <Logo to="/">
          <span>T</span>
          <span className="middle">ASK IT</span>
        </Logo>
      </CenterSection>

      {/* Right - Logout Button */}
      <RightSection>
        <LogoutButton onClick={handleLogout}>
          <FaSignOutAlt /> Logout
        </LogoutButton>
      </RightSection>

      {/* Sidebar Menu (Mobile) */}
      {menuOpen && (
        <Sidebar open={menuOpen}>
          <CloseButton onClick={() => setMenuOpen(false)}>
            <FaTimes />
          </CloseButton>
          <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/about" onClick={() => setMenuOpen(false)}>About</Link>
          <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
        </Sidebar>
      )}
    </Header>
  );
};

export default Navbar;
    
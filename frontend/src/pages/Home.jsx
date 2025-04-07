import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';

// Main container
const HomeContainer = styled.div`
  width: 100vw;         
  height: 100vh;
  position: relative;
  overflow: hidden;
  background: rgb(7, 0, 55);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// Sticky Header
const Header = styled.header`
  width: 100%;
  padding: 1rem 2rem;
  background: rgb(5, 0, 37);
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 2px 4px rgb(5, 0, 37);

  
`;

// Logo
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
`;

// Navigation Links
const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
`;

// Styled NavLink with Active Highlight
const NavLink = styled(Link)`
  text-decoration: none;
  font-size: 1rem;
  color: ${({ active }) => (active ? 'rgb(255, 87, 87)' : '#ffffff')};
  font-weight: ${({ active }) => (active ? '700' : '500')};
  border-bottom: ${({ active }) => (active ? '2px solid rgb(255, 87, 87)' : 'none')};
  padding-bottom: 3px;
  transition: all 0.3s ease;

  &:hover {
    color: rgb(255, 87, 87);
  }
`;

// Button Group
const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
`;

// Styled Buttons
const StyledLink = styled(Link)`
  padding: 0.8rem 1.5rem;
  border-radius: 5px;
  font-weight: 700;
  text-decoration: none;
  border: 2px solid rgb(255, 87, 87);
  transition: all 0.3s ease;
`;

const LoginButton = styled(StyledLink)`
  background: rgb(255, 87, 87);
  color: rgb(7, 0, 55);

  &:hover {
    color: rgb(255, 87, 87);
    background: transparent;
  }
`;

const RegisterButton = styled(StyledLink)`
  background: transparent;
  color: rgb(255, 87, 87);

  &:hover {
    color: rgb(7, 0, 55);
    background: rgb(255, 87, 87);
  }
`;

// Content Wrapper
const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0 2rem;
  color: white;
`;

// Welcome Text Animation
const WelcomeText = styled(motion.h1)`
  font-size: 2.5rem;
  font-weight: 600;
  color: white;
  margin-bottom: 1rem;
`;

// Subtext
const SubText = styled(motion.p)`
  font-size: 1.2rem;
  max-width: 600px;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 2rem;
`;

const Home = () => {
  const location = useLocation();

  return (
    <HomeContainer>
      <Header>
        {/* Logo */}
        <Logo to="/">
          <span>T</span>
          <span className="middle">ASK IT</span>
        </Logo>

        {/* Navigation Links */}
        <NavLinks>
          <NavLink to="/" active={location.pathname === "/"}>
            Home
          </NavLink>
          <NavLink to="/about" active={location.pathname === "/about"}>
            About Dev
          </NavLink>
          <NavLink to="/contact" active={location.pathname === "/contact"}>
            Contact
          </NavLink>
        </NavLinks>

        {/* Login & Register Buttons */}
        <ButtonGroup>
          <LoginButton to="/login">Login</LoginButton>
          <RegisterButton to="/register">Register</RegisterButton>
        </ButtonGroup>
      </Header>

      {/* Welcome Content */}
      <ContentWrapper>
        <WelcomeText
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Welcome to Task It
        </WelcomeText>
        <SubText
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Your personal productivity assistant. Organize tasks, set goals, and achieve more!
        </SubText>
        <ButtonGroup>
          <LoginButton to="/login">Get Started</LoginButton>
          <RegisterButton to="/register">Join Now</RegisterButton>
        </ButtonGroup>
      </ContentWrapper>
    </HomeContainer>
  );
};

export default Home;

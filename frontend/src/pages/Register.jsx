// src/pages/Register.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaUserPlus } from 'react-icons/fa';

const RegisterContainer = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;
  background: rgb(7, 0, 55);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.header`
  width: 100%;
  padding: 0rem 2rem;
  background: rgb(5, 0, 37);
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 4px rgb(5, 0, 37);
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  gap: 3px;
  font-size: 2.2rem;
  font-weight: 700;
  text-decoration: none;
  transition: all 0.3s ease-in-out;
  &:hover {
    letter-spacing: 3px;
    filter: drop-shadow(0 0 10px rgba(255, 87, 87, 0.7));
  }
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

const FormWrapper = styled.div`
  position: relative;
  z-index: 1;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 0 1rem;
  color: white;
`;

const IconWrapper = styled.div`
  font-size: 3rem;
  color: rgb(255, 87, 87);
  margin-bottom: 1rem;
`;

const Form = styled(motion.form)`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
  max-width: 400px;
  background: rgba(255, 255, 255, 0.1);
  padding: 2rem;
  border-radius: 10px;
  backdrop-filter: blur(10px);
  position: relative;
`;

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const Label = styled(motion.label)`
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(255, 255, 255, 0.7);
  font-size: 1rem;
  pointer-events: none;
  transition: all 0.3s ease;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  background: rgba(255, 255, 255, 0.06);
  color: white;
  outline: none;

  &:focus {
    outline: 2px solid rgb(255, 87, 87);
  }

  &:focus + ${Label},
  &:not(:placeholder-shown) + ${Label} {
    top: 10px;
    font-size: 0.9rem;
    color: rgb(255, 87, 87);
  }
`;

const Button = styled(motion.button)`
  padding: 0.8rem 1rem;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: 700;
  background: rgb(255, 87, 87);
  color: rgb(7, 0, 55);
  cursor: pointer;
  &:hover {
    color: rgb(255, 87, 87);
    background: transparent;
    border: 2px solid rgb(255, 87, 87);
  }
`;

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '', confirmPassword: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    try {
      const response = await fetch('http://localhost:8080/api/todos/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email, password: formData.password }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }
      alert('Registration successful! Please login.');

      // Clear form fields after successful registration
      setFormData({ email: '', password: '', confirmPassword: '' });

      navigate('/login');
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <RegisterContainer>
      <Header>
        <Logo to="/">
          <span>T</span>
          <span className="middle">ASK IT</span>
        </Logo>
      </Header>

      <FormWrapper>
        <IconWrapper>
          <FaUserPlus />
        </IconWrapper>

        <Form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <InputWrapper>
            <Input
              type="email"
              placeholder=" "
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
            <Label>Email</Label>
          </InputWrapper>

          <InputWrapper>
            <Input
              type="password"
              placeholder=" "
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
            <Label>Password</Label>
          </InputWrapper>

          <InputWrapper>
            <Input
              type="password"
              placeholder=" "
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              required
            />
            <Label>Confirm Password</Label>
          </InputWrapper>

          <Button
            type="submit"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Register
          </Button>
        </Form>

        <p style={{ marginTop: '1rem' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: '#fda085' }}>
            Login
          </Link>
        </p>
      </FormWrapper>
    </RegisterContainer>
  );
};

export default Register;

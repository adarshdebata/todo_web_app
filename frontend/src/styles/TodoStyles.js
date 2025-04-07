// src/styles/TodoStyles.js
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// Main container with dark background
export const TodoContainer = styled.div`
  width: 100vw;
  min-height: 100vh;
  background: rgb(7, 0, 55);
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

// Content wrapper for todo form and list
export const ContentWrapper = styled.div`
  flex: 1;
  padding: 2rem;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  .error-message {
    background-color: rgba(255, 87, 87, 0.2);
    border: 1px solid rgb(255, 87, 87);
    padding: 10px;
    border-radius: 5px;
    margin-bottom: 20px;
    width: 100%;
    max-width: 600px;
    text-align: center;
  }
`;

// Sort selection dropdown with optimized option styling
export const SortSelect = styled.select`
  padding: 0.5rem 1rem;
  margin-bottom: 1rem;
  border-radius: 5px;
  border: none;
  outline: none;
  font-size: 1rem;
  background: rgba(255, 255, 255, 0.06);
  color: white;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-repeat: no-repeat;
  background-position: right 10px center;
  cursor: pointer;
  transition: all 0.2s ease;
  &:focus {
    outline: 2px solid rgb(255, 87, 87);
  }
  option {
    background: rgba(7, 0, 55, 0.9);
    color: white;
  }
`;

// Form for creating a new todo
export const TodoForm = styled(motion.form)`
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
  background: rgba(255, 255, 255, 0.05);
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export const FormRow = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  width: 100%;
`;

export const Input = styled.input`
  flex: 1;
  min-width: 200px;
  padding: 0.8rem 1rem;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  background: rgba(255, 255, 255, 0.06);
  color: white;
  outline: none;
  transition: all 0.2s ease;
  &:focus {
    outline: 2px solid rgb(255, 87, 87);
    background: rgba(255, 255, 255, 0.1);
  }
  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }
`;

export const Select = styled.select`
  flex: 1;
  min-width: 150px;
  padding: 0.8rem 1rem;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  background: rgba(255, 255, 255, 0.06);
  color: white;
  outline: none;
  cursor: pointer;
  transition: all 0.2s ease;
  &:focus {
    outline: 2px solid rgb(255, 87, 87);
  }
  option {
    background: rgba(7, 0, 55, 0.9);
    color: white;
  }
`;

export const AddButton = styled(motion.button)`
  padding: 0.8rem 1rem;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: 700;
  background: rgb(255, 87, 87);
  color: rgb(7, 0, 55);
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: rgb(255, 107, 107);
  }
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

// Todo list and item styling
export const TodoList = styled.ul`
  width: 100%;
  max-width: 600px;
  list-style: none;
  padding: 0;
`;

// Todo item with priority-based border
export const TodoItem = styled(motion.li)`
  background: rgba(255, 255, 255, 0.1);
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  border-left: 4px solid ${({ priority }) => {
    switch (priority) {
      case 'Highest': return 'rgb(255, 87, 87)';
      case 'High': return 'rgb(255, 165, 0)';
      case 'Mid': return 'rgb(255, 255, 0)';
      case 'Low': return 'rgb(0, 255, 0)';
      default: return 'rgb(128, 128, 128)';
    }
  }};
  transition: all 0.2s ease;
  
  &:hover {
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.1);
    transform: translateY(-2px);
  }
`;

export const TodoHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
`;

export const TodoLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
  
  input[type="checkbox"] {
    width: 18px;
    height: 18px;
    cursor: pointer;
  }
`;

// Updated TodoTitle uses the completed prop to conditionally add strike-through
export const TodoTitle = styled.span`
  font-weight: bold;
  text-decoration: ${({ completed }) => (completed ? 'line-through' : 'none')};
  opacity: ${({ completed }) => (completed ? 0.7 : 1)};
`;

export const CreatedDate = styled.span`
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.6);
  margin-top: -5px;
`;

export const DeadlineInfo = styled.div`
  font-size: 0.9rem;
  margin-top: 5px;
  color: ${({ days }) => {
    if (days === null) return 'rgba(255, 255, 255, 0.8)';
    if (days < 0) return 'rgb(255, 87, 87)';
    if (days === 0) return 'rgb(255, 165, 0)';
    if (days <= 2) return 'rgb(255, 255, 0)';
    return 'rgba(255, 255, 255, 0.8)';
  }};
`;

export const TodoActions = styled.div`
  display: flex;
  gap: 0.8rem;
  
  button {
    background: transparent;
    border: none;
    color: #ffffff;
    cursor: pointer;
    padding: 5px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
    
    &:hover {
      color: rgb(255, 87, 87);
      background: rgba(255, 255, 255, 0.1);
    }
  }
`;

export const EditForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  
  button {
    padding: 8px 12px;
    border: none;
    border-radius: 4px;
    background: rgba(255, 255, 255, 0.2);
    color: white;
    cursor: pointer;
    font-size: 0.9rem;
    transition: all 0.2s ease;
    
    &:hover {
      background: rgba(255, 87, 87, 0.7);
    }
    
    &:first-child {
      background: rgba(255, 87, 87, 0.7);
      
      &:hover {
        background: rgb(255, 87, 87);
      }
    }
  }
`;

export const PriorityBadge = styled.span`
  font-size: 0.75rem;
  padding: 2px 8px;
  border-radius: 10px;
  font-weight: 500;
  background-color: ${({ priority }) => {
    switch (priority) {
      case 'Highest': return 'rgba(255, 0, 0, 0.7)';
      case 'High': return 'rgb(255, 123, 0)';
      case 'Mid': return 'rgba(255, 255, 0, 0.84)';
      case 'Low': return 'rgba(0, 162, 255, 0.3)';
      default: return 'rgba(128, 128, 128, 0.5)';
    }
  }};
  color: ${({ priority }) => {
    switch (priority) {
      case 'Highest': return 'white';
      case 'High': return 'white';
      case 'Mid': return 'black';
      case 'Low': return 'white';
      default: return 'white';
    }
  }};
`;

// Optional: Header elements preserved for future use
export const Header = styled.header`
  width: 100%;
  padding: 0.5rem 2rem;
  background: rgb(5, 0, 37);
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 2px 4px rgb(5, 0, 37);
`;

export const Logo = styled(Link)`
  font-size: 2rem;
  font-weight: 700;
  text-decoration: none;
  color: white;
  display: flex;
  align-items: center;
  gap: 3px;
  transition: all 0.3s ease-in-out;
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

export const NavLinks = styled.div`
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
`;

export const LogoutButton = styled(motion.button)`
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
// src/pages/ToDo.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaSignOutAlt, FaEdit, FaTrash, FaInfoCircle } from 'react-icons/fa';
import Navbar from "../components/Navbar";

// Main container with dark background
const TodoContainer = styled.div`
  width: 100vw;
  min-height: 100vh;
  background: rgb(7, 0, 55);
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  
`;

// Sticky Header with logo, nav links, and logout button
const Header = styled.header`
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

const Logo = styled(Link)`
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
`;

const LogoutButton = styled(motion.button)`
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

// Content wrapper for todo form and list
const ContentWrapper = styled.div`
  flex: 1;
  padding: 2rem;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// Sort selection dropdown with optimized option styling
const SortSelect = styled.select`
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
  &:focus {
    outline: 2px solid rgb(255, 87, 87);
  }
  option {
    background: rgba(7, 0, 55, 0.47);
    color: white;
  }
  option:checked,
  option:active {
    background-color: rgb(255, 87, 87);
  }
`;

// Form for creating a new todo
const TodoForm = styled(motion.form)`
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const FormRow = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  padding: 0.8rem 1rem;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  background: rgba(255, 255, 255, 0.06);
  color: white;
  outline: none;
  &:focus {
    outline: 2px solid rgb(255, 87, 87);
  }
`;

const AddButton = styled(motion.button)`
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

// Todo list and item styling
const TodoList = styled.ul`
  width: 100%;
  max-width: 600px;
  list-style: none;
  padding: 0;
`;

const TodoItem = styled(motion.li)`
  background: rgba(255, 255, 255, 0.1);
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const TodoHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TodoLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

// Updated TodoTitle uses the completed prop to conditionally add strike-through
const TodoTitle = styled.span`
  font-weight: bold;
  text-decoration: ${({ completed }) => (completed ? 'line-through' : 'none')};
`;

const CreatedDate = styled.span`
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.8);
`;

const TodoActions = styled.div`
  display: flex;
  gap: 0.5rem;
  button {
    background: transparent;
    border: none;
    color: #ffffff;
    cursor: pointer;
    &:hover {
      color: rgb(255, 87, 87);
    }
  }
`;

const EditForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ToDo = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({
    title: '',
    description: '',
    completed: false,
  });
  const [sortOrder, setSortOrder] = useState('newest'); // 'newest', 'oldest', 'alphabetical'
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({
    title: '',
    description: '',
    completed: false,
  });
  const [expanded, setExpanded] = useState({}); // Toggle description for each todo

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  // Helper function to wrap fetch calls and log out if unauthorized
  const fetchWithAuth = async (url, options = {}) => {
    const response = await fetch(url, options);
    if (response.status === 401) {
      alert("Session expired. Please login again.");
      handleLogout();
      return null;
    }
    return response;
  };

  const fetchTodos = async () => {
    try {
      const response = await fetchWithAuth('http://localhost:8080/api/todos', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response) return;
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch todos');
      }
      let todosData = data.data;
      // Sorting logic
      if (sortOrder === 'newest') {
        todosData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      } else if (sortOrder === 'oldest') {
        todosData.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      } else if (sortOrder === 'alphabetical') {
        todosData.sort((a, b) => a.title.localeCompare(b.title));
      }
      setTodos(todosData);
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate('/login');
    } else {
      fetchTodos();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, sortOrder]);

  const handleAddTodo = async (e) => {
    e.preventDefault();
    if (!newTodo.title.trim() || !newTodo.description.trim()) return;
    try {
      const response = await fetchWithAuth('http://localhost:8080/api/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newTodo),
      });
      if (!response) return;
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to add todo');
      }
      setNewTodo({ title: '', description: '', completed: false });
      fetchTodos();
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      const response = await fetchWithAuth(`http://localhost:8080/api/todos/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response) return;
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to delete todo');
      }
      fetchTodos();
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  const handleEditTodo = (todo) => {
    setEditingId(todo._id);
    setEditData({
      title: todo.title,
      description: todo.description,
      completed: todo.completed,
    });
  };

  const handleUpdateTodo = async (id) => {
    try {
      const response = await fetchWithAuth(`http://localhost:8080/api/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editData),
      });
      if (!response) return;
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to update todo');
      }
      setEditingId(null);
      fetchTodos();
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  // When not in edit mode, the checkbox cannot be unchecked once checked.
  const handleToggleCompleted = async (id, currentCompleted) => {
    if (currentCompleted) return; // Prevent unchecking outside edit mode
    try {
      const response = await fetchWithAuth(`http://localhost:8080/api/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ completed: !currentCompleted }),
      });
      if (!response) return;
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to update status');
      }
      fetchTodos();
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  const toggleDescription = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <TodoContainer>
      <Navbar/>
      <ContentWrapper>
        <SortSelect value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="alphabetical">Alphabetical</option>
        </SortSelect>

        <TodoForm
          onSubmit={handleAddTodo}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <FormRow>
            <Input
              type="text"
              placeholder="Title"
              value={newTodo.title}
              onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
            />
            <Input
              type="text"
              placeholder="Description"
              value={newTodo.description}
              onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
            />
          </FormRow>
          <AddButton whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} type="submit">
            Add Task
          </AddButton>
        </TodoForm>

        <TodoList>
          {todos.map((todo) => (
            <TodoItem key={todo._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              {editingId === todo._id ? (
                <EditForm>
                  <Input
                    type="text"
                    value={editData.title}
                    onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                  />
                  <Input
                    type="text"
                    value={editData.description}
                    onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                  />
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    Completed:
                    <input
                      type="checkbox"
                      checked={editData.completed}
                      onChange={(e) => setEditData({ ...editData, completed: e.target.checked })}
                    />
                  </label>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button onClick={() => handleUpdateTodo(todo._id)}>Save</button>
                    <button onClick={() => setEditingId(null)}>Cancel</button>
                  </div>
                </EditForm>
              ) : (
                <>
                  <TodoHeader>
                    <TodoLeft>
                      <input
                        type="checkbox"
                        checked={todo.completed}
                        disabled={todo.completed} // Disable if completed so it can't be unchecked outside edit mode
                        onChange={() => handleToggleCompleted(todo._id, todo.completed)}
                      />
                      <TodoTitle completed={todo.completed}>{todo.title}</TodoTitle>
                      <CreatedDate>{new Date(todo.createdAt).toLocaleString()}</CreatedDate>
                    </TodoLeft>
                    <TodoActions>
                      <button onClick={() => handleEditTodo(todo)}>
                        <FaEdit />
                      </button>
                      <button onClick={() => handleDeleteTodo(todo._id)}>
                        <FaTrash />
                      </button>
                      <button onClick={() => toggleDescription(todo._id)}>
                        <FaInfoCircle />
                      </button>
                    </TodoActions>
                  </TodoHeader>
                  {expanded[todo._id] && <p>{todo.description}</p>}
                </>
              )}
            </TodoItem>
          ))}
        </TodoList>
      </ContentWrapper>
    </TodoContainer>
  );
};

export default ToDo;

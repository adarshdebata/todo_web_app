// src/pages/ToDo.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash, FaInfoCircle } from 'react-icons/fa';
import Navbar from "../components/Navbar";
import { 
  TodoContainer, 
  ContentWrapper, 
  SortSelect,
  TodoForm,
  FormRow,
  Input,
  Select,
  AddButton,
  TodoList,
  TodoItem,
  TodoHeader,
  TodoLeft,
  TodoTitle,
  CreatedDate,
  TodoActions,
  EditForm,
  DeadlineInfo,
  PriorityBadge
} from '../styles/TodoStyles';

// API service
import { fetchTodos, addTodo, updateTodo, deleteTodo } from '../services/todoService';

const ToDo = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({
    title: '',
    description: '',
    completed: false,
    deadline: new Date(Date.now() + 86400000).toISOString().split('T')[0], // Tomorrow
    priority: 'Mid'
  });
  const [sortOrder, setSortOrder] = useState('newest');
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({
    title: '',
    description: '',
    completed: false,
    deadline: '',
    priority: ''
  });
  const [expanded, setExpanded] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Authentication check
  useEffect(() => {
    if (!token) {
      navigate('/login');
    } else {
      loadTodos();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, sortOrder]);

  // Load todos with error handling
  const loadTodos = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchTodos(token);
      if (data) {
        let sortedTodos = [...data];
        // Sorting logic
        switch (sortOrder) {
          case 'newest':
            sortedTodos.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            break;
          case 'oldest':
            sortedTodos.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
            break;
          case 'alphabetical':
            sortedTodos.sort((a, b) => a.title.localeCompare(b.title));
            break;
          case 'deadline':
            sortedTodos.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
            break;
          case 'priority':
            const priorityOrder = { 'Highest': 0, 'High': 1, 'Mid': 2, 'Low': 3 };
            sortedTodos.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
            break;
          default:
            break;
        }
        setTodos(sortedTodos);
      }
    } catch (err) {
      setError(err.message || 'Failed to load todos');
    } finally {
      setIsLoading(false);
    }
  };

  // Form submission handler
  const handleAddTodo = async (e) => {
    e.preventDefault();
    if (!newTodo.title.trim()) return;
    
    setIsLoading(true);
    try {
      await addTodo(token, newTodo);
      setNewTodo({
        title: '',
        description: '',
        completed: false,
        deadline: new Date(Date.now() + 86400000).toISOString().split('T')[0],
        priority: 'Mid'
      });
      await loadTodos();
    } catch (err) {
      setError(err.message || 'Failed to add todo');
    } finally {
      setIsLoading(false);
    }
  };

  // Todo deletion handler
  const handleDeleteTodo = async (id) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;
    
    setIsLoading(true);
    try {
      await deleteTodo(token, id);
      await loadTodos();
    } catch (err) {
      setError(err.message || 'Failed to delete todo');
    } finally {
      setIsLoading(false);
    }
  };

  // Edit mode toggle handler
  const handleEditTodo = (todo) => {
    setEditingId(todo._id);
    setEditData({
      title: todo.title,
      description: todo.description,
      completed: todo.completed,
      deadline: todo.deadline ? new Date(todo.deadline).toISOString().split('T')[0] : '',
      priority: todo.priority || 'Mid'
    });
  };

  // Update todo handler
  const handleUpdateTodo = async (id) => {
    if (!editData.title.trim()) return;
    
    setIsLoading(true);
    try {
      await updateTodo(token, id, editData);
      setEditingId(null);
      await loadTodos();
    } catch (err) {
      setError(err.message || 'Failed to update todo');
    } finally {
      setIsLoading(false);
    }
  };

  // Toggle completion status
  const handleToggleCompleted = async (id, currentCompleted) => {
    if (currentCompleted) return; // Prevent unchecking outside edit mode
    
    setIsLoading(true);
    try {
      await updateTodo(token, id, { completed: true });
      await loadTodos();
    } catch (err) {
      setError(err.message || 'Failed to update status');
    } finally {
      setIsLoading(false);
    }
  };

  // Toggle description visibility
  const toggleDescription = (id) => {
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Calculate remaining days
  const getRemainingDays = (deadline) => {
    if (!deadline) return null;
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const deadlineDate = new Date(deadline);
    deadlineDate.setHours(0, 0, 0, 0);
    
    const diffTime = deadlineDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays;
  };

  return (
    <TodoContainer>
      <Navbar />
      <ContentWrapper>
        {error && <div className="error-message">{error}</div>}
        
        <SortSelect value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="alphabetical">Alphabetical</option>
          <option value="deadline">By Deadline</option>
          <option value="priority">By Priority</option>
        </SortSelect>

        <TodoForm
          onSubmit={handleAddTodo}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <FormRow>
            <Input
              type="text"
              placeholder="Title"
              value={newTodo.title}
              onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
              required
            />
          </FormRow>
          <FormRow>
            <Input
              type="date"
              value={newTodo.deadline}
              onChange={(e) => setNewTodo({ ...newTodo, deadline: e.target.value })}
              required
            />
            <Select
              value={newTodo.priority}
              onChange={(e) => setNewTodo({ ...newTodo, priority: e.target.value })}
              required
            >
              <option value="Highest">Highest</option>
              <option value="High">High</option>
              <option value="Mid">Mid</option>
              <option value="Low">Low</option>
            </Select>
          </FormRow>
          <FormRow>
            <Input
              type="text"
              placeholder="Description"
              value={newTodo.description}
              onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
            />
          </FormRow>
          <AddButton 
            whileHover={{ scale: 1.03 }} 
            whileTap={{ scale: 0.98 }} 
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? 'Adding...' : 'Add Task'}
          </AddButton>
        </TodoForm>

        {isLoading && !todos.length ? (
          <div>Loading tasks...</div>
        ) : (
          <TodoList>
            {todos.map((todo) => (
              <TodoItem 
                key={todo._id} 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.3 }}
                priority={todo.priority}
              >
                {editingId === todo._id ? (
                  <EditForm>
                    <Input
                      type="text"
                      value={editData.title}
                      onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                      required
                    />
                    <Input
                      type="date"
                      value={editData.deadline}
                      onChange={(e) => setEditData({ ...editData, deadline: e.target.value })}
                      required
                    />
                    <Select
                      value={editData.priority}
                      onChange={(e) => setEditData({ ...editData, priority: e.target.value })}
                    >
                      <option value="Highest">Highest</option>
                      <option value="High">High</option>
                      <option value="Mid">Mid</option>
                      <option value="Low">Low</option>
                    </Select>
                    <Input
                      type="text"
                      value={editData.description}
                      onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                      placeholder="Description"
                    />
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      Completed:
                      <input
                        type="checkbox"
                        checked={editData.completed}
                        onChange={(e) => setEditData({ ...editData, completed: e.target.checked })}
                      />
                    </label>
                    <div style={{ display: 'flex', gap: '0.5rem', marginTop: '10px' }}>
                      <button type="button" onClick={() => handleUpdateTodo(todo._id)}>Save</button>
                      <button type="button" onClick={() => setEditingId(null)}>Cancel</button>
                    </div>
                  </EditForm>
                ) : (
                  <>
                    <TodoHeader>
                      <TodoLeft>
                        <input
                          type="checkbox"
                          checked={todo.completed}
                          disabled={todo.completed} 
                          onChange={() => handleToggleCompleted(todo._id, todo.completed)}
                        />
                        <TodoTitle completed={todo.completed}>{todo.title}</TodoTitle>
                        <PriorityBadge priority={todo.priority}>{todo.priority}</PriorityBadge>
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
                    
                    <CreatedDate>Created: {new Date(todo.createdAt).toLocaleString()}</CreatedDate>
                    
                    {todo.deadline && (
                      <DeadlineInfo days={getRemainingDays(todo.deadline)}>
                        Due: {new Date(todo.deadline).toLocaleDateString()} 
                        {getRemainingDays(todo.deadline) !== null && (
                          <span>
                            {getRemainingDays(todo.deadline) === 0 
                              ? ' (Today)' 
                              : getRemainingDays(todo.deadline) < 0 
                                ? ` (${Math.abs(getRemainingDays(todo.deadline))} days overdue)`
                                : ` (${getRemainingDays(todo.deadline)} days left)`
                            }
                          </span>
                        )}
                      </DeadlineInfo>
                    )}
                    
                    {expanded[todo._id] && <p>{todo.description || 'No description provided.'}</p>}
                  </>
                )}
              </TodoItem>
            ))}
            {!isLoading && todos.length === 0 && (
              <div style={{ textAlign: 'center', marginTop: '20px' }}>
                No tasks found. Add your first task above!
              </div>
            )}
          </TodoList>
        )}
      </ContentWrapper>
    </TodoContainer>
  );
};

export default ToDo;
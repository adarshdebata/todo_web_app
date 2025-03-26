import Todo from "../models/Todo.js";

/**
 * Get todos for a user with optional filtering and search.
 * @param {string} userId - The ID of the user.
 * @param {Object} filters - Filtering options from query params.
 *   Available filters:
 *     - completed: Boolean (true/false)
 *     - search: string (search in title or description)
 */
export const getTodosByUser = async (userId, filters = {}) => {
    const query = { userId };

    if (filters.completed !== undefined) {
        query.completed = filters.completed === "true";
    }
    if (filters.search) {
        // Search in title or description using case-insensitive regex.
        const regex = new RegExp(filters.search, "i");
        query.$or = [{ title: regex }, { description: regex }];
    }
    // You can add more filtering or sorting options here if needed.
    return await Todo.find(query).sort({ createdAt: -1 });
};

/**
 * Create a new todo for a user.
 * @param {string} userId - The ID of the user.
 * @param {Object} todoData - The data for the new todo.
 */
export const createTodo = async (userId, todoData) => {
    const todo = new Todo({ ...todoData, userId });
    return await todo.save();
};

/**
 * Update an existing todo.
 * @param {string} userId - The ID of the user.
 * @param {string} todoId - The ID of the todo to update.
 * @param {Object} updateData - Data to update.
 */
export const updateTodo = async (userId, todoId, updateData) => {
    // Ensure the todo belongs to the user before updating.
    const todo = await Todo.findOneAndUpdate({ _id: todoId, userId }, updateData, { new: true });
    if (!todo) {
        throw new Error("Todo not found or unauthorized");
    }
    return todo;
};

/**
 * Delete a todo.
 * @param {string} userId - The ID of the user.
 * @param {string} todoId - The ID of the todo to delete.
 */
export const deleteTodo = async (userId, todoId) => {
    const todo = await Todo.findOneAndDelete({ _id: todoId, userId });
    if (!todo) {
        throw new Error("Todo not found or unauthorized");
    }
    return todo;
};

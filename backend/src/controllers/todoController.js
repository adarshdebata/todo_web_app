import * as todoService from "../services/todoService.js";
import { validationResult } from "express-validator";

/**
 * Get Todos for the authenticated user.
 */
export const getTodos = async (req, res, next) => {
    try {
        // Extract filter parameters from query string
        const filters = {
            completed: req.query.completed,
            search: req.query.search,
        };
        const todos = await todoService.getTodosByUser(req.user.id, filters);
        return res.status(200).json({ status: "success", data: todos });
    } catch (error) {
        next(error);
    }
};

/**
 * Create a new Todo.
 */
export const createTodo = async (req, res, next) => {
    try {
        // Validate request body using express-validator
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ status: "fail", errors: errors.array() });
        }
        const todo = await todoService.createTodo(req.user.id, req.body);
        return res.status(201).json({ status: "success", data: todo });
    } catch (error) {
        next(error);
    }
};

/**
 * Update an existing Todo.
 */
export const updateTodo = async (req, res, next) => {
    try {
        // Validate request body using express-validator
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ status: "fail", errors: errors.array() });
        }
        const updatedTodo = await todoService.updateTodo(req.user.id, req.params.id, req.body);
        return res.status(200).json({ status: "success", data: updatedTodo });
    } catch (error) {
        next(error);
    }
};

/**
 * Delete a Todo.
 */
export const deleteTodo = async (req, res, next) => {
    try {
        const deletedTodo = await todoService.deleteTodo(req.user.id, req.params.id);
        return res.status(200).json({ status: "success", data: deletedTodo });
    } catch (error) {
        next(error);
    }
};

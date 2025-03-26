import express from "express";
import { body } from "express-validator";
import * as todoController from "../controllers/todoController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// All routes here are protected by the auth middleware.
router.use(authMiddleware);

/**
 * GET /todos
 * Query Params: 
 *   - completed (optional)
 *   - search (optional)
 */
router.get("/", todoController.getTodos);

/**
 * POST /todos
 * Required fields: title
 * Optional: description, completed (defaults to false)
 */
router.post(
    "/",
    [
        body("title")
            .trim()
            .notEmpty()
            .withMessage("Title is required")
            .isLength({ max: 100 })
            .withMessage("Title must be at most 100 characters long"),
        body("description").optional().trim(),
        body("completed").optional().isBoolean().withMessage("Completed must be a boolean"),
    ],
    todoController.createTodo
);

/**
 * PUT /todos/:id
 * Allow updates to title, description, and completed status.
 */
router.put(
    "/:id",
    [
        body("title")
            .optional()
            .trim()
            .notEmpty()
            .withMessage("Title cannot be empty")
            .isLength({ max: 100 })
            .withMessage("Title must be at most 100 characters long"),
        body("description").optional().trim(),
        body("completed").optional().isBoolean().withMessage("Completed must be a boolean"),
    ],
    todoController.updateTodo
);

/**
 * DELETE /todos/:id
 */
router.delete("/:id", todoController.deleteTodo);

export default router;

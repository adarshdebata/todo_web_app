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
        body("deadline")
            .notEmpty()
            .isISO8601()
            .toDate()
            .withMessage("Deadline must be a valid date"),
        body("priority")
            .notEmpty()
            .isIn(["Highest", "High", "Mid", "Low"])
            .withMessage("Priority must be one of Highest, High, Mid, Low"),
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
        body("deadline")
            .optional()
            .isISO8601()
            .toDate()
            .withMessage("Deadline must be a valid date"),
        body("priority")
            .optional()
            .isIn(["Highest", "High", "Mid", "Low"])
            .withMessage("Priority must be one of Highest, High, Mid, Low"),
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

import { Router } from "express";
import asyncHandler from "express-async-handler";
import SendMessageUC from "./UseCases/SendMessageUC";
import { validateBody } from "api/middleware";

const messagesRouter = Router();

messagesRouter.post("/send-message", validateBody, asyncHandler(SendMessageUC));

export default messagesRouter;


import { Router } from "express";
import asyncHandler from "express-async-handler";
import { validateBody } from "api/middleware";
import GetProjectsUC from "./UseCases/GetProjectsUC";
import SaveProjectUC from "./UseCases/SaveProjectUC";

const projectsRouter = Router();

projectsRouter.get("/", asyncHandler(GetProjectsUC));
projectsRouter.post("/", validateBody, asyncHandler(SaveProjectUC));

export default projectsRouter;

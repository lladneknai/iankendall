import { Router } from "express";
import asyncHandler from "express-async-handler";
import { validateBody } from "api/middleware";
import GetProjectUC from "./UseCases/GetProjectUC";
import ListProjectsUC from "./UseCases/ListProjectsUC";
import SaveProjectUC from "./UseCases/SaveProjectUC";

const projectsRouter = Router();

projectsRouter.get("/", asyncHandler(ListProjectsUC));
projectsRouter.get("/:key", asyncHandler(GetProjectUC));
projectsRouter.post("/", validateBody, asyncHandler(SaveProjectUC));

export default projectsRouter;

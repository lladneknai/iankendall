import { Router } from "express";
import asyncHandler from "express-async-handler";
import { validateBody } from "api/middleware";
import GetAboutUC from "./UseCases/GetAboutUC";
import SaveAboutUC from "./UseCases/SaveAboutUC";

const aboutRouter = Router();

aboutRouter.get("/", asyncHandler(GetAboutUC));
aboutRouter.post("/", validateBody, asyncHandler(SaveAboutUC));

export default aboutRouter;

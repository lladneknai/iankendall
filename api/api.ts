import { http } from "@ampt/sdk";
import express, { Router } from "express";
import {
  aboutRouter,
  healthRouter,
  messagesRouter,
  projectsRouter,
  storageRouter,
} from "./routes";
import { logger, requireDev } from "./middleware";

//
// API ROUTES
//
const api = express();
const router = Router();
router.use("/about", aboutRouter);
router.use("/storage", storageRouter);
router.use("/projects", projectsRouter);
router.use("/messages", messagesRouter);
router.use("/healthcheck", healthRouter);

//
// MIDDLEWARE
//
api.use(express.json());
api.use(logger);
api.use("/api", requireDev, router);

//
// SERVE SPA via BASE ROUTE
//
api.use(async (req, res) => {
  if (req.accepts("html")) {
    const stream = await http.node.readStaticFile("index.html");
    res.status(200).type("html");
    stream?.pipe(res);
  } else if (req.accepts("json")) {
    res.status(404).json({ message: "Not found" });
  } else if (req.accepts("txt")) {
    res.status(404).type("txt").send("Not found");
  } else {
    res.status(404).end();
  }
});

http.node.use(api);

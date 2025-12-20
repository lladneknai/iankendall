import type { About, Project } from "./entities";

/**
 * API CONTRACT TYPES
 * - Defines shape of API contracts - requests and responses
 * - Not exhaustive - e.g. we often use an entity type as the body of a PUT/POST
 */

export interface AboutSaveResponse {
  about: About;
  message: string;
  status: "ok";
}

export interface ProjectsResponse {
  count: number;
  projects: Project[];
}

export interface ProjectSaveResponse {
  message: string;
  project: Project;
  status: "ok";
}

export interface SendMessageRequest {
  ccEmail?: string;
  message: string;
  recipientEmail: string;
}

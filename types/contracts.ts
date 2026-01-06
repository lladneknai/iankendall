import type { About, Project, ProjectListItem } from "./entities";

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

// List of projects with limited fields
export interface ProjectsListResponse {
  count: number;
  projects: ProjectListItem[];
  _debug?: {
    totalDuration: string;
    dataFetchDuration: string;
    itemsReturned: number;
    afterActiveFilter: number;
    timestamp: string;
  };
}

// Single project with full details
export interface ProjectResponse {
  project: Project;
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

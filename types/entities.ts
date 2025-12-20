/**
 * ENTITY TYPES
 * - Represents structured entities that are shared across the app.
 * - Occasionally, these are used like api types (ex: Project as POST body)
 */

export interface About {
  content: string;
  description: string;
  headline: string;
}

export enum KeyboardLayout {
  CAPS = "shift",
  DEFAULT = "default",
}

export interface ProjectLink {
  title: string;
  url: string;
}

export interface Project {
  active: boolean;
  company: string;
  content: string;
  description: string;
  key: string;
  links: ProjectLink[];
  name: string;
  tech: string[];
  updatedAt?: string;
}

export interface ProjectsOrganized {
  built: Project[];
  eightHundred: Project[];
  foxfuel: Project[];
  phosphorus: Project[];
}

import { useEffect, useMemo, useState } from "react";
import type { Project, ProjectsResponse } from "@shared";
import { wait } from "@/util/promises";

/**
 * USE PROJECTS
 * ------------
 * - Shared logic for the Projects page
 */
export default function useProjects() {
  const [id, setId] = useState("campaigns");
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [error, setError] = useState<string | null>(null);

  //
  // Get the currently-selected project from the list.
  //
  // In most cases, I would load each record via an individual call.
  // However, in this case, it proved more efficient to fetch the list with one call,
  //  use those in the sidebar, and just pull out the user's selection from the list.
  //
  const project = useMemo(() => {
    const match = projects.find((p) => p.key === id);
    if (match) {
      return match;
    }
    return {
      active: true,
      company: "",
      content: "",
      key: "",
      links: [],
      name: "",
      tech: [],
    };
  }, [id, projects]);

  // Get 'em all.
  const fetchProjects = async () => {
    try {
      const response = await fetch("/api/projects");

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ProjectsResponse = await response.json();
      setProjects(data.projects);
      setError(null);
    } catch (err) {
      console.error("Error fetching projects:", err);
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setIsLoading(false);
    }
  };

  // On mobile, quickly simulate a loading state.
  const selectProjectMobile = async (newId: string) => {
    setIsLoading(true);
    await wait(125);
    setId(newId);
    await wait(125);
    setIsLoading(false);
  };

  // Callback fired after saving a project in the ProjectEditor
  const onSave = async () => {
    setIsEditing(false);
    fetchProjects();
  };

  // Organize projects by company
  // Ordinarily, these would be more dynamic, i.e. these would all be mapped over.
  // For now, the hangup is the different styling of required for each company logo.
  const projectsOrganized = useMemo(() => {
    return {
      built: projects.filter((p) => p.company === "built") as Project[],
      foxfuel: projects.filter((p) => p.company === "foxfuel") as Project[],
      eightHundred: projects.filter((p) => p.company === "800") as Project[],
      phosphorus: projects.filter(
        (p) => p.company === "phosphorus"
      ) as Project[],
    };
  }, [projects]);

  useEffect(() => {
    fetchProjects();
  }, []);

  // TODO: this should be handled at the API level :|
  const activeProjects = useMemo(
    () => projects.filter((p) => p.active),
    [projects]
  );

  return {
    methods: { onSave, setId, selectProjectMobile, setIsEditing },
    state: {
      error,
      id,
      isEditing,
      isLoading,
      project,
      projects: activeProjects,
      projectsOrganized,
    },
  };
}

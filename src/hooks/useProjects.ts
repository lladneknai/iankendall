import { useMemo, useState, useCallback, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router";
import { useProjectsList, useProject } from "./api/useProjectsAPI";
import { useProjectStore } from "@/store/projectStore";
import type { ProjectListItem } from "@shared";

/**
 * USE PROJECTS
 * ------------
 * - Uses SWR hooks for caching and data fetching
 * - Manages project list and individual project state
 * - Uses URL params to manage current project selection
 * - Integrates with projectStore for filter state
 */
export default function useProjects() {
  const { key: urlKey } = useParams<{ key: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  const [isEditing, setIsEditing] = useState(false);
  const [isFiltering, setIsFiltering] = useState(false);
  const [isTreeVisible, setIsTreeVisible] = useState(false);

  // Get filters from store
  const filters = useProjectStore((state) => state.filters);
  const enterProjectsFlow = useProjectStore((state) => state.enterProjectsFlow);
  const exitProjectsFlow = useProjectStore((state) => state.exitProjectsFlow);

  // Track navigation flow - clear filters when entering from outside /projects
  useEffect(() => {
    // Mark that we've entered the projects flow
    enterProjectsFlow();

    // Cleanup: exit projects flow when unmounting AND navigating away from projects
    return () => {
      // Check if the next location is NOT a projects route
      // This will be called before navigation completes
      const isLeavingProjects = !location.pathname.startsWith("/projects");
      if (isLeavingProjects) {
        exitProjectsFlow();
      }
    };
  }, [location.pathname, enterProjectsFlow, exitProjectsFlow]);

  // Fetch project list with filters (cached via SWR per filter combination)
  const {
    projects: projectList,
    isLoading: isLoadingList,
    error: listError,
    refetch: refetchList,
  } = useProjectsList(filters);

  // Fetch individual project if key is in URL (cached via SWR)
  const {
    project: currentProject,
    isLoading: isLoadingProject,
    error: projectError,
    refetch: refetchProject,
  } = useProject(urlKey);

  // Navigate to a specific project
  const selectProject = useCallback(
    (key: string) => {
      navigate(`/projects/${key}`);
      setIsTreeVisible(false); // Always hide tree on click (?)
    },
    [navigate]
  );

  // Navigate back to list view
  const backToList = useCallback(() => {
    navigate("/projects");
  }, [navigate]);

  // Callback fired after saving a project in the ProjectEditor
  const onSave = useCallback(async () => {
    setIsEditing(false);
    await refetchList(); // Refresh the list
    if (urlKey) {
      await refetchProject(); // Refresh current project
    }
  }, [urlKey, refetchList, refetchProject]);

  // Organize projects by company (using list data)
  const projectsOrganized = useMemo(() => {
    return {
      built: projectList.filter(
        (p) => p.company === "built"
      ) as ProjectListItem[],
      foxfuel: projectList.filter(
        (p) => p.company === "foxfuel"
      ) as ProjectListItem[],
      eightHundred: projectList.filter(
        (p) => p.company === "800"
      ) as ProjectListItem[],
      phosphorus: projectList.filter(
        (p) => p.company === "phosphorus"
      ) as ProjectListItem[],
    };
  }, [projectList]);

  const isLoading = isLoadingList || isLoadingProject;
  const isListView = !urlKey;
  const isTreeShown = isTreeVisible && !isListView;
  const error = listError || projectError;

  return {
    methods: {
      onSave,
      selectProject,
      backToList,
      setIsEditing,
      setIsFiltering,
      setIsTreeVisible,
    },
    state: {
      currentProject,
      error: error ? (error as any).message || "An error occurred" : null,
      filters,
      isEditing,
      isFiltering,
      isListView,
      isLoading,
      isTreeShown,
      projectList,
      projectsOrganized,
      selectedKey: urlKey,
    },
  };
}

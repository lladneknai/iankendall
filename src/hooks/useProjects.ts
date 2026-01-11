import { useMemo, useState, useCallback } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router";
import { useProjectsList, useProject } from "./api/useProjectsAPI";
import type { ProjectListItem } from "@shared";

export default function useProjects() {
  const { key: urlKey } = useParams<{ key: string }>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [isEditing, setIsEditing] = useState(false);
  const [isFiltering, setIsFiltering] = useState(false);
  const [isTreeVisible, setIsTreeVisible] = useState(false);

  // Read filters from URL
  const filters = useMemo(
    () => ({
      company: searchParams.get("company") || "",
      tech: searchParams.get("tech")?.split(",").filter(Boolean) || [],
    }),
    [searchParams]
  );

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
      navigate(`/projects/${key}?${searchParams.toString()}`);
      setIsTreeVisible(false);
    },
    [navigate, searchParams]
  );

  // Navigate back to list view
  const backToList = useCallback(() => {
    navigate(`/projects?${searchParams.toString()}`);
  }, [navigate, searchParams]);

  // Callback fired after saving a project in the ProjectEditor
  const onSave = useCallback(async () => {
    setIsEditing(false);
    await refetchList();
    if (urlKey) {
      await refetchProject();
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
  // const isTreeShown = isTreeVisible && !isListView;
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
      isLoadingList,
      isLoadingProject,
      isTreeShown: isTreeVisible,
      projectList,
      projectsOrganized,
      selectedKey: urlKey,
    },
  };
}

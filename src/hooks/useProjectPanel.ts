import { useMemo } from "react";
import { TreeViewBaseItem } from "@mui/x-tree-view/models";
import type { ProjectsOrganized } from "@shared";

/**
 * USE PROJECT PANEL
 * -----------------
 * Transforms organized projects into MUI TreeView structure
 * Returns null if projects haven't loaded yet to prevent MUI errors
 */
export default function useProjectPanel({
  projectsOrganized,
  selectProject,
}: {
  projectsOrganized: ProjectsOrganized;
  selectProject: any;
}) {
  const treeItems: TreeViewBaseItem[] | null = useMemo(() => {
    // Check if any projects have loaded
    const hasProjects =
      projectsOrganized.phosphorus.length > 0 ||
      projectsOrganized.built.length > 0 ||
      projectsOrganized.eightHundred.length > 0 ||
      projectsOrganized.foxfuel.length > 0;

    if (!hasProjects) {
      return null;
    }

    return [
      {
        id: "folder-phosphorus",
        label: "Phosphorus Cybersecurity",
        children: projectsOrganized.phosphorus.map((proj) => ({
          id: proj.key,
          label: proj.name,
        })),
      },
      {
        id: "folder-built",
        label: "Built Technologies",
        children: projectsOrganized.built.map((proj) => ({
          id: proj.key,
          label: proj.name,
        })),
      },
      {
        id: "folder-800",
        label: "800 Pound Gorilla Media",
        children: projectsOrganized.eightHundred.map((proj) => ({
          id: proj.key,
          label: proj.name,
        })),
      },
      {
        id: "folder-foxfuel",
        label: "FoxFuel Creative",
        children: projectsOrganized.foxfuel.map((proj) => ({
          id: proj.key,
          label: proj.name,
        })),
      },
    ].filter((group) => group.children.length > 0);
  }, [projectsOrganized]);

  // Handle item selection - only select projects (non-folder items)
  const handleTreeItemSelection = (
    event: React.SyntheticEvent,
    itemId: string,
    isSelected: boolean
  ) => {
    if (!event) return;

    if (!itemId.startsWith("folder-") && isSelected) {
      selectProject(itemId);
    }
  };

  return {
    handleTreeItemSelection,
    treeItems,
  };
}

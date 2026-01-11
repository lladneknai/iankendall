import { ProjectPanelProps } from "@shared";
import useProjectPanel from "@hooks/useProjectPanel";
import PanelHeader from "./components/PanelHeader";
import PanelTreeView from "./components/PanelTreeView";
import ProjectFilters from "../ProjectFilters";

export default function ProjectPanel({
  isFiltering,
  isTreeShown,
  projectsOrganized,
  selectedKey,
  selectProject,
  setIsFiltering,
  setIsTreeVisible,
}: ProjectPanelProps) {
  const { handleTreeItemSelection, treeItems } = useProjectPanel({
    projectsOrganized,
    selectProject,
  });

  return (
    <div
      id="ProjectPanel"
      className={isTreeShown || isFiltering ? "shown" : "hidden"}
    >
      <PanelHeader
        isFiltering={isFiltering}
        setIsFiltering={setIsFiltering}
        setIsTreeVisible={setIsTreeVisible}
      />

      <div className="panel-content">
        {isFiltering ? (
          <ProjectFilters />
        ) : (
          <>
            <h4>All Projects</h4>
            <PanelTreeView
              handleTreeItemSelection={handleTreeItemSelection}
              selectedKey={selectedKey}
              treeItems={treeItems}
            />
          </>
        )}
      </div>
    </div>
  );
}

import { Link } from "react-router-dom";
import { SelectProjectPanelProps } from "@shared";
import useSelectProjectPanel from "@hooks/useSelectProjectPanel";
import { faReplyAll } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PanelHeader from "./components/PanelHeader";
import PanelTreeView from "./components/PanelTreeView";

export default function SelectProjectPanel({
  isFiltering,
  isTreeShown,
  projectsOrganized,
  selectedKey,
  selectProject,
  setIsFiltering,
  setIsTreeVisible,
}: SelectProjectPanelProps) {
  const { handleTreeItemSelection, treeItems } = useSelectProjectPanel({
    projectsOrganized,
    selectProject,
  });

  return (
    <div id="SelectProjectPanel" className={isTreeShown ? "shown" : "hidden"}>
      <PanelHeader
        isFiltering={isFiltering}
        setIsFiltering={setIsFiltering}
        setIsTreeVisible={setIsTreeVisible}
      />

      <hr />
      <Link to="/projects">
        <FontAwesomeIcon icon={faReplyAll} /> All Projects
      </Link>

      <PanelTreeView
        handleTreeItemSelection={handleTreeItemSelection}
        selectedKey={selectedKey}
        treeItems={treeItems}
      />
    </div>
  );
}

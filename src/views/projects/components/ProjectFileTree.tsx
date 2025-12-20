import { ProjectNavProps } from "@shared";
import { TreeViewBaseItem } from "@mui/x-tree-view/models";
import { RichTreeView } from "@mui/x-tree-view/RichTreeView";
import { TreeItem2, TreeItem2Props } from "@mui/x-tree-view/TreeItem2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCode,
  faFolder,
  faFolderOpen,
} from "@fortawesome/free-solid-svg-icons";

/**
 * PROJECT FILE TREE | Select a project to view details using MUI RichTreeView
 */
export default function ProjectFileTree({
  id,
  projectsOrganized,
  setId,
}: ProjectNavProps) {
  if (!projectsOrganized) {
    return null;
  }

  const folderColor = "rgb(229, 174, 162)"; // TODO: replace with theme

  // Build tree structure: companies as folders, projects as items
  const treeItems: TreeViewBaseItem[] = [
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
  ];

  // Custom TreeItem to add spacing and styling
  const CustomTreeItem = (props: TreeItem2Props) => {
    const isFolder = props.itemId.startsWith("folder-");

    return (
      <TreeItem2
        {...props}
        style={{
          marginBottom: isFolder ? "0.5rem" : 0,
        }}
        slotProps={{
          label: {
            style: {
              // color: isFolder ? folderColor : undefined,
              fontWeight: isFolder ? 600 : undefined,
            },
          },
        }}
      />
    );
  };

  // Handle item selection - only select projects (non-folder items)
  const handleItemSelectionToggle = (
    event: React.SyntheticEvent,
    itemId: string,
    isSelected: boolean
  ) => {
    if (!event) {
      console.log("no event from ProjectFileTree...");
      return;
    }
    // Only handle selection for project items (not folder items)
    if (!itemId.startsWith("folder-") && isSelected) {
      setId(itemId);
    }
  };

  return (
    <div id="ProjectNav">
      <RichTreeView
        items={treeItems}
        selectedItems={id}
        onItemSelectionToggle={handleItemSelectionToggle}
        defaultExpandedItems={[
          "folder-phosphorus",
          "folder-built",
          "folder-800",
          "folder-foxfuel",
        ]}
        slots={{
          item: CustomTreeItem,
          collapseIcon: () => (
            <FontAwesomeIcon
              icon={faFolderOpen}
              style={{ color: folderColor }}
            />
          ),
          expandIcon: () => (
            <FontAwesomeIcon icon={faFolder} style={{ color: folderColor }} />
          ),
          endIcon: () => (
            <FontAwesomeIcon icon={faCode} style={{ color: folderColor }} />
          ),
        }}
      />
    </div>
  );
}

import { RichTreeView } from "@mui/x-tree-view/RichTreeView";
import { TreeItem2, TreeItem2Props } from "@mui/x-tree-view/TreeItem2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCode,
  faFolder,
  faFolderOpen,
} from "@fortawesome/free-solid-svg-icons";

/**
 * SELECT PROJECT PANEL | Tree View
 * - Display projects organized by company in a folder structure
 * - Clicking on a project SHOWS that project, and folder clicks expand/collapse
 */
export default function PanelTreeView({
  handleTreeItemSelection,
  selectedKey,
  treeItems,
}: any) {
  // IMPORTANT: Return null until we've loaded.
  // It blows up unless it has the right entries.
  // Perhaps replace this with a skeleton later on.
  if (!treeItems) {
    return null;
  }

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
              fontWeight: isFolder ? 500 : undefined,
            },
          },
        }}
      />
    );
  };

  const folderColor = "rgb(229, 174, 162)";

  return (
    <RichTreeView
      items={treeItems}
      selectedItems={selectedKey || ""}
      onItemSelectionToggle={handleTreeItemSelection}
      defaultExpandedItems={[
        "folder-phosphorus",
        "folder-built",
        "folder-800",
        "folder-foxfuel",
      ]}
      slots={{
        item: CustomTreeItem,
        collapseIcon: () => (
          <FontAwesomeIcon icon={faFolderOpen} style={{ color: folderColor }} />
        ),
        expandIcon: () => (
          <FontAwesomeIcon icon={faFolder} style={{ color: folderColor }} />
        ),
        endIcon: () => (
          <FontAwesomeIcon icon={faCode} style={{ color: folderColor }} />
        ),
      }}
    />
  );
}

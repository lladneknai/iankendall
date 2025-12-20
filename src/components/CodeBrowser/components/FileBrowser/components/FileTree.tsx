import { useEffect, useRef } from "react";
import { useCodeStore } from "@store/codeStore";
import { useFileTree } from "@hooks/useFileTree";
import { RichTreeView } from "@mui/x-tree-view/RichTreeView";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCode,
  faFolder,
  faFolderOpen,
} from "@fortawesome/free-solid-svg-icons";
import FileTreeSkeleton from "./FileTreeSkeleton";

/**
 * Left-hand portion of the finder window, where users select what
 * file they wish to view. Selecting a file proceeds to load it.
 */

function FileTree() {
  const { handleExpandedItemsChange, handleListItemClick } = useFileTree();
  const { expandedItems, fileTreeItems, fileTreeShown, filename, setFilename } =
    useCodeStore();

  const hasSimulatedClick = useRef(false);

  // Programmatically select the default file after tree loads
  useEffect(() => {
    if (
      fileTreeShown &&
      fileTreeItems.length > 0 &&
      !hasSimulatedClick.current
    ) {
      setTimeout(() => {
        const labels = document.querySelectorAll(".MuiTreeItem-label");

        // Find the main.tsx element and simulate a click to activate selection
        labels.forEach((label) => {
          if (label.textContent === "main.tsx") {
            (label as HTMLElement).click();
            hasSimulatedClick.current = true;
          }
        });
      }, 100);
    }
  }, [fileTreeShown, fileTreeItems]);

  return (
    <>
      {fileTreeShown ? (
        <>
          <RichTreeView
            expandedItems={expandedItems}
            selectedItems={filename}
            items={fileTreeItems}
            onExpandedItemsChange={handleExpandedItemsChange}
            onItemClick={(_e, item) => handleListItemClick(item, setFilename)}
            slots={{
              collapseIcon: () => <FontAwesomeIcon icon={faFolderOpen} />,
              expandIcon: () => <FontAwesomeIcon icon={faFolder} />,
              endIcon: () => <FontAwesomeIcon icon={faCode} />,
            }}
          />
        </>
      ) : (
        <FileTreeSkeleton />
      )}
    </>
  );
}

export default FileTree;

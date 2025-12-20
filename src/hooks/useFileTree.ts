import * as React from "react";
import { useCodeStore } from "@store/codeStore";
import { TreeViewBaseItem, TreeViewItemId } from "@mui/x-tree-view/models";
import { convertPathToTreeView } from "@util/filetree";
import { CODE_CONFIG } from "@config/code";

/**
 * USE FILE TREE | manage the collapsable file tree
 *
 * This is used both in the Desktop and Mobile versions of the app.
 * While the presentations differ, the underlying functions are the same.
 */

export const useFileTree = () => {
  const {
    fileTreeItems,
    setExpandedItems,
    setFileTreeShown,
    setFileTreeItems,
  } = useCodeStore();

  const hasSetDefaults = React.useRef(false);

  const getAllItemsWithChildrenItemIds = () => {
    const itemIds: TreeViewItemId[] = [];
    const registerItemId = (item: TreeViewBaseItem) => {
      if (item.children?.length) {
        itemIds.push(item.id);
        item.children.forEach(registerItemId);
      }
    };
    fileTreeItems.forEach(registerItemId);
    return itemIds;
  };

  React.useEffect(() => {
    if (fileTreeItems.length > 0) {
      setFileTreeShown(true);

      // Ensure default file expansion is set correctly after tree loads, but only once
      if (!hasSetDefaults.current) {
        const currentExpanded = useCodeStore.getState().expandedItems;
        if (currentExpanded.length === 0) {
          // If no items are expanded, set the default expansion
          setExpandedItems(CODE_CONFIG.DEFAULT_EXPANDED_ITEMS);
        }
        hasSetDefaults.current = true;
      }
    }
  }, [fileTreeItems]);

  const handleExpandedItemsChange = (
    _event: React.SyntheticEvent,
    itemIds: string[]
  ) => {
    setExpandedItems(itemIds);
  };

  const handleExpandClick = () => {
    const oldExpanded = useCodeStore.getState().expandedItems;
    const newExpanded =
      oldExpanded.length === 0 ? getAllItemsWithChildrenItemIds() : [];
    setExpandedItems(newExpanded);
  };

  const handleListItemClick = (item: string, cb: (item: string) => void) => {
    if (!item.includes("__DIR__")) {
      cb(item);
    }
  };

  /**
   * RUNS ON LOAD: Fetch the generated ref file which populates the tree
   */
  const getCodeData = () => {
    fetch("/sourcecode-ref.txt")
      .then((response) => response.json())
      .then((text) => {
        const items = convertPathToTreeView(text);
        setFileTreeItems(items);
      });
  };

  React.useEffect(() => {
    getCodeData();
  }, []);

  return {
    handleExpandClick,
    handleExpandedItemsChange,
    handleListItemClick,
    getCodeData,
  };
};

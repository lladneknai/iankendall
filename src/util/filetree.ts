import { TreeViewBaseItem } from "@mui/x-tree-view/models";
interface TreeView {
  children?: TreeView[];
  id: string;
  label: string;
  path: string;
}

/*********************************************************************************** /
 *
 * This file builds the File tree. To do this, I save a copy of all the source code
 * files to /public/sourcecode, and run a script that builds out `sourcecode-ref.txt`.
 * Outgoing requests reference this map, pull the text of the file, and return it.
 *
 *************************************************************************************/

/**
 * This var keeps track of the FULL filepath of each file in the tree.
 * It is reset on every iteration of the file loop in convertPathToTreeView().
 * It supersedes the `fileNames` variable which keeps track of ONE piece of the tree, but only enough to build it.
 */
let currentFilename = "";

/**
 * Optimized recursive function that builds the filetree with Map-based lookups for better performance.
 */
function convertFolderOrFileToTree(
  currentTree: TreeView,
  fileNames: string[],
  fileId: string,
): TreeView {
  if (!fileNames.length) {
    return currentTree;
  }

  const currentFileName = fileNames[0];

  // If the current tree name is the same as the current file name, it means that the next file in fileNames will be a child of the currentTree.
  if (currentTree.label === currentFileName) {
    return convertFolderOrFileToTree(currentTree, fileNames.slice(1), fileId);
  }

  // Use Map for O(1) lookups instead of O(n) find operations
  const childrenMap = new Map<string, TreeView>();
  const existingChildren = currentTree.children ?? [];

  // Build lookup map from existing children
  existingChildren.forEach((child) => {
    childrenMap.set(child.label, child);
  });

  const existingChild = childrenMap.get(currentFileName);

  if (existingChild) {
    // If child exists, update it recursively while preserving order
    const updatedChild = convertFolderOrFileToTree(
      existingChild,
      fileNames.slice(1),
      fileId,
    );
    childrenMap.set(currentFileName, updatedChild);

    // Preserve original order by rebuilding array with existing order
    const updatedChildren = existingChildren.map((child) =>
      child.label === currentFileName ? updatedChild : child,
    );

    return {
      ...currentTree,
      children: updatedChildren,
    };
  } else if (fileNames.length > 1) {
    // If the fileName is not registered as a child and it's not the last fileName (meaning it's a folder)
    const newTree: TreeView = {
      id: `__DIR__${fileNames.join("/")}`,
      label: currentFileName,
      path: fileNames.join("/"),
      children: [],
    };

    const updatedNewTree = convertFolderOrFileToTree(
      newTree,
      fileNames.slice(1),
      fileId,
    );

    return {
      ...currentTree,
      children: [...existingChildren, updatedNewTree],
    };
  } else {
    // If it's the last fileName (meaning it's a file), add it as a leaf node
    const newTree: TreeView = {
      id: currentFilename,
      path: fileNames.join("/"),
      label: currentFileName,
    };

    return {
      ...currentTree,
      children: [...existingChildren, newTree],
    };
  }
}

/**
 * Exported func that converts the filepaths to an array of TreeViewBaseItem[].
 */
export function convertPathToTreeView(filepaths: string[]): TreeViewBaseItem[] {
  //
  // RETURN SAMPLE ITEMS
  //
  // return SAMPLE_ITEMS;

  // Initial declaration of the tree. This is the root node onto which all other nodes are attached.
  let tree: TreeView = {
    children: [],
    id: "TREE_BASE",
    path: "/",
    label: "BASE",
  };

  // Loop through each of the filepaths in /public/sourcecode-ref
  filepaths.forEach((fpath) => {
    currentFilename = fpath;
    const fileNames = fpath.replace(/^\//, "").split("/");
    tree = convertFolderOrFileToTree(tree, fileNames, fpath);
  });

  // Return the tree items and plug them into the FileTree.
  const TreeItems: TreeViewBaseItem[] = [];
  const BaseItems = tree.children;

  BaseItems?.forEach((bi) => {
    TreeItems.push(bi);
  });

  return TreeItems;
}

/**
 * Sample items
 */
export const SAMPLE_ITEMS: TreeViewBaseItem[] = [
  {
    id: "grid",
    label: "Data Grid",
    children: [
      { id: "grid-community", label: "@mui/x-data-grid" },
      { id: "grid-pro", label: "@mui/x-data-grid-pro" },
      { id: "grid-premium", label: "@mui/x-data-grid-premium" },
    ],
  },
  {
    id: "pickers",
    label: "Date and Time Pickers",
    children: [
      { id: "pickers-community", label: "@mui/x-date-pickers" },
      { id: "pickers-pro", label: "@mui/x-date-pickers-pro" },
    ],
  },
  {
    id: "charts",
    label: "Charts",
    children: [{ id: "charts-community", label: "@mui/x-charts" }],
  },
  {
    id: "tree-view",
    label: "Tree View",
    children: [{ id: "tree-view-community", label: "@mui/x-tree-view" }],
  },
];

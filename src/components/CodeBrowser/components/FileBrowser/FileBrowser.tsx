import { FileBrowserProps } from "@shared";
import FileTree from "./components/FileTree";
import FileTreeHeader from "./components/FileTreeHeader";

export default function FileBrowser({
  isCollapsed,
  isWindow,
  setIsCollapsed,
}: FileBrowserProps) {
  return (
    <div id="FileBrowser" className={isCollapsed ? "collapsed" : "expanded"}>
      {!isWindow && (
        <FileTreeHeader
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
        />
      )}
      <FileTree />
    </div>
  );
}

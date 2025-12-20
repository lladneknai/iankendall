import useCode from "@hooks/useCode";
import Window from "./components/Window";
import FileViewer from "./components/FileViewer";
import FileBrowser from "./components/FileBrowser";

/**
 * CODE BROWSER
 * ------------
 * - Allows user to browse the source code of this site
 * - Mounted at the Code route or in a pop-up "Finder" modal
 * - BrowserContent is wrapped in the modal if isWindow = true
 */
const CodeBrowser = ({ isWindow = false }: { isWindow?: boolean }) => {
  const {
    fontSize,
    decrementFontSize,
    incrementFontSize,
    isCollapsed,
    setIsCollapsed,
  } = useCode();

  return (
    <div id="CodeBrowser" className={isWindow ? "window" : ""}>
      <FileBrowser
        isCollapsed={isCollapsed}
        isWindow={isWindow}
        setIsCollapsed={setIsCollapsed}
      />
      <FileViewer
        decrementFontSize={decrementFontSize}
        incrementFontSize={incrementFontSize}
        fontSize={fontSize}
        isWindow={isWindow}
      />
    </div>
  );
};

/**
 * DEFAULT EXPORT: If `isWindow` is true, wrap in the Dialog
 */
function Wrapper({ isWindow }: { isWindow: boolean }) {
  if (isWindow) {
    return (
      <Window>
        <CodeBrowser isWindow />
      </Window>
    );
  }

  return <CodeBrowser />;
}

export default Wrapper;

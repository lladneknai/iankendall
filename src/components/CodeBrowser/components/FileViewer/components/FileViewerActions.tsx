import { useNavigate } from "react-router-dom";
import { CODE_CONFIG } from "@config/code";
import { useCodeStore } from "@store/codeStore";
import { FileViewerActionsProps } from "@shared";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowRestore } from "@fortawesome/free-regular-svg-icons";
import { faMinusCircle, faPlusCircle } from "@fortawesome/free-solid-svg-icons";

export default function FileViewerActions({
  decrementFontSize,
  incrementFontSize,
  isWindow,
}: FileViewerActionsProps) {
  const navigate = useNavigate();
  const theme = useCodeStore((s) => s.theme);
  const setTheme = useCodeStore((s) => s.setTheme);
  const loading = useCodeStore((s) => s.loading);
  const filename = useCodeStore((s) => s.filename);
  const setWindowOpen = useCodeStore((s) => s.setOpen);

  const openInWindow = () => {
    navigate("/");
    setWindowOpen(true);
  };

  return (
    <div id="FileViewerActions">
      {!isWindow && (
        <div className="filename">
          <h3>{loading ? "..." : filename}</h3>
        </div>
      )}
      <div className="controls">
        <div className="control">
          <div>Theme:</div>
          <select onChange={(e) => setTheme(e.target.value)} value={theme}>
            {Object.keys(CODE_CONFIG.THEME_OPTIONS).map((themeKey) => (
              <option key={themeKey} value={themeKey}>
                {themeKey}
              </option>
            ))}
          </select>
        </div>
        <div className="control">
          <div>Font Size:</div>
          <button onClick={decrementFontSize}>
            <FontAwesomeIcon icon={faMinusCircle} />
          </button>
          <button onClick={incrementFontSize}>
            <FontAwesomeIcon icon={faPlusCircle} />
          </button>
        </div>
        {!isWindow && (
          <div className="control">
            <button className="goto-window" onClick={openInWindow}>
              <div>Open in Window</div>
              <FontAwesomeIcon icon={faWindowRestore} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

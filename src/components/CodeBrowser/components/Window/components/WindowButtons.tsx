import { useCodeStore } from "@store/codeStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleMinus,
  faCirclePlus,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

/**
 * Buttons to control the code window.
 */
const WindowButtons = () => {
  const navigate = useNavigate();
  const {
    // fullscreen,
    minimized,
    // setFullscreen,
    setMinimized,
    setOpen,
  } = useCodeStore();

  const handleFullScreen = () => {
    setOpen(false);
    navigate("/code");
  };

  return (
    <div className="window-buttons">
      <button onClick={() => setOpen(false)}>
        <div className="icon-bg" />
        <FontAwesomeIcon icon={faCircleXmark} />
      </button>
      <button onClick={() => setMinimized(!minimized)}>
        <div className="icon-bg" />
        <FontAwesomeIcon icon={faCircleMinus} />
      </button>
      <button onClick={handleFullScreen}>
        <div className="icon-bg" />
        <FontAwesomeIcon icon={faCirclePlus} />
      </button>
    </div>
  );
};

export default WindowButtons;

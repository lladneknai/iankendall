import Draggable from "react-draggable";
import { useCodeStore } from "@store/codeStore";
import { PaperProps } from "@mui/material/Paper";
import { WindowContainer } from "@components/CodeBrowser/styles";

/**
 * DRAGGABLE WINDOW
 * ----------------
 * - Wrapper for the MUI Dialog
 * - Allows users to drag the Finder window around
 *
 */

function DraggableWindow(props: PaperProps) {
  const { fullscreen, minimized } = useCodeStore();

  return (
    <Draggable disabled={fullscreen || minimized}>
      <WindowContainer
        {...props}
        fullscreen={fullscreen}
        minimized={minimized}
      />
    </Draggable>
  );
}

export default DraggableWindow;

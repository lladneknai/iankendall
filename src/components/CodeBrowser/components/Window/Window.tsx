import { useEffect } from "react";
import { useCodeStore } from "@store/codeStore";
import { type DialogProps } from "@mui/material";
import useCodePreview from "@hooks/useCodePreview";
import { StyledDialog } from "@components/CodeBrowser/styles";
import { ChildrenProps } from "@shared";
import WindowButtons from "./components/WindowButtons";
import DraggableWindow from "./components/DraggableWindow";

export default function Window({ children }: ChildrenProps) {
  const { fetchFile } = useCodePreview();
  const { filename, minimized, open, setOpen } = useCodeStore();

  const handleClose: DialogProps["onClose"] = (_event, reason) => {
    if (minimized && reason && reason === "backdropClick") return;
    setOpen(false);
  };

  const handleHeaderClick = () => {
    if (!minimized) {
      return;
    }
    setOpen(true);
  };

  // Fetch file contents when user selects it from the tree
  useEffect(() => {
    fetchFile(filename);
  }, [filename]);

  return (
    <StyledDialog
      // id="CodeWindow"
      aria-labelledby="source-code-window"
      aria-describedby="view-site-source-code-window"
      hideBackdrop={minimized}
      maxWidth={false}
      onClose={handleClose}
      open={open}
      PaperComponent={DraggableWindow}
    >
      <div id="WindowHeader" onClick={handleHeaderClick}>
        <WindowButtons />
        <span className="filename">{filename}</span>
      </div>
      {children}
    </StyledDialog>
  );
}

import Paper from "@mui/material/Paper";
import Dialog from "@mui/material/Dialog";
import Skeleton from "@mui/material/Skeleton";
import { styled } from "@mui/material/styles";
import {
  getHeight,
  getMinimizedAttributes,
  getWidth,
  ChildrenProps,
} from "@util/code-window";

/**
 * The Code Window was built as a part of an older project.
 * As such... it uses Material UI styles components...
 * (/¯◡ ‿ ◡)/¯ ~ ┻━┻
 *
 * UPDATE: most of these have been phased out, except...
 * - Dialog
 * - Paper
 * - Skeleton
 *
 */

export const CodeBlockSkeleton = styled(Skeleton)(() => ({
  // width: "750px",
  // height: "100vh",
}));

export const StyledDialog = styled(Dialog)(() => ({
  maxHeight: "none",
  margin: 0,
}));

export const WindowContainer = styled(Paper, {
  shouldForwardProp: (prop) => prop !== "minimized" && prop !== "fullscreen",
})<ChildrenProps>(({ fullscreen, minimized }) => ({
  borderRadius: "0.75rem",

  // Yes, this seems a little verbose. But it's all about overwriting
  height: getHeight({ fullscreen, minimized }),
  maxHeight: getHeight({ fullscreen, minimized }),
  minHeight: getHeight({ fullscreen, minimized }),

  maxWidth: getWidth({ fullscreen, minimized }),
  minWidth: getWidth({ fullscreen, minimized }),
  width: getWidth({ fullscreen, minimized }),

  margin: "0px !important",

  // position: getPosition(minimized),
  ...getMinimizedAttributes(minimized),
  overflow: "unset !important",

  // TODO: this gets a little weird re:dragging
  // transition: "all 100ms ease-in-out",
}));

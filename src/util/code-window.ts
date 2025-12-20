import { useMediaQuery, useTheme } from "@mui/material";

export interface ChildrenProps {
  fullscreen: boolean;
  minimized: boolean;
}

/**
 * Get the height of the Code Preview window.
 */
export function getHeight({ fullscreen, minimized }: ChildrenProps) {
  const theme = useTheme();
  const xl = useMediaQuery(theme.breakpoints.up("xl"));
  const lg = useMediaQuery(theme.breakpoints.only("lg"));
  const md = useMediaQuery(theme.breakpoints.only("md"));

  if (fullscreen) {
    return "calc(100vh - 24px) !important";
  }
  if (minimized) {
    return "32px !important";
  }
  if (xl) {
    return "650px !important";
  }
  if (lg || md) {
    return "500px !important";
  }
  return "600px !important";
}

/**
 * Get the width of the code preview window.
 */
export function getWidth({ fullscreen, minimized }: ChildrenProps) {
  const theme = useTheme();
  const xl = useMediaQuery(theme.breakpoints.up("xl"));
  const lg = useMediaQuery(theme.breakpoints.only("lg"));
  const md = useMediaQuery(theme.breakpoints.only("md"));

  if (fullscreen) {
    return "calc(100vw - 24px) !important";
  }
  if (minimized) {
    return "300px !important";
  }
  if (xl) {
    return "1200px !important";
  }
  if (lg) {
    return "900px !important";
  }
  if (md) {
    return "800px !important";
  }
  return "400px !important";
}

/**
 * Get styles that render when the window is minimized.
 */
export function getMinimizedAttributes(minimized: boolean) {
  if (minimized) {
    return {
      bottom: 0,
      position: "absolute !important" as never,
      left: 0,
    };
  }
  return {};
}

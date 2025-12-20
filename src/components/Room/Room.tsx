import { type ReactNode } from "react";
import ScreenSizeDebug from "./components/ScreenSizeDebug";

/**
 * ROOM | base component for everything in the app
 */
function Room({ children }: { children: ReactNode | ReactNode[] }) {
  const isDev = import.meta.env.MODE === "development";

  return (
    <div id="RoomContainer">
      <div id="Room">{children}</div>
      {isDev && <ScreenSizeDebug />}
    </div>
  );
}

export default Room;

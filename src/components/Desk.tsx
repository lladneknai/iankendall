import { useMemo, type ReactNode } from "react";
import { useDeskSize } from "@hooks/useDeskSize";
import { useAppStore } from "@store/appStore";
import Candle from "./Candle";

/**
 * DESK COMPONENT
 * --------------
 * - Desk the Typewriter and Candles sit on.
 * - This component manages the VAST MAJORITY of responsiveness
 * - See `useDeskSize` for the logic that controls the height/width adjustments for the page.
 */
export default function Desk({
  children,
}: {
  children: ReactNode | ReactNode[];
}) {
  useDeskSize();

  // When the dialog is open and the action buttons are hidden, shrink it.
  const isSendingMessage = useAppStore((s) => s.isSendingMessage);
  const adjustedStyles = useMemo(() => {
    const bottom = isSendingMessage ? "0px" : "60px";
    return {
      "--candle-container-bottom": bottom,
    } as React.CSSProperties;
  }, [isSendingMessage]);

  if (!children) return null;

  return (
    <div id="Desk">
      <div id="Desk-items">
        <div id="CandlesLeft" style={adjustedStyles}>
          <Candle bottom="-12px" height="300px" width="50px" />
          <Candle bottom="0px" height="315px" width="50px" />
          <Candle bottom="-10px" height="280px" width="50px" />
          <div className="candle-base" />
        </div>
        {children}
        <div id="CandlesRight" style={adjustedStyles}>
          <Candle bottom="-8px" height="300px" width="50px" />
          <Candle bottom="0px" height="380px" width="50px" />
          <Candle bottom="-11px" height="290px" width="50px" />
          <div className="candle-base" />
        </div>
      </div>
      <div id="Desk-surface-container">
        <div id="Desk-surface" />
      </div>
    </div>
  );
}

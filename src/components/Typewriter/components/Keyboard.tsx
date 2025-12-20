import "react-simple-keyboard/build/css/index.css";
import SimpleKeyboard from "react-simple-keyboard";
import { KeyboardProps } from "@shared";
import {
  buttonThemes,
  displayKeys,
  keyLayout,
} from "@components/Typewriter/lib/keyboard-constants";

/**
 * TYPEWRITER |  Keyboard
 * - Virtual keyboard seen in the browser. Handles typing via keyboard and/or click.
 * - This file is FULLY CONTROLLED. All handlers, listeners, etc are handled elsewhere.
 */
export default function Keyboard({
  isActive,
  keyboardRef,
  layoutName,
  onKeyPress,
  onKeyboardRender,
}: KeyboardProps) {
  return (
    <div id="Keyboard">
      <SimpleKeyboard
        //
        // DOCS: https://hodgef.com/simple-keyboard/documentation/options/
        //
        buttonTheme={buttonThemes}
        disabled={!isActive}
        disableButtonHold={false}
        display={displayKeys}
        keyboardRef={keyboardRef}
        layoutName={layoutName}
        layout={keyLayout}
        onKeyPress={onKeyPress}
        onRender={onKeyboardRender}
        physicalKeyboardHighlight={isActive}
        physicalKeyboardHighlightPress={isActive}
        preventMouseDownDefault
        tabCharOnTab
        theme="hg-theme-default typewriter"
      />
    </div>
  );
}

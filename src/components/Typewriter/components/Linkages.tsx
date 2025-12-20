import { getLinkageId } from "@components/Typewriter/lib/keyboard-utils";
import { linkageLayout } from "@components/Typewriter/lib/keyboard-constants";

/**
 * TYPEWRITER | Keyboard Linkages
 * - Manages the key linkages under the actual key elements. These are rendered separately from the keys.
 * - Differs from the keyboard as we can more easily manage DOM selectors because we create the markup ourselves.
 */
export default function Linkages({
  linkageRefs,
}: {
  linkageRefs: React.RefObject<Record<string, HTMLDivElement | null>>;
}) {
  return (
    <div id="Linkages">
      {linkageLayout.map((key) => {
        return (
          <div
            id={getLinkageId(key)}
            className="linkage-mechanism"
            key={key}
            ref={(el) => {
              if (linkageRefs.current) {
                linkageRefs.current[getLinkageId(key)] = el;
              }
            }}
          />
        );
      })}

      {/* Four static divs run the spacebar linkage. */}
      <div className="linkage-mechanism-space" id="linkage-space-left" />
      <div className="linkage-mechanism-space" id="linkage-space-horiz-left" />
      <div className="linkage-mechanism-space" id="linkage-space-horiz-right" />
      <div className="linkage-mechanism-space" id="linkage-space-right" />
    </div>
  );
}

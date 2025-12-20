import { useAppStore } from "@/store/appStore";
import { PaperProps } from "@shared";

export default function Paper({
  paperStyles,
  rows,
  suggestionText,
  suggestionTextAc,
}: PaperProps) {
  const isMobile = useAppStore((s) => s.isMobile);
  const { height, right, top } = paperStyles;
  return (
    <div
      id="Paper"
      style={
        {
          "--paper-height": `${height}px`,
          "--paper-right": `${right}px`,
          "--paper-top": `${top}px`,
        } as React.CSSProperties
      }
    >
      {rows.map((chars, rowIndex) => {
        return (
          <div className="row" key={`row_${rowIndex}`}>
            {chars.split("").map((char, charIndex) => {
              const isLastChar =
                rowIndex === rows.length - 1 && charIndex === chars.length - 1;
              return (
                <div
                  className="char"
                  // Right now, this doesn't do anything...
                  {...(isLastChar && { id: "#lastChar" })}
                  key={`char_${char}_${charIndex}`}
                >
                  {char}
                </div>
              );
            })}

            {/* If suggestion text is present, render it once auto-typing has concluded. */}
            {!isMobile && rowIndex === rows.length - 1 && suggestionText && (
              <>
                {suggestionText.split("").map((char, charIndex) => {
                  return (
                    <div
                      className="char suggestion"
                      key={`suggestion_char_${char}_${charIndex}`}
                    >
                      {char}
                    </div>
                  );
                })}
              </>
            )}
          </div>
        );
      })}

      {!isMobile &&
        suggestionTextAc &&
        suggestionTextAc.split("\n").map((suggestionTextRow, sugIndex) => (
          <div className="row" key={`suggestion_row_${sugIndex}`}>
            {suggestionTextRow.split("").map((char, charIndex) => {
              return (
                <div
                  className="char suggestion"
                  key={`suggestion_char_${char}_${charIndex}`}
                >
                  {char}
                </div>
              );
            })}
          </div>
        ))}
    </div>
  );
}

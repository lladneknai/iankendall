import { CarouselControlsProps } from "@shared";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPause, faPlay } from "@fortawesome/free-solid-svg-icons";
import { DotButton } from "./DotButton";
import { PrevButton, NextButton } from "./ArrowButtons";

/**
 * CAROUSEL CONTROLS
 * -----------------
 * - Standalone controls for synchronizing multiple carousels
 * - Use with hideControls on individual Carousel components
 */
export default function CarouselControls({
  arrows = false,
  isPlaying,
  onDotClick,
  onNext,
  onPlayToggle,
  onPrev,
  selectedIndex,
  totalSlides,
}: CarouselControlsProps) {
  return (
    <div className="embla__controls horizontal">
      {Array.from({ length: totalSlides }).map((_, index) => (
        <DotButton
          key={index}
          onClick={() => onDotClick(index)}
          className={"embla__dot".concat(
            index === selectedIndex ? " embla__dot--selected" : ""
          )}
        />
      ))}

      {arrows && (
        <div className="embla__buttons__horizontal">
          <PrevButton onClick={onPrev} disabled={selectedIndex === 0} />
          <NextButton
            onClick={onNext}
            disabled={selectedIndex === totalSlides - 1}
          />
        </div>
      )}

      {onPlayToggle && (
        <button
          className="embla__button embla__button--play"
          onClick={onPlayToggle}
          style={{
            marginLeft: "1rem",
            color: "#7aa7c6",
          }}
          type="button"
        >
          <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
        </button>
      )}
    </div>
  );
}

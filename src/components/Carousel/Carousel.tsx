import React, { useCallback } from "react";
import { CarouselProps } from "@shared";
import Autoplay from "embla-carousel-autoplay";
import { EmblaCarouselType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import { DotButton, useDotButton } from "./components/DotButton";
import {
  PrevButton,
  NextButton,
  usePrevNextButtons,
} from "./components/ArrowButtons";

/**
 * CAROUSEL COMPONENT
 *  - DOCS: https://www.embla-carousel.com/
 *  - Configurable Embla carousel that renders children
 *  - Use the link below for docs and to update/modify the config
 */
export default function Carousel({
  arrows = true,
  autoplay = true,
  children,
  options,
  reverse = false,
  slideHeight,
  slideWidth,
  spacing,
}: CarouselProps) {
  const plugins = autoplay ? [Autoplay()] : [];
  const [emblaRef, emblaApi] = useEmblaCarousel(options, plugins);

  const orientation = options?.axis === "y" ? "vertical" : "horizontal";

  const style = {
    "--slide-height": slideHeight,
    "--slide-size": slideWidth,
    "--slide-spacing": spacing,
  } as React.CSSProperties;

  // Handle autoplay stop/reset on user interaction
  const onNavButtonClick = useCallback((emblaApi: EmblaCarouselType) => {
    const autoplayPlugin = emblaApi?.plugins()?.autoplay;
    if (!autoplayPlugin) return;

    const resetOrStop =
      autoplayPlugin.options.stopOnInteraction === false
        ? autoplayPlugin.reset
        : autoplayPlugin.stop;

    resetOrStop();
  }, []);

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(
    emblaApi,
    onNavButtonClick
  );

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi, onNavButtonClick);

  return (
    <div className="embla" style={style}>
      <div
        className={orientation === "vertical" ? "col gap-1" : "row gap-2"}
        style={reverse ? { flexDirection: "row-reverse" } : {}}
      >
        <div className="embla__viewport" ref={emblaRef}>
          <div className="embla__container">
            {React.Children.map(children, (child, index) => (
              <div className="embla__slide" key={`slide_${index}`}>
                <div className="embla__slide__number">{child}</div>
              </div>
            ))}
          </div>
        </div>

        <div
          className={`embla__controls ${
            orientation === "vertical" ? "vertical" : "horizontal"
          }`}
        >
          {arrows && orientation === "vertical" && (
            <PrevButton
              onClick={onPrevButtonClick}
              disabled={prevBtnDisabled}
            />
          )}
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={"embla__dot".concat(
                index === selectedIndex ? " embla__dot--selected" : ""
              )}
            />
          ))}
          {arrows && orientation === "vertical" && (
            <NextButton
              onClick={onNextButtonClick}
              disabled={nextBtnDisabled}
            />
          )}
          {arrows && orientation === "horizontal" && (
            <div className="embla__buttons__horizontal">
              <PrevButton
                onClick={onPrevButtonClick}
                disabled={prevBtnDisabled}
              />
              <NextButton
                onClick={onNextButtonClick}
                disabled={nextBtnDisabled}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

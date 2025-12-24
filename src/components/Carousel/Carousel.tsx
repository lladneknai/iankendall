import React, { useCallback, useEffect } from "react";
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
 *  - Supports controlled mode via selectedIndex/onSelectChange
 *  - Supports controlled autoplay via autoplayActive
 */
export default function Carousel({
  arrows = true,
  autoplay = false,
  autoplayActive,
  caption = null,
  children,
  hideControls = false,
  onSelectChange,
  options,
  reverse = false,
  selectedIndex: controlledIndex,
  slideHeight,
  slideWidth,
  spacing = "0px",
}: CarouselProps) {
  const plugins = autoplay ? [Autoplay({ playOnInit: false })] : [];
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

  // Controlled autoplay: start/stop based on autoplayActive prop
  useEffect(() => {
    if (!emblaApi || !autoplay) return;

    const autoplayPlugin = emblaApi.plugins()?.autoplay;
    if (!autoplayPlugin) return;

    if (autoplayActive) {
      autoplayPlugin.play();
    } else {
      autoplayPlugin.stop();
    }
  }, [emblaApi, autoplay, autoplayActive]);

  // Controlled index: scroll to controlledIndex when it changes
  useEffect(() => {
    if (controlledIndex !== undefined && emblaApi) {
      emblaApi.scrollTo(controlledIndex);
    }
  }, [emblaApi, controlledIndex]);

  // Notify parent when slide changes
  useEffect(() => {
    if (!emblaApi || !onSelectChange) return;

    const onSelect = () => {
      onSelectChange(emblaApi.selectedScrollSnap());
    };

    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelectChange]);

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
        className={orientation === "vertical" ? "col gap-1" : "row gap-3"}
        style={reverse ? { flexDirection: "row-reverse" } : {}}
      >
        {caption && reverse && (
          <div className="carousel-caption-container">
            <p className="carousel-caption">{caption}</p>
          </div>
        )}
        <div className={`embla__viewport-wrapper${reverse ? " reverse" : ""}`}>
          <div className="embla__viewport" ref={emblaRef}>
            <div className="embla__container">
              {React.Children.map(children, (child, index) => (
                <div className="embla__slide" key={`slide_${index}`}>
                  <div className="embla__slide__number">{child}</div>
                </div>
              ))}
            </div>

            {caption && !reverse && (
              <div className="carousel-caption-container">
                <p className="carousel-caption">{caption}</p>
              </div>
            )}
          </div>
        </div>

        {!hideControls && (
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
        )}
      </div>
    </div>
  );
}

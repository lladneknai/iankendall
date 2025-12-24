import { useState } from "react";
import Carousel, { CarouselControls } from "@components/Carousel";
import RevealOnScroll from "@components/RevealOnScroll";
import NavigateButton from "./NavigateButton";

/**
 * CURRENTLY NOT IN USE
 * - Demonstrates linked carousels - may be very useful in the future. KEEP IT!
 */
export default function AboutSection4() {
  const path = "/img/about/";
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const leftSlides = [
    `${path}about-1-1.jpg`,
    `${path}about-1-2.jpg`,
    `${path}about-1-3.jpg`,
    `${path}about-1-4.jpg`,
  ];

  const rightSlides = [
    `${path}about-2-1.jpg`,
    `${path}about-2-2.jpg`,
    `${path}about-2-3.jpg`,
    `${path}about-2-4.jpg`,
  ];

  return (
    <div id="AboutSection6">
      <RevealOnScroll className="section" distance="25vh" duration="750ms">
        <section className="about-section about-4">
          <div className="navigate-btn-abs-bottom">
            <NavigateButton
              direction="up"
              scrollTo="AboutHero"
              text="Back to top"
            />
          </div>
          <div className="synced-carousels">
            <Carousel
              arrows={false}
              autoplay
              autoplayActive={isPlaying}
              hideControls
              onSelectChange={setActiveIndex}
              options={{ axis: "x", loop: true }}
              selectedIndex={activeIndex}
              slideHeight="50vh"
              slideWidth="calc(50vh * (9 / 16))"
            >
              {leftSlides.map((src, i) => (
                <div
                  key={i}
                  className="carousel-slide"
                  style={{ backgroundImage: `url(${src})` }}
                />
              ))}
            </Carousel>

            <Carousel
              arrows={false}
              autoplay
              autoplayActive={isPlaying}
              hideControls
              onSelectChange={setActiveIndex}
              options={{ axis: "x", loop: true }}
              selectedIndex={activeIndex}
              slideHeight="50vh"
              slideWidth="calc(50vh * (9 / 16))"
            >
              {rightSlides.map((src, i) => (
                <div
                  key={i}
                  className="carousel-slide"
                  style={{ backgroundImage: `url(${src})` }}
                />
              ))}
            </Carousel>
          </div>

          <CarouselControls
            isPlaying={isPlaying}
            onDotClick={setActiveIndex}
            onNext={() =>
              setActiveIndex((i) => (i >= leftSlides.length - 1 ? 0 : i + 1))
            }
            onPlayToggle={() => setIsPlaying(!isPlaying)}
            onPrev={() =>
              setActiveIndex((i) => (i <= 0 ? leftSlides.length - 1 : i - 1))
            }
            selectedIndex={activeIndex}
            totalSlides={leftSlides.length}
          />
        </section>
      </RevealOnScroll>
    </div>
  );
}

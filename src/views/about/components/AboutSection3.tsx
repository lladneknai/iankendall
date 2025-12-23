import Carousel from "@components/Carousel";

import RevealOnScroll from "@components/RevealOnScroll";

export default function AboutSection3() {
  const path = "/img/about/";

  return (
    <RevealOnScroll className="section" distance="200px" duration="750ms">
      <section className="about-section">
        <div className="section-content">
          <h3>I like the mountains.</h3>
          <p>Work hard; play hard. Give me a challenge.</p>
          <p>In the winter, you'll find me skiing the Rockies.</p>
          <p>In the summer, it's backpacking in the Great Smoky Mountains.</p>
        </div>
        <Carousel
          arrows={false}
          options={{ axis: "x", loop: true }}
          slideHeight="60vh"
          slideWidth="40vh"
        >
          <div
            className="carousel-slide"
            style={{ backgroundImage: `url(${path}skiing-1.jpg)` }}
          />
          <div
            className="carousel-slide"
            style={{ backgroundImage: `url(${path}skiing-2.jpg)` }}
          />
          <div
            className="carousel-slide"
            style={{ backgroundImage: `url(${path}skiing-3.jpg)` }}
          />
          <div
            className="carousel-slide"
            style={{ backgroundImage: `url(${path}skiing-4.jpg)` }}
          />
        </Carousel>
      </section>
    </RevealOnScroll>
  );
}

import Carousel from "@components/Carousel";

import RevealOnScroll from "@components/RevealOnScroll";

export default function AboutSection2() {
  const path = "/img/about/";

  return (
    <RevealOnScroll className="section" distance="200px" duration="750ms">
      <section className="about-section">
        <Carousel
          arrows={false}
          options={{ axis: "x", loop: true }}
          reverse
          slideHeight="60vh"
          slideWidth="40vh"
        >
          <div
            className="carousel-slide"
            style={{ backgroundImage: `url(${path}glacier.jpg)` }}
          />
          <div
            className="carousel-slide"
            style={{ backgroundImage: `url(${path}glacier-2.jpg)` }}
          />
          <div
            className="carousel-slide"
            style={{ backgroundImage: `url(${path}nam-2.jpg)` }}
          />
          <div
            className="carousel-slide"
            style={{ backgroundImage: `url(${path}exploring-4.jpg)` }}
          />
        </Carousel>
        <div className="section-content">
          <h3>I like to travel.</h3>
          <p>I've been fortunate to go some cool places.</p>
          <p>A flexible PTO and remote-work policy is important to me.</p>
          <p>When I get the best out of life, you get the best out of me.</p>
        </div>
      </section>
    </RevealOnScroll>
  );
}

import Carousel from "@components/Carousel";

import RevealOnScroll from "@components/RevealOnScroll";

export default function AboutSection1() {
  const path = "/img/about/";

  return (
    <RevealOnScroll className="section" distance="200px" duration="750ms">
      <section className="about-section about-1">
        <div className="section-content">
          <h3>My name is Ian.</h3>
          <p>It's nice to meet you.</p>
          <p>Here are some pictures of me.</p>
          <p>I like to do Various Things in Various Places.</p>
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

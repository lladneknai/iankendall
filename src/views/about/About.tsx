import { lorem } from "@/util/text";
import RevealOnScroll from "@/components/RevealOnScroll";

/**
 * ABOUT PAGE
 * ----------
 * - A simple page telling YOU about ME
 * - Currently hardcoded - the idea will be to expand to CMS-driven when the styles are fleshed out
 */
export default function About() {
  return (
    <div id="About" className="page">
      <div id="AboutHero" className="hero">
        <div className="hero-content">
          <h1>About Me</h1>
          {/* <marquee>Ian time, baby</marquee> */}
        </div>
      </div>

      <div className="page-content">
        <RevealOnScroll className="section" distance="200px" duration="750ms">
          <h1>Section 1</h1>
          <p>{lorem()}</p>
          <p>{lorem()}</p>
          <p>{lorem()}</p>
        </RevealOnScroll>

        <RevealOnScroll className="section" distance="100px" duration="750ms">
          <h1>Section 2</h1>
          <p>{lorem()}</p>
          <p>{lorem()}</p>
          <p>{lorem()}</p>
        </RevealOnScroll>
      </div>
    </div>
  );
}

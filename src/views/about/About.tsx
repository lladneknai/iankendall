import { lorem } from "@/util/text";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import RevealOnScroll from "@components/RevealOnScroll";
import AboutSection1 from "./components/AboutSection1";
import AboutSection2 from "./components/AboutSection2";
import AboutSection3 from "./components/AboutSection3";

/**
 * ABOUT PAGE
 * ----------
 * - A simple page telling YOU about ME
 * - Currently hardcoded - the idea will be to expand to CMS-driven when the styles are fleshed out
 */
export default function About() {
  const handleScrollClick = () => {
    document
      .getElementById("AboutContent")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div id="About" className="page">
      <div id="AboutHero" className="hero">
        <div className="hero-fade-top" />
        <div className="hero-content">
          <h1>About Me</h1>
          <div className="scroll-link-container">
            <button
              className="btn scroll-link"
              type="button"
              onClick={handleScrollClick}
            >
              Learn about me
            </button>
            <FontAwesomeIcon icon={faChevronDown} />
          </div>
        </div>
        <div className="hero-fade-bottom" />
      </div>

      <div id="AboutContent" className="page-content">
        <AboutSection1 />
        <AboutSection2 />
        <AboutSection3 />

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

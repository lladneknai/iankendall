import {
  faCode,
  faMountain,
  faBookBookmark,
  faGlobeAmericas,
} from "@fortawesome/free-solid-svg-icons";
import { faHand } from "@fortawesome/free-regular-svg-icons";
import AboutHero from "./components/AboutHero";
import content from "./components/AboutContent";
import AboutSection from "./components/AboutSection";

/**
 * ABOUT PAGE
 * ----------
 * - A simple page telling YOU about ME! How about it.
 * - Uses offsetting fullpage blocks to make it interesting.
 */
export default function About() {
  return (
    <div id="About" className="page">
      <AboutHero />
      <div id="AboutContent" className="content">
        <AboutSection
          content={content[0]}
          figIcon={faHand}
          figLabel="Intro"
          index={1}
          reverse
        />
        <AboutSection
          content={content[1]}
          figIcon={faCode}
          figLabel="Build"
          index={2}
          wide
        />
        <AboutSection
          content={content[2]}
          figIcon={faGlobeAmericas}
          figLabel="Travel"
          index={3}
          reverse
        />
        <AboutSection
          content={content[3]}
          figIcon={faBookBookmark}
          figLabel="Learn"
          index={4}
          wide
        />
        <AboutSection
          content={content[4]}
          figIcon={faMountain}
          figLabel="Outside"
          index={5}
          isLast
          reverse
        />

        {/* KEEP THIS ONE IN THE REPO - IT HAS THE DYNAMIC CAROUSEL */}
        {/* <LinkedCarousel /> */}
      </div>
    </div>
  );
}

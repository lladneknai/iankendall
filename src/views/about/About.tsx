import { Link } from "react-router-dom";
import {
  faCode,
  faMapPin,
  faMountain,
  faBookBookmark,
  faGlobeAmericas,
  faArrowUpRightFromSquare,
} from "@fortawesome/free-solid-svg-icons";
import { faHand } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AboutSection from "./components/AboutSection";
import NavigateButton from "./components/NavigateButton";
// import AboutSection4 from "./components/AboutSection4";

/**
 * ABOUT PAGE
 * ----------
 * - A simple page telling YOU about ME! How about it.
 * - Uses offsetting fullpage blocks to make it interesting.
 */
export default function About() {
  return (
    <div id="About" className="page">
      <div id="AboutHero" className="hero">
        <div className="hero-fade-top" />

        <div className="hero-content">
          <h1>About Me</h1>
          <p>Here&rsquo;s what I&rsquo;m about.</p>
        </div>

        <div className="navigate-btn-abs-bottom">
          <NavigateButton
            direction="down"
            scrollTo="AboutSection1"
            text="Learn about me"
          />
        </div>

        <div className="hero-caption">
          <p>
            <FontAwesomeIcon icon={faMapPin} />
            Lake Louise, Alberta
          </p>
        </div>

        <div className="hero-fade-bottom" />
      </div>

      {/* SECTION 1: INTRODUCTION */}
      <div id="AboutContent" className="page-content">
        <AboutSection
          content={
            <>
              <h3>
                My name is{" "}
                <strong>
                  Ian K.
                  {/* <FontAwesomeIcon icon={faHand} /> */}
                </strong>
              </h3>
              <p>Glad to meet you. How&rsquo;s it going?</p>
              <p>Here are some pictures to prove I&rsquo;m a real person.</p>
              <p>
                Want to get in touch? I&rsquo;d like that.{" "}
                <Link className="alt" to="/contact">
                  Type me a message!
                  <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                </Link>
              </p>
            </>
          }
          figIcon={faHand}
          figLabel="Introduction"
          index={1}
          reverse
        />

        {/* SECION 2: BUILD THINGS */}
        <AboutSection
          content={
            <>
              <h3>
                I like to <strong>build things.</strong>
              </h3>
              <p>
                I love what I do &ndash; creating scalable web features that are
                used by real people.
              </p>
              <p>
                Throughout my career, I&rsquo;ve built some cool things. Check
                them out on my{" "}
                <Link className="alt" to="/projects">
                  Projects page
                  <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                </Link>
              </p>
            </>
          }
          figIcon={faCode}
          figLabel="Build"
          index={2}
          wide
        />

        {/* SECTION 3: TRAVEL */}
        <AboutSection
          content={
            <>
              <h3>
                I like to <strong>explore.</strong>
              </h3>
              <p>
                The world is a big place. I&rsquo;m fond of experiencing it.
              </p>
              <p>
                <span className="alt">Flexible PTO</span> and remote work
                policies are vital to my happiness.
              </p>
              <p>
                I embrace accountability &ndash; it&rsquo;s a prerequisite to a
                healthy work-life balance.
              </p>
            </>
          }
          figIcon={faGlobeAmericas}
          figLabel="Travel"
          index={3}
          reverse
        />

        {/* SECION 4: LEARN */}
        <AboutSection
          content={
            <>
              <h3>
                I like to <strong>learn.</strong>
              </h3>
              <p>If I&rsquo;m not expanding...</p>
              <ul>
                <li>The height of my ambition</li>
                <li>The deptch of my knowledge</li>
                <li>The breath of my experience</li>
              </ul>
              <p style={{ textAlign: "right" }}>
                .. I&rsquo;m wasting my time.
              </p>
            </>
          }
          figIcon={faBookBookmark}
          figLabel="Learn"
          index={4}
          wide
        />

        {/* SECTION 5: GO OUTSIDE */}
        <AboutSection
          content={
            <>
              <h3>
                I like to <strong>go outside.</strong>
                {/* <FontAwesomeIcon icon={faMountain} /> */}
              </h3>
              <p>
                Some people like to relax. I prefer a
                <span className="alt"> challenge</span>.
              </p>
              <p>
                In the winter, you'll find me chasing powder in the Rockies.
              </p>
              <p>
                In the summer, you'll find me backpacking thru the Great Smoky
                Mountains.
              </p>
            </>
          }
          figIcon={faMountain}
          figLabel="Outside"
          index={5}
          isLast
          reverse
        />

        {/* KEEP THIS ONE IN THE REPO - IT HAS THE DYNAMIC CAROUSEL */}
        {/* <AboutSection4 /> */}
      </div>
    </div>
  );
}

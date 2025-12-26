import { Link } from "react-router-dom";
import {
  faCode,
  faMapPin,
  faMountain,
  faBookBookmark,
  faGlobeAmericas,
  faArrowUpRightFromSquare,
  faTableList,
} from "@fortawesome/free-solid-svg-icons";
import { faHand } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AboutSection from "./components/AboutSection";
import NavigateButton from "./components/NavigateButton";
import { getTechIcon } from "../projects/components/ProjectContent/components/Tech/lib/util";
import { handleSmoothScroll } from "@/util/dom";

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
          <div>
            <h1>About Me</h1>
            <p>Here&rsquo;s what I&rsquo;m about.</p>
            {/* <NavigateButton
              direction="down"
              scrollTo="AboutSection1"
              text="Learn what I'm about."
            /> */}
          </div>

          <div className="hero-caption">
            <p>
              <FontAwesomeIcon icon={faMapPin} />
              Lake Louise, Alberta
            </p>
          </div>
        </div>

        <div className="navigate-btn-abs-bottom">
          <NavigateButton
            direction="down"
            scrollTo="AboutSection1"
            text="Get started"
          />
        </div>

        <div className="hero-toc">
          <p className="contents">
            <span className="fig">
              <FontAwesomeIcon icon={faTableList} />
              Fig.00 |
            </span>{" "}
            Contents
          </p>
          <ol>
            <li onClick={() => handleSmoothScroll("AboutSection1")}>
              <FontAwesomeIcon icon={faHand} />
              Intro
            </li>
            <li onClick={() => handleSmoothScroll("AboutSection2")}>
              <FontAwesomeIcon icon={faCode} />
              Build
            </li>
            <li onClick={() => handleSmoothScroll("AboutSection3")}>
              <FontAwesomeIcon icon={faGlobeAmericas} />
              Travel
            </li>
            <li onClick={() => handleSmoothScroll("AboutSection4")}>
              <FontAwesomeIcon icon={faBookBookmark} />
              Learn
            </li>
            <li onClick={() => handleSmoothScroll("AboutSection5")}>
              <FontAwesomeIcon icon={faMountain} />
              Outside
            </li>
          </ol>
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
              <p>Here are some pictures proving I&rsquo;m a real person.</p>
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
          figLabel="Intro"
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
                I&rsquo;ve shipped some cool products.{" "}
                <Link className="alt" to="/projects">
                  Check &lsquo;em out
                  <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                </Link>
              </p>
              <p>
                I love what I do &ndash; creating scalable web features that are
                used by real people. I&rsquo;m big on user empathy.
              </p>
              <p>
                I love to learn new things, but I have extensive experience
                using this stuff:
              </p>

              <div className="about-tech-list">
                {["react", "ts", "css", "scss", "sql", "aws", "bash"].map(
                  (t) => {
                    const { icon, isFa } = getTechIcon(t, "#7aa7c6");
                    return (
                      <div className="about-tech-item" key={t}>
                        {isFa ? (
                          <FontAwesomeIcon
                            icon={icon}
                            style={{ color: "#7aa7c6" }}
                          />
                        ) : (
                          <>{icon}</>
                        )}
                      </div>
                    );
                  }
                )}
              </div>
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
                <li>The depth of my knowledge</li>
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
                Some people like to chill. I prefer a
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
        {/* <LinkedCarousel /> */}
      </div>
    </div>
  );
}

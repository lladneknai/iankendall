import { handleSmoothScroll } from "@/util/dom";
import { faHand } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCode,
  faMapPin,
  faMountain,
  faBookBookmark,
  faGlobeAmericas,
  faTableList,
} from "@fortawesome/free-solid-svg-icons";
import NavigateButton from "./NavigateButton";

export default function AboutHero() {
  return (
    <div id="AboutHero" className="hero">
      <div className="hero-fade-top" />

      <div className="hero-content">
        <div className="hero-content--top">
          <h1>About Me</h1>
          {/* <p>Here&rsquo;s what I&rsquo;m about.</p> */}
          <NavigateButton
            direction="down"
            scrollTo="AboutSection1"
            text="Learn what I'm about."
          />
        </div>

        <div className="hero-content--bottom">
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

          <div className="hero-caption">
            <p>
              <FontAwesomeIcon icon={faMapPin} />
              Lake Louise, Alberta
            </p>
          </div>
        </div>
      </div>

      {/* 
        <div className="navigate-btn-abs-bottom">
          <NavigateButton
            direction="down"
            scrollTo="AboutSection1"
            text="Get started"
          />
        </div> */}

      {/* TODO: this is problematic with the new VH thang. Just get rid of it for now. */}
      {/* <div className="hero-fade-bottom" /> */}
    </div>
  );
}

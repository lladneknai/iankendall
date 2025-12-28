import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { getTechIcon } from "../../projects/components/ProjectContent/components/Tech/lib/util";

const content = [
  {
    header: (
      <h3>
        My name is <strong>Ian K.</strong>
      </h3>
    ),
    content: (
      <>
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
    ),
  },
  {
    header: (
      <h3>
        I like to <strong>build things.</strong>
      </h3>
    ),
    content: (
      <>
        <p>
          I&rsquo;ve shipped some cool products.{" "}
          <Link className="alt" to="/projects">
            Check &lsquo;em out
            <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
          </Link>
        </p>
        <p>
          My elevator pitch is simple: I create sleek web products that are used
          by real people. I&rsquo;m big on user empathy.
        </p>
        <p>I&rsquo;m most comfortable using this stuff:</p>
        <div className="about-tech-list">
          {["react", "ts", "css", "scss", "sql", "aws", "bash"].map((t) => {
            const { icon, isFa } = getTechIcon(t, "#7aa7c6");
            return (
              <div className="about-tech-item" key={t}>
                {isFa ? (
                  <FontAwesomeIcon icon={icon} style={{ color: "#7aa7c6" }} />
                ) : (
                  <>{icon}</>
                )}
              </div>
            );
          })}
        </div>
      </>
    ),
  },
  {
    header: (
      <h3>
        I like to <strong>explore.</strong>
      </h3>
    ),
    content: (
      <>
        <p>The world is a big place. I&rsquo;m fond of experiencing it.</p>
        <p>
          <span className="alt">Flexible PTO</span> and remote work policies are
          vital to my happiness.
        </p>
        <p>
          I embrace accountability &ndash; it&rsquo;s a prerequisite to a
          healthy work-life balance.
        </p>
      </>
    ),
  },
  {
    header: (
      <h3>
        I like to <strong>learn.</strong>
      </h3>
    ),
    content: (
      <>
        <p>If I&rsquo;m not expanding...</p>
        <ul>
          <li>The height of my ambition</li>
          <li>The depth of my knowledge</li>
          <li>The breath of my experience</li>
        </ul>
        <p style={{ textAlign: "right" }}>...I&rsquo;m wasting my time.</p>
      </>
    ),
  },
  {
    header: (
      <h3>
        I like to <strong>go outside.</strong>
      </h3>
    ),
    content: (
      <>
        <p>
          Some people like to chill. I prefer a
          <span className="alt"> challenge</span>.
        </p>
        <p>In the winter, you'll find me chasing powder in the Rockies.</p>
        <p>
          In the summer, you'll find me backpacking thru the Great Smoky
          Mountains.
        </p>
      </>
    ),
  },
];

export default content;

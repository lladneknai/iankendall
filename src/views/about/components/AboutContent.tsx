import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { getTechIcon } from "../../projects/components/shared/Tech/lib/util";

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
        <p>Here are some pictures to prove I&rsquo;m not a bot.</p>
        <p>
          Want to get in touch? Easy.{" "}
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
        <p>These are some of my favorite tools.</p>
        <ul>
          <li>Click on any item to see how I&rsquo;ve used it.</li>
          <li>
            To see what I&rsquo;ve built, check out{" "}
            <Link className="alt" to="/projects">
              my projects page
              <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
            </Link>
          </li>
          <li>
            Or, use a custom file browser to{" "}
            {/*
               TODO: would be cool to have the browser open here
               BUT: I was an architectural idiot - needs to be in a fn comp
               */}
            <Link className="alt" to="/code">
              view my source code
              <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
            </Link>
          </li>
        </ul>
        <div className="about-tech-list">
          {["react", "ts", "css", "scss", "sql", "aws", "bash"].map((t) => {
            const { icon, isFa } = getTechIcon(t, "#7aa7c6");
            return (
              <Link
                className="about-tech-item"
                key={t}
                to={`/projects?tech=${t}`}
              >
                {isFa ? (
                  <FontAwesomeIcon icon={icon} style={{ color: "#7aa7c6" }} />
                ) : (
                  <>{icon}</>
                )}
              </Link>
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
        I care about <strong>users.</strong>
      </h3>
    ),
    content: (
      <>
        <p>
          My work carries a strong sense of <strong>user empathy.</strong>
        </p>
        <p>
          We&rsquo;ve all been pissed off at a web app. It&rsquo;s a feeling
          that few prople willingly re-experience.
        </p>
        <p>
          My &ldquo;ministry&rdquo; as a user-empathetic engineer is simple:{" "}
          <strong>bad user sentiment is bad for business.</strong>
        </p>
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

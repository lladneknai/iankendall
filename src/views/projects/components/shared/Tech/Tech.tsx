import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getTechIcon } from "./lib/util";

export default function Tech({
  skipHeader = false,
  tech,
}: {
  skipHeader?: boolean;
  tech: string[];
}) {
  if (!tech || tech.length === 0) {
    return null;
  }
  return (
    <>
      {!skipHeader && (
        <>
          <h4>Tech</h4>
        </>
      )}
      <ul className="tech">
        {tech.map((t) => {
          const { icon, isFa } = getTechIcon(t);
          return (
            <li key={t}>
              {isFa ? <FontAwesomeIcon icon={icon} size="xl" /> : <>{icon}</>}
            </li>
          );
        })}
      </ul>
    </>
  );
}

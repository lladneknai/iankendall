import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getTechIcon } from "./lib/util";

export default function Tech({ tech }: { tech: string[] }) {
  if (!tech || tech.length === 0) {
    return null;
  }
  return (
    <div>
      <h4>Tech</h4>
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
    </div>
  );
}

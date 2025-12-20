import { ProjectDataProps } from "@shared";

/**
 * CONTENT EDITOR | select which tech was used in this project
 * NOTE: The UX here is not great right now... it's de-prioritized bc it's not client-facing.
 */
export default function Tech({ data, updateField }: ProjectDataProps) {
  return (
    <div className="row gap-2">
      <div className="col gap-1">
        <div className="row gap-1">
          <h4>Tech</h4>
          <button
            className="btn sm add"
            onClick={() => {
              const newTech = [...data.tech];
              newTech.push("");
              updateField("tech", newTech);
            }}
          >
            +
          </button>
        </div>
        {data.tech.map((tech, i) => (
          <div className="row gap-1" key={`tech_${i}`}>
            <input
              onChange={(e) => {
                const newTech = [...data.tech];
                newTech[i] = e.target.value;
                updateField("tech", newTech);
              }}
              type="text"
              value={tech}
            />
            <button
              className="btn sm"
              onClick={() => {
                const newTech = [...data.tech];
                newTech.splice(i, 1);
                updateField("tech", newTech);
              }}
            >
              x
            </button>
          </div>
        ))}
      </div>
      <div className="col">
        <h4>Options</h4>
        <ul style={{ margin: 0, color: "papayawhip" }}>
          <li>aws</li>
          <li>css</li>
          <li>figma</li>
          <li>js</li>
          <li>mui</li>
          <li>mongo</li>
          <li>mysql</li>
          <li>nest</li>
          <li>node</li>
          <li>php</li>
          <li>python</li>
          <li>react</li>
          <li>redis</li>
          <li>scss</li>
          <li>sql</li>
          <li>ts</li>
        </ul>
      </div>
    </div>
  );
}

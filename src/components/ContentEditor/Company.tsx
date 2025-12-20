import { ProjectDataProps } from "@shared";

/**
 * CONTENT EDITOR | select associated company key
 */
export default function Company({ data, updateField }: ProjectDataProps) {
  return (
    <div className="col">
      <h4>Company</h4>
      <select
        name="cars"
        value={data.company}
        onChange={(e) => updateField("company", e.target.value)}
      >
        <option value="phosphorus">Phosphorus</option>
        <option value="built">Built</option>
        <option value="800">800 PGM</option>
        <option value="foxfuel">Foxfuel</option>
      </select>
    </div>
  );
}

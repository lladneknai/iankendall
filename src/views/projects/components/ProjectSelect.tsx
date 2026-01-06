import type { ProjectSelectProps } from "@shared";

/**
 * PROJECT SELECT | mobile only native select
 * For desktop version, see the SelectProjectPanel component.
 */
export default function ProjectSelect({
  selectedKey,
  projectsOrganized,
  selectProject,
}: ProjectSelectProps) {
  return (
    <div id="ProjectSelect">
      <label htmlFor="project-select">Select a project to view details.</label>
      <select
        id="project-select"
        onChange={(e) => selectProject(e.target.value)}
        value={selectedKey || ""}
      >
        <optgroup label="Phosphorus (2023-present)">
          {projectsOrganized.phosphorus.map((p) => (
            <option key={p.key} value={p.key}>
              {p.name}
            </option>
          ))}
        </optgroup>
        <optgroup label="Built Technologies (2021-23)">
          {projectsOrganized.built.map((p) => (
            <option key={p.key} value={p.key}>
              {p.name}
            </option>
          ))}
        </optgroup>
        <optgroup label="800 Pound Gorilla Media (2019-21)">
          {projectsOrganized.eightHundred.map((p) => (
            <option key={p.key} value={p.key}>
              {p.name}
            </option>
          ))}
        </optgroup>
        <optgroup label="FoxFuel Creative (2017-19)">
          {projectsOrganized.foxfuel.map((p) => (
            <option key={p.key} value={p.key}>
              {p.name}
            </option>
          ))}
        </optgroup>
      </select>
    </div>
  );
}

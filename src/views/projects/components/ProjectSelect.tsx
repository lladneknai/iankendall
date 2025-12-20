import { ProjectSelectProps } from "@shared";

const ORGANIZED = true;

/**
 * PROJECT SELECT | mobile only native select
 * For desktop version, see the ProjectNav component.
 */
export default function ProjectSelect({
  id,
  projects,
  projectsOrganized,
  selectProjectMobile,
}: ProjectSelectProps) {
  //
  // TODO: figure out if you want this ORGANIZED or FLAT.
  // It looks like you CAN'T control how this is styled on iOS.
  // Organized is easier to read, flat is shorter.
  //
  if (ORGANIZED) {
    return (
      <div id="ProjectSelect">
        <label htmlFor="project-select">
          Select a project to view details.
        </label>
        <select
          id="project-select"
          onChange={(e) => selectProjectMobile(e.target.value)}
          value={id}
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
  
  return (
    <div id="ProjectSelect">
      <label htmlFor="project-select">Select a project to view details.</label>
      <select
        id="project-select"
        onChange={(e) => selectProjectMobile(e.target.value)}
        value={id}
      >
        {projects.map((p) => (
          <option key={p.key} value={p.key}>
            {p.name}
          </option>
        ))}
      </select>
    </div>
  );
}

/*
        <optgroup label="Phosphorus Cybersecurity"></optgroup>
        {Object.keys(projectsOrganized).map((key) => {
          const projects = projectsOrganized[key];
          console.log({ key, projects });
          return <></>;
          // return (
          // <optgroup key={key} label={key}>
          // </optgroup>
          // <option key={p.key} value={p.key}>
          //   {p.name}
          // </option>
          // )
        })}
*/

import type { ProjectSelectProps } from "@shared";
import {
  faFilter,
  faFilterCircleXmark,
  faFolderClosed,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { faFolderOpen } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";

/**
 * PROJECT SELECT | mobile only native select
 * For desktop version, see the ProjectPanel component.
 */
export default function ProjectActionsMobile({
  isListView,
  isTreeVisible,
  projectsOrganized,
  selectedKey,
  selectProject,
  setIsTreeVisible,
}: ProjectSelectProps) {
  const [isSelectVisible, setIsSelectVisible] = useState(false);

  return (
    <div id="ProjectActionsMobile">
      <div id="ProjectSelect">
        <label htmlFor="project-select">
          Select a project to view details.{" "}
          {!isListView && (
            <Link className="view-all-projects-mobile" to="/projects">
              View All
            </Link>
          )}
        </label>

        {!isListView && (
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
        )}
      </div>
    </div>
  );
}

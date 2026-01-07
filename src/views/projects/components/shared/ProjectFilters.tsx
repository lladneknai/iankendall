import { TECH_OPTIONS } from "@config/tech";
import type { ProjectFiltersProps } from "@shared";
import { useProjectStore } from "@store/projectStore";
import { getCompanyData, getCompanyKeys } from "./Company/lib/util";
import { getTechIcon } from "./Tech/lib/util";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ProjectFilters({}: ProjectFiltersProps) {
  const company = useProjectStore((state) => state.filters.company);
  const tech = useProjectStore((state) => state.filters.tech);
  const setCompanyFilter = useProjectStore((state) => state.setCompanyFilter);
  const setTechFilters = useProjectStore((state) => state.setTechFilters);
  const clearFilters = useProjectStore((state) => state.clearFilters);

  const keys = getCompanyKeys();
  const companies = keys.map((k) => ({
    key: k,
    ...getCompanyData(k),
  }));

  const hasActiveFilters = company.length > 0 || tech.length > 0;

  const handleCompanyChange = (companyKey: string) => {
    setCompanyFilter(companyKey);
  };

  const handleTechChange = (techKey: string) => {
    const newTech = tech.includes(techKey)
      ? tech.filter((t) => t !== techKey)
      : [...tech, techKey];
    setTechFilters(newTech);
  };

  return (
    <div id="ProjectFilters">
      <div className="filter-group">
        <legend>
          <h6>Tech</h6>
          {tech.length > 0 && (
            <button type="button" onClick={clearFilters}>
              Clear filter{tech.length !== 1 ? "s" : ""} ({tech.length})
              {/* Clear filter{tech.length !== 1 ? `s ${`(${tech.length})`}` : ""} */}
            </button>
          )}
        </legend>
        <div className="filter-options">
          {TECH_OPTIONS.map((t) => {
            const { icon, isFa } = getTechIcon(t.key);

            return (
              <label key={t.key} className="tech-field">
                <input
                  type="checkbox"
                  value={t.key}
                  checked={tech.includes(t.key)}
                  onChange={() => handleTechChange(t.key)}
                />
                <div className="tech-field--icon">
                  {isFa ? (
                    <FontAwesomeIcon icon={icon} size="xl" />
                  ) : (
                    <>{icon}</>
                  )}
                </div>
                {t.label}
              </label>
            );
          })}
        </div>
      </div>

      <div className="filter-group">
        <legend>
          <h6>Company</h6>
          {company && (
            <button type="button" onClick={clearFilters}>
              Clear
            </button>
          )}
        </legend>
        <div className="filter-options">
          {companies.map((c) => (
            <div key={c.key}>
              <label className="radio-field">
                <div className={`disc${company === c.key ? " checked" : ""}`} />
                <input
                  key={`${c.key}-${company}`}
                  type="radio"
                  name="company" // Same name for all in the group
                  value={c.key}
                  checked={company === c.key}
                  onChange={() => handleCompanyChange(c.key)}
                />
                {c.name}
              </label>
            </div>
          ))}
        </div>
      </div>

      {hasActiveFilters && (
        <button className="clear-filters" onClick={clearFilters} type="button">
          Clear All Filters
        </button>
      )}
    </div>
  );
}

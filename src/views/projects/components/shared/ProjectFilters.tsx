import { TECH_OPTIONS } from "@config/tech";
import type { ProjectFiltersProps } from "@shared";
import { useProjectStore } from "@store/projectStore";
import { getCompanyData, getCompanyKeys } from "./Company/lib/util";

export default function ProjectFilters({}: ProjectFiltersProps) {
  const filters = useProjectStore((state) => state.filters);
  const setCompanyFilters = useProjectStore((state) => state.setCompanyFilters);
  const setTechFilters = useProjectStore((state) => state.setTechFilters);
  const clearFilters = useProjectStore((state) => state.clearFilters);

  const keys = getCompanyKeys();
  const companies = keys.map((k) => ({
    key: k,
    ...getCompanyData(k),
  }));

  const hasActiveFilters =
    filters.companies.length > 0 || filters.tech.length > 0;

  const handleCompanyChange = (companyKey: string) => {
    const newCompanies = filters.companies.includes(companyKey)
      ? filters.companies.filter((c) => c !== companyKey)
      : [...filters.companies, companyKey];
    setCompanyFilters(newCompanies);
  };

  const handleTechChange = (techKey: string) => {
    const newTech = filters.tech.includes(techKey)
      ? filters.tech.filter((t) => t !== techKey)
      : [...filters.tech, techKey];
    setTechFilters(newTech);
  };

  return (
    <div id="ProjectFilters">
      <div className="filter-group">
        <details>
          <summary>
            Companies
            {filters.companies.length > 0 && (
              <span className="filter-count">({filters.companies.length})</span>
            )}
          </summary>
          <div className="filter-options">
            {companies.map((c) => (
              <label key={c.key}>
                <input
                  type="checkbox"
                  value={c.key}
                  checked={filters.companies.includes(c.key)}
                  onChange={() => handleCompanyChange(c.key)}
                />
                {c.name}
              </label>
            ))}
          </div>
        </details>
      </div>

      <div className="filter-group">
        <details>
          <summary>
            Technologies
            {filters.tech.length > 0 && (
              <span className="filter-count">({filters.tech.length})</span>
            )}
          </summary>
          <div className="filter-options">
            {TECH_OPTIONS.map((tech) => (
              <label key={tech.key}>
                <input
                  type="checkbox"
                  value={tech.key}
                  checked={filters.tech.includes(tech.key)}
                  onChange={() => handleTechChange(tech.key)}
                />
                {tech.label}
              </label>
            ))}
          </div>
        </details>
      </div>

      {hasActiveFilters && (
        <button className="clear-filters" onClick={clearFilters} type="button">
          Clear All Filters
        </button>
      )}
    </div>
  );
}

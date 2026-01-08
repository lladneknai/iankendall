import { useSearchParams } from "react-router-dom";
import { TECH_OPTIONS } from "@config/tech";
import type { ProjectFiltersProps } from "@shared";
import { getCompanyData, getCompanyKeys } from "./Company/lib/util";
import { getTechIcon } from "./Tech/lib/util";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ProjectFilters({}: ProjectFiltersProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  // Read from URL
  const company = searchParams.get("company") || "";
  const tech = searchParams.get("tech")?.split(",").filter(Boolean) || [];

  const keys = getCompanyKeys();
  const companies = keys.map((k) => ({
    key: k,
    ...getCompanyData(k),
  }));

  const hasActiveFilters = company.length > 0 || tech.length > 0;

  const handleCompanyChange = (companyKey: string) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      newParams.set("company", companyKey);
      return newParams;
    });
  };

  const handleTechChange = (techKey: string) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      const currentTech = prev.get("tech")?.split(",").filter(Boolean) || [];

      const newTech = currentTech.includes(techKey)
        ? currentTech.filter((t) => t !== techKey)
        : [...currentTech, techKey];

      if (newTech.length > 0) {
        newParams.set("tech", newTech.join(","));
      } else {
        newParams.delete("tech");
      }

      return newParams;
    });
  };

  const clearFilters = () => {
    setSearchParams({});
  };

  return (
    <div id="ProjectFilters">
      <div className="filter-group">
        <legend>
          <h4>Tech</h4>
          {hasActiveFilters && (
            <button type="button" onClick={clearFilters}>
              Clear filters
            </button>
          )}
        </legend>
        <div className="filter-options">
          {TECH_OPTIONS.map((t) => {
            const isChecked = tech.includes(t.key);
            const { icon, isFa } = getTechIcon(t.key);

            return (
              <label
                key={t.key}
                className={`tech-field ${isChecked ? "checked" : ""}`}
              >
                <input
                  type="checkbox"
                  value={t.key}
                  checked={isChecked}
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
          <h4>Shop</h4>
          {hasActiveFilters && (
            <button type="button" onClick={clearFilters}>
              Clear filters
            </button>
          )}
        </legend>
        <div className="filter-options">
          {companies.map((c) => {
            const isChecked = company === c.key;

            return (
              <div key={c.key}>
                <label className={`radio-field${isChecked ? " checked" : ""}`}>
                  <div className={`disc${isChecked ? " checked" : ""}`}>
                    <div
                      className={`disc-inner${isChecked ? " checked" : ""}`}
                    />
                  </div>
                  <input
                    key={`${c.key}-${company}`}
                    type="radio"
                    name="company"
                    value={c.key}
                    checked={company === c.key}
                    onChange={() => handleCompanyChange(c.key)}
                  />
                  <div
                    className="radio-field--icon"
                    id={`radio-field--icon-${c.key}`}
                  >
                    <img src={c.icon} />
                  </div>
                  {c.name}
                </label>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

import { TECH_OPTIONS } from "@config/tech";
import { getTechIcon } from "../../shared/Tech/lib/util";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ClearButton from "./ClearButton";

export default function TechFilters({
  handleFilterChange,
  handleFilterClear,
  isLoadingList,
  techFilters,
}: any) {
  // RM unwanted filters from this list
  const techFilterOptions = TECH_OPTIONS.filter(
    (t: any) => !["bash"].includes(t)
  );

  return (
    <div className="filter-group">
      <legend>
        <h4>Tech</h4>
      </legend>
      <p>
        {techFilters.length === 0 && <>Filter by stack component.</>}
        {techFilters.length > 0 && (
          <>
            <ClearButton
              clearLabel={`Clear tech filters (${techFilters.length})`}
              filterCount={techFilters.length}
              handleClick={() => handleFilterClear("tech")}
              isVisible={techFilters.length > 0}
            />
            &nbsp;
          </>
        )}
      </p>

      <div className="filter-options">
        {techFilterOptions.map((t) => {
          const isChecked = techFilters.includes(t.key);
          const { icon, isFa } = getTechIcon(t.key);

          return (
            <label
              key={t.key}
              className={`tech-field ${isChecked ? "checked" : ""}${
                isLoadingList ? " skeleton" : ""
              }`}
            >
              <input
                type="checkbox"
                value={t.key}
                checked={isChecked}
                onChange={() => handleFilterChange("tech", t.key)}
              />
              <div className="tech-field--icon">
                {isFa ? <FontAwesomeIcon icon={icon} size="xl" /> : <>{icon}</>}
              </div>
              {t.label}
            </label>
          );
        })}
      </div>
    </div>
  );
}

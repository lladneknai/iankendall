import { getCompanyData, getCompanyKeys } from "../../shared/Company/lib/util";
import ClearButton from "./ClearButton";

export default function CompanyFilters({
  companyFilter,
  handleFilterChange,
  handleFilterClear,
  isLoadingList,
}: any) {
  // Get option list from static config
  const keys = getCompanyKeys();
  const companyOptions = keys.map((k) => ({
    key: k,
    ...getCompanyData(k),
  }));

  return (
    <div className="filter-group">
      <legend>
        <h4>Company</h4>
      </legend>
      <p>
        Filter by company.
        {companyFilter && (
          <ClearButton
            isVisible={companyFilter.length > 0}
            handleClick={() => handleFilterClear("company")}
            clearLabel="(Show All)"
          />
        )}
      </p>
      <div className="filter-options">
        {companyOptions.map((c) => {
          const isChecked = companyFilter === c.key;

          return (
            <div key={c.key}>
              <label
                className={`radio-field${isChecked ? " checked" : ""}${
                  isLoadingList ? " skeleton" : ""
                }`}
              >
                <div className={`disc${isChecked ? " checked" : ""}`}>
                  <div className={`disc-inner${isChecked ? " checked" : ""}`} />
                </div>
                <input
                  key={`${c.key}-${companyFilter}`}
                  type="radio"
                  name="company"
                  value={c.key}
                  checked={companyFilter === c.key}
                  onChange={() => handleFilterChange("company", c.key)}
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
  );
}

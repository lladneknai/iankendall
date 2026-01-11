import { useSearchParams } from "react-router-dom";
import TechFilters from "./components/TechFilters";
import CompanyFilters from "./components/CompanyFilters";
import ClearButton from "./components/ClearButton";

/**
 * PROJECTS | Project Filters
 * - Allow users to filter projects based on certain criteria
 * - Uses the URL as the SINGLE SOURCE OF TRUTH, allowing filtration on load
 */
export default function ProjectFilters({
  isLoadingList = false,
}: {
  isLoadingList?: boolean;
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const companyFilter = searchParams.get("company") || "";
  const techFilters =
    searchParams.get("tech")?.split(",").filter(Boolean) || [];

  const handleFilterChange = (key: string, value: string) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      if (key === "company") {
        newParams.set("company", value);
      } else if (key === "tech") {
        const currentTech = prev.get("tech")?.split(",").filter(Boolean) || [];

        const newTech = currentTech.includes(value)
          ? currentTech.filter((t) => t !== value)
          : [...currentTech, value];

        if (newTech.length > 0) {
          newParams.set("tech", newTech.join(","));
        } else {
          newParams.delete("tech");
        }
      }
      return newParams;
    });
  };

  const clearFilters = (key = "") => {
    if (key) {
      setSearchParams((prev) => {
        const newParams = new URLSearchParams(prev);
        newParams.delete(key);
        return newParams;
      });
    } else {
      setSearchParams({});
    }
  };

  return (
    <div id="ProjectFilters">
      <TechFilters
        handleFilterChange={handleFilterChange}
        handleFilterClear={clearFilters}
        isLoadingList={isLoadingList}
        techFilters={techFilters}
      />
      <CompanyFilters
        companyFilter={companyFilter}
        handleFilterClear={clearFilters}
        handleFilterChange={handleFilterChange}
        isLoadingList={isLoadingList}
      />
      <ClearButton
        isClearAll
        isVisible={companyFilter || techFilters.length > 0}
        handleClick={() => clearFilters()}
      />
    </div>
  );
}

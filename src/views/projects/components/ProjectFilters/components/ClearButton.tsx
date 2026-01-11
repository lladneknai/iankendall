import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ClearButton({
  clearLabel = "",
  handleClick,
  isClearAll = false,
  filterCount,
  isVisible,
}: any) {
  if (!isVisible) {
    return null;
  }

  return (
    <button
      className={isClearAll ? "btn btn--clear-all-filters" : ""}
      onClick={handleClick}
      type="button"
    >
      {isClearAll && <FontAwesomeIcon icon={faCircleXmark} />}
      {isClearAll
        ? "Clear All Filters"
        : clearLabel
        ? clearLabel
        : `Clear (${filterCount})`}
      {/* // : `Clear ${filterCount === 1 ? "1 filter" : `${filterCount} filters`}`} */}
    </button>
  );
}

import { useMemo } from "react";

/**
 * LOADING BAR | Shareable bar indicating loading progres
 */
const LoadingBar = ({
  color = "#63a375",
  height = 1,
  isLoading,
}: {
  color?: string;
  height?: number;
  isLoading: boolean;
}) => {
  const backgroundColor = useMemo(
    () => (isLoading ? color : "transparent"),
    [isLoading]
  );
  return (
    <div className="loading-bar-root" style={{ height: `${height}px` }}>
      <div
        className="loading-bar-bar loading-bar-indeterminate1"
        style={{ backgroundColor }}
      />
      <div
        className="loading-bar-bar loading-bar-indeterminate2"
        style={{ backgroundColor }}
      />
    </div>
  );
};

export default LoadingBar;

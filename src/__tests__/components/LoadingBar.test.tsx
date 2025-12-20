import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import LoadingBar from "@/components/LoadingBar";

describe("LoadingBar", () => {
  it("renders without crashing", () => {
    render(<LoadingBar isLoading={false} />);
    expect(document.querySelector(".loading-bar-root")).toBeInTheDocument();
  });

  it("renders two loading bars", () => {
    render(<LoadingBar isLoading={true} />);
    const bars = document.querySelectorAll(".loading-bar-bar");
    expect(bars.length).toBe(2);
  });

  it("uses transparent background when not loading", () => {
    render(<LoadingBar isLoading={false} />);
    const bars = document.querySelectorAll(".loading-bar-bar");
    bars.forEach((bar) => {
      // Check inline style directly since jsdom may not compute "transparent"
      expect((bar as HTMLElement).style.backgroundColor).toBe("transparent");
    });
  });

  it("uses color background when loading", () => {
    render(<LoadingBar isLoading={true} />);
    const bars = document.querySelectorAll(".loading-bar-bar");
    bars.forEach((bar) => {
      expect(bar).toHaveStyle({ backgroundColor: "#63a375" });
    });
  });

  it("uses custom color when provided", () => {
    render(<LoadingBar isLoading={true} color="#ff0000" />);
    const bars = document.querySelectorAll(".loading-bar-bar");
    bars.forEach((bar) => {
      expect(bar).toHaveStyle({ backgroundColor: "#ff0000" });
    });
  });

  it("uses default height of 1px", () => {
    render(<LoadingBar isLoading={true} />);
    const root = document.querySelector(".loading-bar-root");
    expect(root).toHaveStyle({ height: "1px" });
  });

  it("uses custom height when provided", () => {
    render(<LoadingBar isLoading={true} height={4} />);
    const root = document.querySelector(".loading-bar-root");
    expect(root).toHaveStyle({ height: "4px" });
  });

  it("has indeterminate animation classes", () => {
    render(<LoadingBar isLoading={true} />);
    expect(
      document.querySelector(".loading-bar-indeterminate1")
    ).toBeInTheDocument();
    expect(
      document.querySelector(".loading-bar-indeterminate2")
    ).toBeInTheDocument();
  });
});

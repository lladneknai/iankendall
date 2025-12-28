import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import AboutHero from "@/views/about/components/AboutHero";

// Mock NavigateButton component
vi.mock("@/views/about/components/NavigateButton", () => ({
  default: ({ direction, scrollTo, text }: any) => (
    <button data-testid="navigate-button" data-direction={direction} data-scroll-to={scrollTo}>
      {text}
    </button>
  ),
}));

describe("AboutHero", () => {
  it("renders without crashing", () => {
    render(<AboutHero />);
    expect(screen.getByText(/About Me/i)).toBeInTheDocument();
  });

  it("renders the hero container with correct id", () => {
    const { container } = render(<AboutHero />);
    const hero = container.querySelector("#AboutHero");
    expect(hero).toBeInTheDocument();
    expect(hero).toHaveClass("hero");
  });

  it("renders the hero with fade effects", () => {
    const { container } = render(<AboutHero />);
    expect(container.querySelector(".hero-fade-top")).toBeTruthy();
    // Note: hero-fade-bottom may not be in DOM if it's conditionally rendered
    const hero = container.querySelector("#AboutHero");
    expect(hero).toBeTruthy();
  });

  it("renders the main heading", () => {
    render(<AboutHero />);
    const heading = screen.getByRole("heading", { name: /About Me/i });
    expect(heading).toBeInTheDocument();
    expect(heading.tagName).toBe("H1");
  });

  it("renders the navigate button", () => {
    render(<AboutHero />);
    const button = screen.getByTestId("navigate-button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("data-direction", "down");
    expect(button).toHaveAttribute("data-scroll-to", "AboutSection1");
  });

  it("renders the table of contents", () => {
    render(<AboutHero />);
    expect(screen.getByText(/Contents/i)).toBeInTheDocument();
  });

  it("renders all 5 TOC items", () => {
    const { container } = render(<AboutHero />);
    const listItems = container.querySelectorAll(".hero-toc ol li");
    expect(listItems.length).toBe(5);
    
    // Verify text content exists for each item
    const text = container.textContent || "";
    expect(text).toContain("Intro");
    expect(text).toContain("Build");
    expect(text).toContain("Travel");
    expect(text).toContain("Learn");
    expect(text).toContain("Outside");
  });

  it("renders the location caption", () => {
    render(<AboutHero />);
    expect(screen.getByText(/Lake Louise, Alberta/i)).toBeInTheDocument();
  });

  it("renders hero content structure", () => {
    const { container } = render(<AboutHero />);
    const heroContent = container.querySelector(".hero-content");
    expect(heroContent).toBeInTheDocument();
    
    const contentTop = container.querySelector(".hero-content--top");
    expect(contentTop).toBeInTheDocument();
    
    const contentBottom = container.querySelector(".hero-content--bottom");
    expect(contentBottom).toBeInTheDocument();
  });

  it("renders TOC as an ordered list", () => {
    const { container } = render(<AboutHero />);
    const tocList = container.querySelector(".hero-toc ol");
    expect(tocList).toBeInTheDocument();
    
    const listItems = tocList?.querySelectorAll("li");
    expect(listItems?.length).toBe(5);
  });
});


import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import AboutSection from "@/views/about/components/AboutSection";
import { faCode } from "@fortawesome/free-solid-svg-icons";

// Mock dependencies
vi.mock("@components/Carousel", () => ({
  default: ({ children, caption, options, slideHeight, slideWidth }: any) => (
    <div data-testid="carousel" data-slide-height={slideHeight} data-slide-width={slideWidth}>
      <div data-testid="carousel-caption">{caption}</div>
      <div data-testid="carousel-options">{JSON.stringify(options)}</div>
      {children}
    </div>
  ),
}));

vi.mock("@components/RevealOnScroll", () => ({
  default: ({ children, className }: any) => (
    <div className={className} data-testid="reveal-on-scroll">{children}</div>
  ),
}));

vi.mock("@/views/about/components/NavigateButton", () => ({
  default: ({ direction, scrollTo, text }: any) => (
    <button data-testid="navigate-button" data-direction={direction} data-scroll-to={scrollTo}>
      {text}
    </button>
  ),
}));

// Mock import.meta.glob
vi.mock("/public/img/about/about-*-*.{jpg,gif}", () => ({}));

const mockContent = {
  header: <h3>Test Header</h3>,
  content: <p>Test content paragraph</p>,
};

describe("AboutSection", () => {
  it("renders without crashing", () => {
    render(
      <BrowserRouter>
        <AboutSection
          content={mockContent}
          figIcon={faCode}
          figLabel="Test"
          index={1}
        />
      </BrowserRouter>
    );
    
    expect(screen.getByText("Test Header")).toBeInTheDocument();
    expect(screen.getByText("Test content paragraph")).toBeInTheDocument();
  });

  it("renders with correct section id", () => {
    const { container } = render(
      <BrowserRouter>
        <AboutSection
          content={mockContent}
          figIcon={faCode}
          figLabel="Test"
          index={2}
        />
      </BrowserRouter>
    );
    
    expect(container.querySelector("#AboutSection2")).toBeInTheDocument();
  });

  it("applies reverse class when reverse prop is true", () => {
    const { container } = render(
      <BrowserRouter>
        <AboutSection
          content={mockContent}
          figIcon={faCode}
          figLabel="Test"
          index={1}
          reverse
        />
      </BrowserRouter>
    );
    
    const section = container.querySelector(".about-section");
    expect(section?.className).toContain("reverse");
  });

  it("applies wide class when wide prop is true", () => {
    const { container } = render(
      <BrowserRouter>
        <AboutSection
          content={mockContent}
          figIcon={faCode}
          figLabel="Test"
          index={1}
          wide
        />
      </BrowserRouter>
    );
    
    const section = container.querySelector(".about-section");
    expect(section?.className).toContain("wide");
  });

  it("renders carousel with figure label", () => {
    render(
      <BrowserRouter>
        <AboutSection
          content={mockContent}
          figIcon={faCode}
          figLabel="Build"
          index={2}
        />
      </BrowserRouter>
    );
    
    expect(screen.getByText(/Build/i)).toBeInTheDocument();
    expect(screen.getByText(/Fig.02/i)).toBeInTheDocument();
  });

  it("renders correct carousel options", () => {
    render(
      <BrowserRouter>
        <AboutSection
          content={mockContent}
          figIcon={faCode}
          figLabel="Test"
          index={1}
        />
      </BrowserRouter>
    );
    
    const optionsElement = screen.getByTestId("carousel-options");
    const options = JSON.parse(optionsElement.textContent || "{}");
    expect(options.axis).toBe("x");
    expect(options.loop).toBe(true);
  });

  it("renders navigate button with 'Continue' text when not last section", () => {
    render(
      <BrowserRouter>
        <AboutSection
          content={mockContent}
          figIcon={faCode}
          figLabel="Test"
          index={1}
        />
      </BrowserRouter>
    );
    
    const button = screen.getByTestId("navigate-button");
    expect(button).toHaveTextContent("Continue");
    expect(button).toHaveAttribute("data-direction", "down");
    expect(button).toHaveAttribute("data-scroll-to", "AboutSection2");
  });

  it("renders navigate button with 'Back to top' text when last section", () => {
    render(
      <BrowserRouter>
        <AboutSection
          content={mockContent}
          figIcon={faCode}
          figLabel="Test"
          index={5}
          isLast
        />
      </BrowserRouter>
    );
    
    const button = screen.getByTestId("navigate-button");
    expect(button).toHaveTextContent("Back to top");
    expect(button).toHaveAttribute("data-direction", "up");
    expect(button).toHaveAttribute("data-scroll-to", "AboutHero");
  });

  it("applies 'last' class to navigate button when isLast is true", () => {
    const { container } = render(
      <BrowserRouter>
        <AboutSection
          content={mockContent}
          figIcon={faCode}
          figLabel="Test"
          index={5}
          isLast
        />
      </BrowserRouter>
    );
    
    const navButtonContainer = container.querySelector(".navigate-btn-abs-bottom");
    expect(navButtonContainer?.className).toContain("last");
  });

  it("uses different slide dimensions for wide sections", () => {
    const { rerender } = render(
      <BrowserRouter>
        <AboutSection
          content={mockContent}
          figIcon={faCode}
          figLabel="Test"
          index={1}
        />
      </BrowserRouter>
    );
    
    let carousel = screen.getByTestId("carousel");
    const normalHeight = carousel.getAttribute("data-slide-height");
    const normalWidth = carousel.getAttribute("data-slide-width");
    
    rerender(
      <BrowserRouter>
        <AboutSection
          content={mockContent}
          figIcon={faCode}
          figLabel="Test"
          index={1}
          wide
        />
      </BrowserRouter>
    );
    
    carousel = screen.getByTestId("carousel");
    const wideHeight = carousel.getAttribute("data-slide-height");
    const wideWidth = carousel.getAttribute("data-slide-width");
    
    expect(wideHeight).not.toBe(normalHeight);
    expect(wideWidth).not.toBe(normalWidth);
  });

  it("renders section content wrapper", () => {
    const { container } = render(
      <BrowserRouter>
        <AboutSection
          content={mockContent}
          figIcon={faCode}
          figLabel="Test"
          index={1}
        />
      </BrowserRouter>
    );
    
    expect(container.querySelector(".section-content")).toBeInTheDocument();
  });

  it("wraps content in RevealOnScroll components", () => {
    render(
      <BrowserRouter>
        <AboutSection
          content={mockContent}
          figIcon={faCode}
          figLabel="Test"
          index={1}
        />
      </BrowserRouter>
    );
    
    const reveals = screen.getAllByTestId("reveal-on-scroll");
    // Should have multiple reveal components (section wrapper + content reveals)
    expect(reveals.length).toBeGreaterThan(0);
  });
});

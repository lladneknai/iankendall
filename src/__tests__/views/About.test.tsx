import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import About from "@/views/about/About";

/**
 * About Page Tests
 *
 * Tests the main About page component which displays:
 * - Hero section with navigation and table of contents
 * - 5 distinct sections with carousels and content:
 *   1. Introduction
 *   2. Build (tech skills)
 *   3. Travel/Explore
 *   4. Learn
 *   5. Outside activities
 */

// Mock the Carousel component to avoid complex imports
vi.mock("@components/Carousel", () => ({
  default: ({ children, caption }: any) => (
    <div data-testid="carousel">
      <div data-testid="carousel-caption">{caption}</div>
      {children}
    </div>
  ),
}));

// Mock RevealOnScroll to render children directly
vi.mock("@components/RevealOnScroll", () => ({
  default: ({ children, className }: any) => (
    <div className={className}>{children}</div>
  ),
}));

// Mock import.meta.glob for AboutSection images
vi.mock("/img/about/about-*-*.{jpg,gif}", () => ({}));

const renderAbout = () => {
  return render(
    <BrowserRouter>
      <About />
    </BrowserRouter>
  );
};

describe("About Page", () => {
  it("renders without crashing", () => {
    renderAbout();
    expect(screen.getByText(/About Me/i)).toBeInTheDocument();
  });

  it("renders the About page container", () => {
    const { container } = renderAbout();
    const aboutPage = container.querySelector("#About");
    expect(aboutPage).toBeInTheDocument();
    expect(aboutPage).toHaveClass("page");
  });

  it("renders the hero section", () => {
    const { container } = renderAbout();
    const hero = container.querySelector("#AboutHero");
    expect(hero).toBeInTheDocument();
  });

  it("renders the page content container", () => {
    const { container } = renderAbout();
    const content = container.querySelector("#AboutContent");
    expect(content).toBeInTheDocument();
    expect(content).toHaveClass("content");
  });

  it("renders all 5 about sections", () => {
    const { container } = renderAbout();
    for (let i = 1; i <= 5; i++) {
      const section = container.querySelector(`#AboutSection${i}`);
      expect(section).toBeInTheDocument();
    }
  });

  it("renders intro section with correct content", () => {
    renderAbout();
    expect(screen.getByText(/My name is/i)).toBeInTheDocument();
    expect(screen.getByText(/Ian K./i)).toBeInTheDocument();
  });

  it("renders build section with correct content", () => {
    renderAbout();
    expect(screen.getByText(/build things/i)).toBeInTheDocument();
    expect(screen.getByText(/sleek web products/i)).toBeInTheDocument();
  });

  it("renders explore section with correct content", () => {
    renderAbout();
    expect(screen.getByText(/explore/i)).toBeInTheDocument();
    expect(screen.getByText(/world is a big place/i)).toBeInTheDocument();
  });

  it("renders learn section with correct content", () => {
    renderAbout();
    expect(screen.getByText(/depth of my knowledge/i)).toBeInTheDocument();
    expect(screen.getByText(/wasting my time/i)).toBeInTheDocument();
  });

  it("renders outside section with correct content", () => {
    renderAbout();
    expect(screen.getByText(/go outside/i)).toBeInTheDocument();
    expect(screen.getByText(/Rockies/i)).toBeInTheDocument();
  });

  it("renders tech icons in build section", () => {
    renderAbout();
    const techList = document.querySelector(".about-tech-list");
    expect(techList).toBeInTheDocument();
  });

  it("renders link to contact page", () => {
    renderAbout();
    const contactLink = screen.getByText(/Type me a message!/i).closest("a");
    expect(contactLink).toBeInTheDocument();
    expect(contactLink).toHaveAttribute("href", "/contact");
  });

  it("renders link to projects page", () => {
    const { container } = renderAbout();
    const links = container.querySelectorAll('a[href="/projects"]');
    expect(links.length).toBeGreaterThan(0);
  });

  it("renders multiple section headings with unique content", () => {
    renderAbout();
    expect(screen.getByText(/build things/i)).toBeInTheDocument();
    expect(screen.getByText(/explore/i)).toBeInTheDocument();
    expect(screen.getByText(/go outside/i)).toBeInTheDocument();
  });

  it("renders carousel components for each section", () => {
    renderAbout();
    const carousels = screen.getAllByTestId("carousel");
    expect(carousels).toHaveLength(5);
  });

  it("renders figure captions for each section", () => {
    renderAbout();
    const captions = screen.getAllByTestId("carousel-caption");
    expect(captions).toHaveLength(5);
  });

  it("renders all section labels", () => {
    const { container } = renderAbout();
    const captionText = container.textContent || "";

    // Check that all labels appear in captions
    expect(captionText).toMatch(/Intro/i);
    expect(captionText).toMatch(/Build/i);
    expect(captionText).toMatch(/Travel/i);
    expect(captionText).toMatch(/Learn/i);
    expect(captionText).toMatch(/Outside/i);
  });
});

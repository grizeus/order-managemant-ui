import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { BrowserRouter as Router } from "react-router";
import Container from "../Container";

describe("Container", () => {
  it("renders children correctly", () => {
    const testText = "Test Content";
    render(
      <Router>
        <Container>
          <div>{testText}</div>
        </Container>
      </Router>
    );

    expect(screen.getByText(testText)).toBeInTheDocument();
  });

  it("applies correct CSS classes", () => {
    const { container } = render(
      <Router>
        <Container>
          <div>Test</div>
        </Container>
      </Router>
    );

    const containerElement = container.firstElementChild;
    expect(containerElement).toHaveClass("mx-auto");
    expect(containerElement).toHaveClass("px-5");
    expect(containerElement).toHaveClass("xl:px-8");
  });
});

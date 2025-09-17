import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { BrowserRouter } from "react-router";
import Container from "../Container";

describe("Container", () => {
  it("renders children correctly", () => {
    const testText = "Test Content";
    render(
      <BrowserRouter>
        <Container>
          <div>{testText}</div>
        </Container>
      </BrowserRouter>
    );

    expect(screen.getByText(testText)).toBeInTheDocument();
  });

  it("applies correct CSS classes", () => {
    const { container } = render(
      <BrowserRouter>
        <Container>
          <div>Test</div>
        </Container>
      </BrowserRouter>
    );

    const containerElement = container.firstElementChild;
    expect(containerElement).toHaveClass("mx-auto");
    expect(containerElement).toHaveClass("px-5");
    expect(containerElement).toHaveClass("xl:px-8");
  });
});

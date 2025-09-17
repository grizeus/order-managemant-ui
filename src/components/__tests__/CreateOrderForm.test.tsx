import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { BrowserRouter } from "react-router";
import { CreateOrderForm } from "../CreateOrderForm";
import { orderApi } from "../../api/orderApi";
import "@testing-library/jest-dom";

// Mock the orderApi
vi.mock("../../api/orderApi", () => ({
  orderApi: {
    createOrder: vi.fn(),
  },
}));

describe("CreateOrderForm", () => {
  const mockOnOrderCreated = vi.fn();
  const validUserId = "123e4567-e89b-12d3-a456-426614174000";
  const validProductId = "b024a7bd-31f3-4d7a-a4f0-36a098e67f62";
  const defaultProps = {
    curUserId: validUserId,
    onOrderCreated: mockOnOrderCreated,
  };

  beforeEach(() => {
    vi.clearAllMocks();
    (orderApi.createOrder as any).mockResolvedValue({});
  });

  const renderComponent = (props = {}) => {
    return render(
      <BrowserRouter>
        <CreateOrderForm {...defaultProps} {...props} />
      </BrowserRouter>
    );
  };

  it("renders the form with default values", () => {
    renderComponent();

    expect(screen.getByLabelText(/user id/i)).toHaveValue(validUserId);
    expect(screen.getByLabelText(/product id/i)).toHaveValue(validProductId);
    expect(screen.getByLabelText(/quantity/i)).toHaveValue(1);
    expect(
      screen.getByRole("button", { name: /submit order/i })
    ).toBeInTheDocument();
  });

  it("validates user ID", async () => {
    renderComponent();

    // Clear the product ID field which has a default value
    const userIdInput = screen.getByLabelText(/user id/i);
    fireEvent.change(userIdInput, { target: { value: "" } });

    // Submit the form
    fireEvent.click(screen.getByRole("button", { name: /submit order/i }));

    // Check for validation errors
    await waitFor(() => {
      expect(
        screen.getByText(/Please enter a valid user ID/i)
      ).toBeInTheDocument();
    });

  });
  it("validates product ID", async () => {
    renderComponent();

    // Clear the product ID field which has a default value
    const productIdInput = screen.getByLabelText(/product id/i);
    fireEvent.change(productIdInput, { target: { value: "" } });

    // Submit the form
    fireEvent.click(screen.getByRole("button", { name: /submit order/i }));

    // Check for validation errors
    await waitFor(() => {
      expect(
        screen.getByText(/Please enter a valid product ID/i)
      ).toBeInTheDocument();
    });
  });
});

import type { Order, OrderFormData, User } from "../types";

const API_BASE_URL = import.meta.env.VITE_API_URL;

export const orderApi = {
  async syncUser(token: string, user: User): Promise<{ userId: string }> {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/sync`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        clerkUserId: user.id,
        name: user.fullName,
        email: user.emailAddresses[0]?.emailAddress,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to sync user");
    }
    return response.json();
  },
  async createOrder(orderData: OrderFormData): Promise<Order> {
    const response = await fetch(`${API_BASE_URL}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to create order");
    }

    return response.json();
  },

  async getUserOrders(userId: string): Promise<Order[]> {
    const response = await fetch(`${API_BASE_URL}/orders/${userId}`);

    if (!response.ok) {
      throw new Error("Failed to fetch orders");
    }

    return response.json();
  },
};

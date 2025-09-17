import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { orderApi } from "../api/orderApi";
import type { OrderFormData } from "../types";

const orderFormSchema = z.object({
  userId: z.uuidv4("Please enter a valid user ID"),
  productId: z.uuidv4("Please enter a valid product ID"),
  quantity: z.number().int().positive("Quantity must be at least 1"),
});

type OrderFormSchema = z.infer<typeof orderFormSchema>;

interface CreateOrderFormProps {
  onOrderCreated?: () => void;
  curUserId?: string;
}

export const CreateOrderForm = ({
  onOrderCreated,
  curUserId,
}: CreateOrderFormProps) => {
  const [apiError, setApiError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<OrderFormSchema>({
    resolver: zodResolver(orderFormSchema),
    defaultValues: {
      userId: curUserId || "",
      productId: "b024a7bd-31f3-4d7a-a4f0-36a098e67f62",
      quantity: 1,
    },
  });

  useEffect(() => {
    if (curUserId) {
      setValue("userId", curUserId);
    }
  }, [curUserId, setValue]);

  const onSubmit = async (data: OrderFormData) => {
    setIsSubmitting(true);
    setApiError(null);
    setSuccessMessage(null);

    try {
      await orderApi.createOrder(data);
      setSuccessMessage("Order created successfully!");
      reset();
      onOrderCreated?.();
    } catch (error) {
      setApiError(
        error instanceof Error ? error.message : "An unexpected error occurred"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-charcoal-black mx-auto mt-4 max-w-md rounded-lg p-6 shadow-md">
      <h2 className="text-ivory mb-6 text-center text-2xl font-bold">
        Create New Order
      </h2>

      {apiError && (
        <div className="mb-4 rounded border border-red-400 bg-red-100 p-3 text-red-700">
          {apiError}
        </div>
      )}

      {successMessage && (
        <div className="border-neon mb-4 rounded border bg-green-100 p-3 text-green-700">
          {successMessage}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label
            htmlFor="userId"
            className="text-tarnished block text-sm font-medium">
            User ID
          </label>
          <input
            id="userId"
            type="text"
            {...register("userId")}
            className="focus:border-gainsboro focus:ring-gainsboro mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:outline-none"
            placeholder="Enter user ID"
          />
        </div>

        <div>
          <label
            htmlFor="productId"
            className="text-tarnished block text-sm font-medium">
            Product ID
          </label>
          <input
            id="productId"
            type="text"
            {...register("productId")}
            className="focus:border-gainsboro focus:ring-gainsboro mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:outline-none"
            placeholder="Enter product ID"
          />
          {errors.productId && (
            <p className="mt-1 text-sm text-red-600">
              {errors.productId.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="quantity"
            className="text-tarnished block text-sm font-medium">
            Quantity
          </label>
          <input
            id="quantity"
            type="number"
            min="1"
            {...register("quantity", { valueAsNumber: true })}
            className="focus:border-gainsboro focus:ring-gainsboro mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:outline-none"
          />
          {errors.quantity && (
            <p className="mt-1 text-sm text-red-600">
              {errors.quantity.message}
            </p>
          )}
        </div>

        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`bg-royal flex w-full justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium transition-colors duration-300 ease-in-out text-white shadow-sm hover:bg-royal/80 focus:ring-2 focus:ring-royal/80 focus:ring-offset-2 focus:outline-none ${isSubmitting ? "cursor-not-allowed opacity-70" : ""}`}>
            {isSubmitting ? "Submitting..." : "Submit Order"}
          </button>
        </div>
      </form>
    </div>
  );
};

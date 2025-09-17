export interface OrderFormData {
  userId: string;
  productId: string;
  quantity: number;
}

export interface Order {
  id: string;
  product: {
    id: string;
    name: string;
    price: number;
  };
  quantity: number;
  totalPrice: number;
  createdAt: string;
}

export interface User {
  id: string;
  fullName: string;
  emailAddresses: {emailAddress: string}[];
}

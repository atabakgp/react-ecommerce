export interface OrderItem {
    productId: number | string;
    name: string;
    price: number;
    quantity: number;
  }
  
  export interface Order {
    id?: string;
    userId: string;
    items: OrderItem[];
    totalAmount: number;
    shipping: {
      name: string;
      email: string;
      address: string;
    };
    createdAt?: any;
  }
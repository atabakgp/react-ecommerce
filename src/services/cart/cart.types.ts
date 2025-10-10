export interface CartItem {
    productId: number;
    name: string;
    price: number;
    image: string;
    quantity: number;
  }
  
  export interface Cart {
    items: CartItem[];
  }
  
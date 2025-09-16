export interface BasketItem {
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export interface Basket {
  items: BasketItem[];
}

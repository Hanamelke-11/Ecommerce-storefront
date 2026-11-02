export type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
  rating: number;
  inStock: boolean;
};

export type CartItem = Product & {
  quantity: number;
};
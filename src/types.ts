export interface Product {
  id: string;
  name: string;
  sku: string;
  bin: string;
  category: string;
  price: number;
  compareAt?: number;
  stock: number;
  part: string;
  spec: string;
  image: string;
  brand: string;
  rating: number;
  reviews: number;
  badge?: "bestseller" | "new" | null;
  fastShip: boolean;
  description: string;
}

export interface CartLine {
  product: Product;
  quantity: number;
}

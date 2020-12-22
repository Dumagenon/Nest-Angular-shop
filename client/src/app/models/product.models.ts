export interface ProductPrice {
  oldPrice: number;
  newPrice?: number;
}

export interface Product {
  sku: string;
  name: string;
  brand: string;
  img: string;
  price: ProductPrice;
  amount: number;
}

export interface ProductsResponse {
  items: Product[];
  total: number;
}

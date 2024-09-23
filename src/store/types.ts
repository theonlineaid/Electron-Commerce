export interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    category: string;
    image: string;
  }
  
  export interface CartState {
    items: Product[];
    // loading: boolean;
  }
  
  export interface ProductsState {
    items: Product[];
    loading: boolean;
    singleProduct: Product | null;
  }
  
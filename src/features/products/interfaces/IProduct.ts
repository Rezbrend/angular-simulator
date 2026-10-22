export interface IProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string;
  dimensions: {
    width: number;
    height: number;
    unit: string;
  };
  warranty: string;
  shipping: {
    warranty: number;
    delivery: {
      international: boolean;
      time: {
        min: number;
        max: number;
        unit: string;
      };
    };
  };
}

export interface IDimensions {
    width: number;
    height: number;
    depth: number;
  }
  
  export interface IReview {
    rating: number;
    comment: string;
    date: string;
    reviewerName: string;
    reviewerEmail: string;
  }
  
  export interface IMeta {
    createdAt: string;
    updatedAt: string;
    barcode: string;
    qrCode: string;
  }
  
  export interface IProduct {
    id: number;
    title: string;
    description: string;
    category: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    tags: string[];
    brand: string;
    sku: string;
    weight: number;
    dimensions: IDimensions;
    warrantyInformation: string;
    shippingInformation: string;
    availabilityStatus: string;
    reviews: IReview[];
    returnPolicy: string;
    minimumOrderQuantity: number;
    meta: IMeta;
    thumbnail: string;
    images: string[];
    isFavorited?: boolean;
  }
  
  export interface IProductsResponse {
    products: IProduct[];
    total: number;
    skip: number;
    limit: number;
  }
  
  export interface ICategoryItem {
    slug: string;
    name: string;
    url: string;
  }
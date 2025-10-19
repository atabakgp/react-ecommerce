import { useParams } from "react-router-dom";
import { useFetchProductById } from "@/hooks/products/useProducts";
import StarRating from "@/components/product/productItem/StarRating";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useCart } from "@/context/CartContext";

const Detail = () => {
  const { productId } = useParams();
  const { data: product, isPending, error } = useFetchProductById(productId);
  const { addItem } = useCart();

  if (isPending) {
    return (
      <div className="container mx-auto py-8 text-center text-gray-500">
        Loading...
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto py-8 text-center text-red-500">
        Failed to load product.
      </div>
    );
  }

  const images =
    product.images?.length > 0
      ? product.images
      : product.thumbnail
      ? [product.thumbnail]
      : [];

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      name: product.title,
      price: product.price,
      image: product.thumbnail,
      quantity: 1,
    });
  };

  return (
    <div className="product-detail py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Product Images */}
          <div className="lg:w-1/2">
            <Swiper
              modules={[Navigation, Pagination]}
              navigation
              pagination={{ clickable: true }}
              spaceBetween={16}
              slidesPerView={1}
              className="w-full h-full"
            >
              {images.map((src, idx) => (
                <SwiperSlide key={idx}>
                  <div className="w-full bg-white flex justify-center items-center">
                    <img
                      src={src}
                      alt={product.title}
                      className="max-w-full max-h-[500px] object-contain"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Product Info */}
          <div className="lg:w-1/2 flex flex-col gap-4">
            <h2 className="text-2xl font-semibold text-gray-800">
              {product.title}
            </h2>

            <div className="flex items-center gap-2 text-gray-700">
              <span className="font-semibold">
                {product.rating?.toFixed?.(1) ?? product.rating}
              </span>
              <StarRating rating={product.rating} />
              <span className="text-gray-500">
                ({product.reviews?.length ?? 0} reviews)
              </span>
            </div>

            <div className="text-2xl font-bold text-gray-900">
              ${product.price}
            </div>
            {product.discountPercentage && (
              <div className="text-green-600 font-medium">
                Save {product.discountPercentage}%
              </div>
            )}

            <div className="text-gray-600">Brand: {product.brand}</div>
            {product.shippingInformation && (
              <div className="text-gray-600">{product.shippingInformation}</div>
            )}
            {product.returnPolicy && (
              <div className="text-gray-600">{product.returnPolicy}</div>
            )}

            <div
              className={`font-medium ${
                product.stock > 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {product.stock > 0
                ? `In stock (${product.stock})`
                : "Out of stock"}
            </div>

            <p className="text-gray-700">{product.description}</p>

            <button
              onClick={handleAddToCart}
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium w-full lg:w-auto"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;

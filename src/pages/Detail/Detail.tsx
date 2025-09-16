import "./Detail.scss";
import { useParams } from "react-router-dom";
import { useFetchProductById } from "@/hooks/products/useProducts";
import StarRating from "@/components/Product/ProductItem/StarRating";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useBasket } from "@/context/BasketContext";

const Detail = () => {
  const { productId } = useParams();
  const { data: product, isPending, error } = useFetchProductById(productId);
  const { AddItem } = useBasket();
  if (isPending) {
    return <div className="product-detail container py-4">Loading...</div>;
  }

  if (error || !product) {
    return (
      <div className="product-detail container py-4">Failed to load product.</div>
    );
  }

  const images = (product.images && product.images.length > 0)
    ? product.images
    : product.thumbnail
    ? [product.thumbnail]
    : [];

  const handleAddToBasket = () => {
    AddItem({
      productId: product.id.toString(),
      name: product.title,
      price: product.price,
      image: product.thumbnail,
      quantity: 1,
    });
  };

  return (
    <div className="product-detail">
      <div className="container py-4">
        <div className="row g-4">
          <div className="col-lg-6">
            <Swiper
              modules={[Navigation, Pagination]}
              navigation
              pagination={{ clickable: true }}
              spaceBetween={16}
              slidesPerView={1}
              style={{ width: "100%", height: "100%" }}
            >
              {images.map((src, idx) => (
                <SwiperSlide key={idx}>
                  <div className="w-100 text-center" style={{ background: "#fff" }}>
                    <img
                      src={src}
                      alt={product.title}
                      style={{ maxWidth: "100%", maxHeight: 500, objectFit: "contain" }}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className="col-lg-6">
            <div className="d-flex flex-column gap-3">
              <h2 className="m-0">{product.title}</h2>
              <div className="d-flex align-items-center gap-2">
                <span className="fw-semibold">{product.rating?.toFixed?.(1) ?? product.rating}</span>
                <StarRating rating={product.rating} />
                <span className="text-muted">({product.reviews?.length ?? 0} reviews)</span>
              </div>

              <div>
                <div className="fs-3 fw-bold">${product.price}</div>
                {product.discountPercentage ? (
                  <div className="text-success">Save {product.discountPercentage}%</div>
                ) : null}
              </div>

              <div className="text-muted">Brand: {product.brand}</div>
              <div className="text-muted">{product.shippingInformation}</div>
              <div className="text-muted">{product.returnPolicy}</div>
              <div className={product.stock > 0 ? "text-success" : "text-danger"}>
                {product.stock > 0 ? `In stock (${product.stock})` : "Out of stock"}
              </div>

              <p className="m-0">{product.description}</p>

              <button className="btn btn-primary" onClick={handleAddToBasket}>Add to Basket</button>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;

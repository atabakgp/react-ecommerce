import "./Detail.scss";
import { useParams } from "react-router-dom";
import { useFetchProductById } from "@/hooks/products/useProducts";
import StarRating from "@/components/Product/ProductItem/StarRating";
// @ts-ignore: types may not be available in the ESLint environment
import { Swiper, SwiperSlide } from "swiper/react";
// @ts-ignore: types may not be available in the ESLint environment
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Detail = () => {
  const { productId } = useParams();
  const { data: product, isPending, error } = useFetchProductById(productId);

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
              <div className="text-muted">Category: {product.category}</div>
              <div className={product.stock > 0 ? "text-success" : "text-danger"}>
                {product.stock > 0 ? `In stock (${product.stock})` : "Out of stock"}
              </div>

              <p className="m-0">{product.description}</p>

              {product.tags && product.tags.length > 0 ? (
                <div className="d-flex flex-wrap gap-2">
                  {product.tags.map((tag) => (
                    <span key={tag} className="badge text-bg-light border">{tag}</span>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;

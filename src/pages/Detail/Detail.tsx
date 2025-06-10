import "./Detail.scss";
import { useRouteLoaderData, useParams } from "react-router-dom";
import { ICategoryItem } from "@/interfaces/categories";

interface DetailProps {}

const Detail = () => {
  let productId = useParams().productId;

  return (
    <div className="product-detail">
        detail page
        {productId}
    </div>
  );
};

export default Detail;

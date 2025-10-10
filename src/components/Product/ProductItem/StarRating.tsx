import { FaStar, FaRegStar, FaRegStarHalfStroke } from "react-icons/fa6";

const StarRating = ({ rating }: { rating: number }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.25 && rating - fullStars < 0.75;
  const roundedUp = rating - fullStars >= 0.75;
  const totalFullStars = fullStars + (roundedUp ? 1 : 0);
  const totalStars = 5;

  const stars = [];

  for (let i = 0; i < totalStars; i++) {
    if (i < fullStars) {
      stars.push(<FaStar key={i} color="#FFC107" />);
    } else if (i === fullStars && hasHalfStar) {
      stars.push(<FaRegStarHalfStroke key={i} color="#FFC107" />);
    } else if (i < totalFullStars) {
      stars.push(<FaStar key={i} color="#FFC107" />);
    } else {
      stars.push(<FaRegStar key={i} color="#FFC107" />);
    }
  }

  return <div className="flex gap-1">{stars}</div>;
};

export default StarRating;

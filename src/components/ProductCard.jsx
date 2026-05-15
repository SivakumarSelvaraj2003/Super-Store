import { useState } from "react";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="product-card">
      <div className="image-container">
        {!imageLoaded && <div className="skeleton"></div>}

        <img
          src={product.image}
          alt={product.title}
          onLoad={() => setImageLoaded(true)}
          className={`product-image ${imageLoaded ? "loaded" : ""}`}
        />
      </div>

      <div className="product-info">
        <h3>{product.title}</h3>
        <p className="price">${product.price.toFixed(2)}</p>
        <Link to={`/product/${product.id}`} className="btn">
          View Details
        </Link>
      </div>
    </div>
  );
}

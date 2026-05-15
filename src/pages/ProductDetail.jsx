import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Product not found");
        return res.json();
      })
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading)
    return (
      <div className="loader-wrapper">
        <div className="spinner"></div>
      </div>
    );

  if (error) return <div className="state-message error">{error}</div>;
  if (!product) return null;

  return (
    <div className="container">
      <header className="shop-header">
        <div className="shop-logo">Super Store.</div>
        <div className="page-title">Product Details</div>
      </header>

      <div className="detail-container">
        <Link to="/" className="back-link">
          ← Continue Shopping
        </Link>
        <div className="detail-layout">
          <div className="detail-image">
            {!imageLoaded && <div className="skeleton"></div>}

            <img
              src={product.image}
              alt={product.title}
              onLoad={() => setImageLoaded(true)}
              className={`product-image ${imageLoaded ? "loaded" : ""}`}
            />
          </div>
          <div className="detail-info">
            <span className="badge">{product.category}</span>
            <h2>{product.title}</h2>

            <div className="rating">
              ★ {product.rating.rate} / 5 ({product.rating.count} Reviews)
            </div>

            <p className="price">${product.price.toFixed(2)}</p>
            <p className="description">{product.description}</p>

          
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import useDebounce from "../hooks/useDebounce";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [visibleCount, setVisibleCount] = useState(8);

  const debouncedSearch = useDebounce(searchTerm, 300);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [productsRes, categoriesRes] = await Promise.all([
          fetch("https://fakestoreapi.com/products"),
          fetch("https://fakestoreapi.com/products/categories"),
        ]);

        if (!productsRes.ok || !categoriesRes.ok)
          throw new Error("Failed to fetch data");

        const productsData = await productsRes.json();
        const categoriesData = await categoriesRes.json();

        setProducts(productsData);
        setCategories(categoriesData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    let result = products;

    if (selectedCategory) {
      result = result.filter((p) => p.category === selectedCategory);
    }

    if (debouncedSearch) {
      result = result.filter((p) =>
        p.title.toLowerCase().includes(debouncedSearch.toLowerCase()),
      );
    }

    setFilteredProducts(result);
    setVisibleCount(8); 
  }, [debouncedSearch, selectedCategory, products]);
 
  if (loading)
    return (
      <div className="loader-wrapper">
        <div className="spinner"></div>
      </div>
    );

  if (error) return <div className="state-message error">Error: {error}</div>;

  return (
    <div className="container">
      <header className="shop-header">
        <div className="shop-logo">Super Store.</div>
        <div className="page-title">Our Products</div>
      </header>

      <div className="filters">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="category-select"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className="product-grid">
        {filteredProducts.slice(0, visibleCount).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="state-message">No products found.</div>
      )}

      {visibleCount < filteredProducts.length && (
        <div className="load-more-container">
          <button
            className="btn-secondary"
            onClick={() => setVisibleCount((v) => v + 8)}
          >
            Load More Products
          </button>
        </div>
      )}
    </div>
  );
}

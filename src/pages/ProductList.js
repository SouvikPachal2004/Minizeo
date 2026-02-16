import React, { useState, useEffect } from 'react';
import { fetchProducts } from '../services/api';
import ProductCard from '../components/ProductCard';
import { useCart } from '../context/CartContext';
import './ProductList.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { cart, addToCart } = useCart();

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchProducts();
        setProducts(data.products || []);
        setFilteredProducts(data.products || []);
      } catch (err) {
        setError('Failed to load products. Please try again later.');
        console.error('Error loading products:', err);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  useEffect(() => {
    if (searchTerm === '') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [searchTerm, products]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p className="error-message">{error}</p>
        <button 
          className="retry-button" 
          onClick={() => window.location.reload()}
        >
          Try Again
        </button>
      </div>
    );
  }

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="product-list-container">
      <h1 className="page-title">Our Products</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>
      <div className="products-grid">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {filteredProducts.length === 0 && searchTerm && (
        <div className="no-results">
          <p>No products found matching "{searchTerm}"</p>
        </div>
      )}
    </div>
  );
};

export default ProductList;
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProductById } from '../services/api';
import './ProductDetails.css';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchProductById(id);
        setProduct(data);
      } catch (err) {
        setError('Failed to load product details. Please try again later.');
        console.error('Error loading product:', err);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  const handleBackToProducts = () => {
    navigate('/');
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading product details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p className="error-message">{error}</p>
        <button 
          className="retry-button" 
          onClick={() => navigate('/')}
        >
          Back to Products
        </button>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="error-container">
        <p className="error-message">Product not found</p>
        <button 
          className="retry-button" 
          onClick={() => navigate('/')}
        >
          Back to Products
        </button>
      </div>
    );
  }

  return (
    <div className="product-details-container">
      <button className="back-button" onClick={handleBackToProducts}>
        ← Back to Products
      </button>
      
      <div className="product-details-content">
        <div className="product-image-large">
          <img 
            src={product.thumbnail} 
            alt={product.title} 
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/500x500?text=No+Image';
            }}
          />
        </div>
        
        <div className="product-info-details">
          <h1 className="product-title">{product.title}</h1>
          <p className="product-price">${product.price}</p>
          <div className="product-availability">
            <span className={`availability-status ${product.stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
              {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
            </span>
          </div>
          <div className="product-description">
            <h3>Description</h3>
            <p>{product.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
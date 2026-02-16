import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import ProductList from './pages/ProductList';
import ProductDetails from './pages/ProductDetails';
import CartDisplay from './components/CartDisplay';
import './App.css';

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="App">
          <CartDisplay />
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/products/:id" element={<ProductDetails />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;

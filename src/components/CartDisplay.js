import React from 'react';
import { useCart } from '../context/CartContext';
import './CartDisplay.css';

const CartDisplay = () => {
  const { cart, getTotalItems, getTotalPrice } = useCart();

  if (cart.length === 0) {
    return null;
  }

  return (
    <div className="cart-display">
      <div className="cart-summary">
        <h3>Cart ({getTotalItems()} items)</h3>
        <p>Total: ${getTotalPrice().toFixed(2)}</p>
      </div>
      <div className="cart-items">
        {cart.map(item => (
          <div key={item.id} className="cart-item">
            <span>{item.title}</span>
            <span>Qty: {item.quantity}</span>
            <span>${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CartDisplay;
import React, { useState, useEffect } from 'react';
import './Cart.css';
import Navbar from '../Navbar/Navbar';


const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [isPromoApplied, setIsPromoApplied] = useState(false);

  // Promo codes
  const promoCodes = {
    'SPICE10': { discount: 10, description: '10% off your order' },
    'FIRST20': { discount: 20, description: '20% off for first-time buyers' },
    'SAVE15': { discount: 15, description: '15% off on orders above $50' }
  };

  // Load cart items from localStorage on component mount
  useEffect(() => {
    loadCartItems();
  }, []);

  const loadCartItems = () => {
    try {
      const savedCart = localStorage.getItem('spiceCart');
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        setCartItems(parsedCart);
      }
    } catch (error) {
      console.error('Error loading cart:', error);
    } finally {
      setLoading(false);
    }
  };

  // Save cart items to localStorage
  const saveCartItems = (items) => {
    localStorage.setItem('spiceCart', JSON.stringify(items));
    setCartItems(items);
  };

  // Update item quantity
  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) {
      removeItem(itemId);
      return;
    }

    const updatedItems = cartItems.map(item =>
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    );
    saveCartItems(updatedItems);
  };

  // Remove item from cart
  const removeItem = (itemId) => {
    const updatedItems = cartItems.filter(item => item.id !== itemId);
    saveCartItems(updatedItems);
    
    // Show confirmation
    const removedItem = cartItems.find(item => item.id === itemId);
    if (removedItem) {
      alert(`${removedItem.name} removed from cart`);
    }
  };

  // Clear entire cart
  const clearCart = () => {
    if (window.confirm('Are you sure you want to clear your entire cart?')) {
      localStorage.removeItem('spiceCart');
      setCartItems([]);
      setDiscount(0);
      setIsPromoApplied(false);
      setPromoCode('');
    }
  };

  // Apply promo code
  const applyPromoCode = () => {
    const code = promoCode.toUpperCase();
    if (promoCodes[code]) {
      setDiscount(promoCodes[code].discount);
      setIsPromoApplied(true);
      alert(`Promo code applied! ${promoCodes[code].description}`);
    } else {
      alert('Invalid promo code');
      setDiscount(0);
      setIsPromoApplied(false);
    }
  };

  // Remove promo code
  const removePromoCode = () => {
    setPromoCode('');
    setDiscount(0);
    setIsPromoApplied(false);
  };

  // Calculate totals
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const discountAmount = (subtotal * discount) / 100;
  const tax = (subtotal - discountAmount) * 0.08; // 8% tax
  const shipping = subtotal > 50 ? 0 : 5.99; // Free shipping over $50
  const total = subtotal - discountAmount + tax + shipping;

  // Proceed to checkout
  const proceedToCheckout = () => {
    if (cartItems.length === 0) {
      alert('Your cart is empty!');
      return;
    }

    // Here you would typically navigate to checkout page or integrate with payment gateway
    const orderSummary = {
      items: cartItems,
      subtotal: subtotal.toFixed(2),
      discount: discountAmount.toFixed(2),
      tax: tax.toFixed(2),
      shipping: shipping.toFixed(2),
      total: total.toFixed(2),
      promoCode: isPromoApplied ? promoCode : null
    };

    console.log('Order Summary:', orderSummary);
    alert('Proceeding to checkout... (Check console for order details)');
    
    // For demo purposes - you would replace this with actual checkout logic
    // window.location.href = '/checkout';
  };

  if (loading) {
    return (
      <div className="cart-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading your cart...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      {/* Header */}
      <Navbar/>
      <div className="cart-header">
        <h1>🛒 Shopping Cart</h1>
        <p>Review your selected spices and proceed to checkout</p>
      </div>

      {cartItems.length === 0 ? (
        /* Empty Cart */
        <div className="empty-cart">
          <div className="empty-cart-icon">🛒</div>
          <h2>Your cart is empty</h2>
          <p>Looks like you haven't added any spices to your cart yet.</p>
          <button className="continue-shopping-btn" onClick={() => window.history.back()}>
            🌶️ Continue Shopping
          </button>
        </div>
      ) : (
        <div className="cart-content">
          {/* Cart Items Section */}
          <div className="cart-items-section">
            <div className="cart-items-header">
              <h2>Cart Items ({cartItems.length})</h2>
              <button className="clear-cart-btn" onClick={clearCart}>
                🗑️ Clear Cart
              </button>
            </div>

            <div className="cart-items">
              {cartItems.map(item => (
                <div key={item.id} className="cart-item">
                  <div className="item-image-container">
                    <img src={item.image} alt={item.name} className="item-image" />
                  </div>

                  <div className="item-details">
                    <h3 className="item-name">{item.name}</h3>
                    <p className="item-description">{item.description}</p>
                    <div className="item-category">{item.category}</div>
                    
                    <div className="item-rating">
                      <span className="stars">{'★'.repeat(Math.floor(item.rating))}</span>
                      <span className="rating-text">{item.rating} ({item.reviews} reviews)</span>
                    </div>
                  </div>

                  <div className="item-price">
                    <span className="price">${item.price.toFixed(2)}</span>
                    {item.originalPrice > item.price && (
                      <span className="original-price">${item.originalPrice.toFixed(2)}</span>
                    )}
                  </div>

                  <div className="quantity-controls">
                    <button
                      className="quantity-btn"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      -
                    </button>
                    <span className="quantity">{item.quantity}</span>
                    <button
                      className="quantity-btn"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>

                  <div className="item-total">
                    <span className="total-price">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>

                  <button
                    className="remove-item-btn"
                    onClick={() => removeItem(item.id)}
                    title="Remove from cart"
                  >
                    ❌
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary Section */}
          <div className="order-summary-section">
            <div className="order-summary">
              <h2>Order Summary</h2>

              {/* Promo Code Section */}
              <div className="promo-section">
                <h3>Promo Code</h3>
                {!isPromoApplied ? (
                  <div className="promo-input-container">
                    <input
                      type="text"
                      placeholder="Enter promo code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="promo-input"
                    />
                    <button className="apply-promo-btn" onClick={applyPromoCode}>
                      Apply
                    </button>
                  </div>
                ) : (
                  <div className="applied-promo">
                    <span className="promo-code">{promoCode}</span>
                    <span className="promo-discount">-{discount}%</span>
                    <button className="remove-promo-btn" onClick={removePromoCode}>
                      ❌
                    </button>
                  </div>
                )}

                <div className="available-codes">
                  <small>Try: SPICE10, FIRST20, SAVE15</small>
                </div>
              </div>

              {/* Order Details */}
              <div className="order-details">
                <div className="detail-row">
                  <span>Subtotal ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} items):</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>

                {discount > 0 && (
                  <div className="detail-row discount-row">
                    <span>Discount ({discount}% off):</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}

                <div className="detail-row">
                  <span>Tax (8%):</span>
                  <span>${tax.toFixed(2)}</span>
                </div>

                <div className="detail-row">
                  <span>Shipping:</span>
                  <span>
                    {shipping === 0 ? (
                      <span className="free-shipping">FREE</span>
                    ) : (
                      `$${shipping.toFixed(2)}`
                    )}
                  </span>
                </div>

                {shipping > 0 && (
                  <div className="shipping-info">
                    <small>💡 Add ${(50 - subtotal).toFixed(2)} more for free shipping!</small>
                  </div>
                )}

                <div className="detail-row total-row">
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button className="checkout-btn" onClick={proceedToCheckout}>
                💳 Proceed to Checkout
              </button>

              {/* Continue Shopping */}
              <button
                className="continue-shopping-link"
                onClick={() => window.history.back()}
              >
                ← Continue Shopping
              </button>
            </div>

            {/* Security & Trust */}
            <div className="trust-badges">
              <div className="trust-item">
                <span className="trust-icon">🔒</span>
                <span>Secure Checkout</span>
              </div>
              <div className="trust-item">
                <span className="trust-icon">🚚</span>
                <span>Fast Delivery</span>
              </div>
              <div className="trust-item">
                <span className="trust-icon">↩️</span>
                <span>Easy Returns</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
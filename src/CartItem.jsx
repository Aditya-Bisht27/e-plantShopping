import React from "react";
import "./CartItem.css";

import { useDispatch, useSelector } from "react-redux";
import { removeItem, updateQuantity } from "./CartSlice";

function CartItem({ onContinueShopping }) {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);

  const parseCost = (costStr) => {
    // costStr is like "$15"
    const num = Number(String(costStr).replace("$", "").trim());
    return Number.isFinite(num) ? num : 0;
  };

  const calculateTotalAmount = () => {
    let total = 0;
    for (const item of items) {
      total += parseCost(item.cost) * item.quantity;
    }
    return total;
  };

  const handleContinueShopping = (e) => {
    e.preventDefault();
    onContinueShopping(e);
  };

  const handleCheckoutShopping = () => {
    alert("Functionality to be added for future reference");
  };

  const handleIncrement = (item) => {
    dispatch(
      updateQuantity({
        name: item.name,
        amount: item.quantity + 1,
      })
    );
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(
        updateQuantity({
          name: item.name,
          amount: item.quantity - 1,
        })
      );
    } else {
      // quantity would become 0 -> remove from cart
      dispatch(removeItem(item.name));
    }
  };

  const handleDelete = (item) => {
    dispatch(removeItem(item.name));
  };

  const totalAmount = calculateTotalAmount();

  return (
    <div className="cart-page">
      <h2 className="cart-title">Shopping Cart</h2>

      {items.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty.</p>
          <button className="continue-btn" onClick={handleContinueShopping}>
            Continue Shopping
          </button>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {items.map((item) => {
              const unitPrice = parseCost(item.cost);
              const subtotal = unitPrice * item.quantity;

              return (
                <div className="cart-card" key={item.name}>
                  <div className="cart-left">
                    <img
                      className="cart-thumb"
                      src={item.image}
                      alt={item.name}
                    />
                  </div>

                  <div className="cart-mid">
                    <h3 className="cart-item-name">{item.name}</h3>
                    <p className="cart-item-desc">{item.description}</p>

                    <div className="cart-prices">
                      <p className="cart-unit">
                        Unit: <b>${unitPrice.toFixed(2)}</b>
                      </p>
                      <p className="cart-subtotal">
                        Subtotal: <b>${subtotal.toFixed(2)}</b>
                      </p>
                    </div>
                  </div>

                  <div className="cart-right">
                    <div className="qty-controls">
                      <button
                        className="qty-btn"
                        onClick={() => handleDecrement(item)}
                      >
                        -
                      </button>
                      <span className="qty-value">{item.quantity}</span>
                      <button
                        className="qty-btn"
                        onClick={() => handleIncrement(item)}
                      >
                        +
                      </button>
                    </div>

                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(item)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="cart-summary">
            <h3>
              Total: <span className="total-amount">${totalAmount.toFixed(2)}</span>
            </h3>

            <div className="cart-actions">
              <button className="continue-btn" onClick={handleContinueShopping}>
                Continue Shopping
              </button>
              <button className="checkout-btn" onClick={handleCheckoutShopping}>
                Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default CartItem;
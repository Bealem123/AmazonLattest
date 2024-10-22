import React, { useState } from "react";
import { useDataLayerValue } from "../../Components/Dataprovider/Dataprovider";
import CurrencyFormat from "../../Components/CurrencyFormat/CurrencyFormat";
import { Link } from "react-router-dom";
import styles from "../Cart/Cart.module.css";
import { Rating } from "@mui/material";
import { MdOutlineKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";
import { Type } from "../../Utility/actiontype"; // Importing action types

function Cart() {
  const [{ basket }, dispatch] = useDataLayerValue();
  const [giftOrder, setGiftOrder] = useState(false);

  const getBasketTotal = (basket) =>
    basket?.reduce((amount, item) => item.price * item.count + amount, 0);

  const handleGiftOrderChange = () => {
    setGiftOrder(!giftOrder);
  };

  const incrementItemCount = (id) => {
    dispatch({
      type: Type.INCREMENT, // Use Type object here
      id: id,
    });
  };

  const decrementItemCount = (id) => {
    const item = basket.find((item) => item.id === id); // Find the item in the basket
    if (item.count === 1) {
      // If the count is 1, remove the item
      dispatch({
        type: Type.REMOVE_FROM_BASKET,
        id: id,
      });
    } else {
      // Otherwise, just decrement the count
      dispatch({
        type: Type.DECREMENT, // Use Type object here
        id: id,
      });
    }
  };

  return (
    <div className={styles.cart}>
      <div className={styles.cart_items}>
        <h1>Your Shopping Cart</h1>
        <hr />
        <h2>Hello</h2>
        {basket.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          basket.map((item) => (
            <div key={item.id} className={styles.cart_item}>
              <img src={item.image} alt={item.title} />
              <div className={styles.cart_item_info}>
                <h2>{item.title || "No title available"}</h2>
                <p>{item.description || "No description available"}</p>
                <Rating
                  name={`rating-${item.id}`}
                  value={item.rating?.rate || 0}
                  precision={0.5}
                  readOnly
                />
                <CurrencyFormat amount={item.price * item.count} />
                <div className={styles.cart_item_controls}>
                  <button
                    onClick={() => incrementItemCount(item.id)}
                    className={styles.iconButton}
                  >
                    <MdOutlineKeyboardArrowUp size={20} />
                  </button>
                  <span>{item.count}</span>
                  <button
                    onClick={() => decrementItemCount(item.id)}
                    className={styles.iconButton}
                  >
                    <MdKeyboardArrowDown size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {basket.length > 0 && (
        <div className={styles.cart_subtotal}>
          <h2>
            Subtotal ({basket.length} items):{" "}
            <CurrencyFormat amount={getBasketTotal(basket)} />
          </h2>
          <span>
            <input
              type="checkbox"
              checked={giftOrder}
              onChange={handleGiftOrderChange}
            />
            <small>This order contains a gift</small>
          </span>
          <Link to="/payments">
            <button className={styles.cartButton}>Continue to Checkout</button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Cart;

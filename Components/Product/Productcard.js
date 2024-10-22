import React from "react";
import styles from "./Product.module.css";
import { Rating } from "@mui/material";
import CurrencyFormat from "../CurrencyFormat/CurrencyFormat";
import { Link } from "react-router-dom";
import { useDataLayerValue } from "../Dataprovider/Dataprovider"; // Import your DataProvider
import { Type } from "../../Utility/actiontype"; // Import your action types

function ProductCard({ product, flex, renderDesc }) {
  const { image, title, id, rating, price, description } = product || {};

  const [{ basket }, dispatch] = useDataLayerValue(); // Access the DataLayer

  const addToBasket = () => {
    dispatch({
      type: Type.ADD_TO_BASKET,
      item: {
        id,
        title,
        price,
        image,
        description,
        rating,
      },
    });
  };

  return (
    <div className={`${styles.productCard} ${flex ? styles.flexCard : ""}`}>
      <Link to={`/products/${id}`}>
        <img
          src={image}
          alt={title || "Product image"}
          className={styles.productImage}
        />
      </Link>
      <div className={styles.productDetails}>
        <h2 className={styles.productTitle}>{title || "No title available"}</h2>

        {renderDesc && description && (
          <div className={styles.productDescription}>
            <p>{description}</p>
          </div>
        )}

        {rating?.rate && (
          <Rating
            name="product-rating"
            value={rating?.rate}
            precision={0.5}
            readOnly
          />
        )}

        <p className={styles.productPrice}>
          <CurrencyFormat
            value={price || 0}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"$"}
            decimalScale={2}
            fixedDecimalScale={true}
          />
        </p>

        {/* Add to cart button with dispatch */}
        <button className={styles.button} onClick={addToBasket}>
          Add to cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;

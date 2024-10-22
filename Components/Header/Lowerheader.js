import React from "react";
import { AiOutlineMenu } from "react-icons/ai"; // Import the All icon
import styles from "./Lowerheader.module.css"; // Import the CSS module

function LowerHeader() {
  return (
    <div className={styles["lower-header"]}>
      <div className={styles["lower-header__nav"]}>
        <a href="#deals" className={styles["lower-header__option"]}>
          <AiOutlineMenu className={styles["lower-header__icon"]} /> All
        </a>
        <a href="#customer-service" className={styles["lower-header__option"]}>
          Customer Service
        </a>
        <a href="#gift-cards" className={styles["lower-header__option"]}>
          Gift Cards
        </a>
        <a href="#register" className={styles["lower-header__option"]}>
          Registry
        </a>
        <a href="#sell" className={styles["lower-header__option"]}>
          Sell
        </a>
        <a href="#amazon-business" className={styles["lower-header__option"]}>
          Amazon Business
        </a>
      </div>

      <div className={styles["lower-header__promotions"]}>
        <p></p>
      </div>
    </div>
  );
}

export default LowerHeader;

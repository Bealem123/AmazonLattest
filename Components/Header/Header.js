import React from "react";
import { IoLocation } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import { useDataLayerValue } from "../Dataprovider/Dataprovider"; // Import the Data Layer
import { auth } from "../../Utility/firebase"; // Import the auth object from your Firebase utility
import { Type } from "../../Utility/actiontype"; // Import Type from actiontype
import styles from "./Header.module.css"; // Import styles from Header.module.css
import Lowerheader from "./Lowerheader";

function Header() {
  const [{ basket, user }, dispatch] = useDataLayerValue(); // Access the basket and user from the Data Layer
  const navigate = useNavigate(); // Initialize useNavigate

  const getUsername = (email) => {
    return email ? email.split("@")[0] : "Guest"; // Default to "Guest" if no email
  };

  const handleSignOut = async () => {
    try {
      await auth.signOut(); // Sign out the user
      dispatch({ type: Type.SET_USER, user: null }); // Update global state to remove user
      navigate("/"); // Redirect to the home page after sign out
    } catch (error) {
      console.error("Error signing out:", error); // Log any errors that occur during sign-out
    }
  };

  return (
    <div className={styles.fixed}>
      <div className={styles.header}>
        <Link to="/">
          <img
            className={styles.header__logo}
            src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
            alt="Amazon Logo"
          />
        </Link>

        <div className={styles.header__location}>
          <p className={styles.deliver}>
            <br />
            Deliver to Ethiopia <IoLocation />
          </p>
        </div>

        <div className={styles.header__search}>
          <div className={styles.header__searchContainer}>
            <select className={styles.header__searchDropdown}>
              <option value="all">All</option>
            </select>
            <input
              className={styles.header__searchInput}
              type="text"
              placeholder="Search..."
            />
            <span className={styles.header__searchIcon}>🔍</span>
          </div>
        </div>

        <div className={styles.header__languageDropdown}>
          <Link to="">
            <img
              className={styles.language}
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Flag_of_the_United_States_%28DoS_ECA_Color_Standard%29.svg/510px-Flag_of_the_United_States_%28DoS_ECA_Color_Standard%29.svg.png"
              alt="language"
            />
            <select className={styles.language__select}>
              <option value="en">EN</option>
            </select>
          </Link>
        </div>

        <div className={styles.header__nav}>
          <div className={styles.header__option}>
            <span className={styles.header__optionLineOne}>
              Hello, {getUsername(user?.email)}
            </span>
            {!user ? (
              <Link to="/signin">
                <span
                  className={`${styles.header__optionLineTwo} ${styles.header__optionSignIn}`}
                >
                  SignIn
                </span>
              </Link>
            ) : (
              <span
                className={styles.header__optionLineTwo}
                onClick={handleSignOut}
                style={{ cursor: "pointer" }}
              >
                Sign Out
              </span>
            )}
          </div>
          <div className={styles.header__option}>
            <span className={styles.header__optionLineOne}>Returns</span>
            <Link to="/orders">
              <span className={styles.header__optionLineTwo}>&Orders</span>
            </Link>
          </div>

          {/* Cart / Basket */}
          <div className={styles.header__optionBasket}>
            <Link to="/cart">
              <span role="img" aria-label="shopping cart">
                🛒
              </span>
            </Link>
            <span className={styles.header__basketCount}>
              {basket?.length || 0}
            </span>
          </div>
        </div>
      </div>
      <Lowerheader />
    </div>
  );
}

export default Header;
// import React from "react";
// import { IoLocation } from "react-icons/io5";
// import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
// import { useDataLayerValue } from "../Dataprovider/Dataprovider"; // Import the Data Layer
// import { auth } from "../../Utility/firebase"; // Import the auth object from your Firebase utility
// import { Type } from "../../Utility/actiontype"; // Import Type from actiontype
// import styles from "./Header.module.css"; // Import styles from Header.module.css
// import Lowerheader from "./Lowerheader";

// function Header() {
//   const [{ basket, user }, dispatch] = useDataLayerValue(); // Access the basket and user from the Data Layer
//   const navigate = useNavigate(); // Initialize useNavigate

//   const getUsername = (email) => {
//     return email ? email.split("@")[0] : "Guest"; // Default to "Guest" if no email
//   };

//   const handleSignOut = async () => {
//     try {
//       await auth.signOut(); // Sign out the user
//       dispatch({ type: Type.SET_USER, user: null }); // Update global state to remove user
//       navigate("/"); // Redirect to the home page after sign out
//     } catch (error) {
//       console.error("Error signing out:", error); // Log any errors that occur during sign-out
//     }
//   };

//   return (
//     <div className={styles.fixed}>
//       <div className={styles.header}>
//         <Link to="/">
//           <img
//             className={styles.header__logo}
//             src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
//             alt="Amazon Logo"
//           />
//         </Link>

//         <div className={styles.header__location}>
//           <p className={styles.deliver}>
//             <br />
//             Deliver to
//             Ethiopia <IoLocation />
//           </p>
//         </div>

//         <div className={styles.header__search}>
//           <div className={styles.header__searchContainer}>
//             <select className={styles.header__searchDropdown}>
//               <option value="all">All</option>
//             </select>
//             <input
//               className={styles.header__searchInput}
//               type="text"
//               placeholder="Search..."
//             />
//             <span className={styles.header__searchIcon}>🔍</span>
//           </div>
//         </div>

//         <div className={styles.header__languageDropdown}>
//           <Link to="">
//             <img
//               className={styles.language}
//               src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Flag_of_the_United_States_%28DoS_ECA_Color_Standard%29.svg/510px-Flag_of_the_United_States_%28DoS_ECA_Color_Standard%29.svg.png"
//               alt="language"
//             />
//             <select className={styles.language__select}>
//               <option value="en">EN</option>
//             </select>
//           </Link>
//         </div>

//         <div className={styles.header__nav}>

//           <div className={styles.header__option}>
//             <span className={styles.header__optionLineOne}>
//               Hello, {getUsername(user?.email)}
//             </span>
//             {!user ? (
//               <Link to="/signin">
//                 <span className={styles.header__optionLineTwo}>SignIn</span>
//               </Link>
//             ) : (
//               <span
//                 className={styles.header__optionLineTwo}
//                 onClick={handleSignOut}
//                 style={{ cursor: "pointer" }}
//               >
//                 Sign Out
//               </span>
//             )}
//           </div>
//           <div className={styles.header__option}>
//             <span className={styles.header__optionLineOne}>Returns</span>
//             <Link to="/orders">
//               <span className={styles.header__optionLineTwo}>&Orders</span>
//             </Link>
//           </div>

//           {/* Cart / Basket */}
//           <div className={styles.header__optionBasket}>
//             <Link to="/cart">
//               <span role="img" aria-label="shopping cart">
//                 🛒
//               </span>
//             </Link>
//             <span className={styles.header__basketCount}>
//               {basket?.length || 0}
//             </span>
//           </div>
//         </div>
//       </div>
//       <Lowerheader />
//     </div>
//   );
// }

// export default Header;

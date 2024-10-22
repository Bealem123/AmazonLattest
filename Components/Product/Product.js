import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../Product/Productcard"; // Import your ProductCard component
import styles from "./Product.module.css"; // Assuming you have a CSS module for styling
import Loader from "../Loader/Loader"; // Import your Loader component

function Product() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // State to manage loading

  useEffect(() => {
    // Fetch data from the Fake Store API
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        setProducts(response.data); // Set the fetched products to state
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false); // Set loading to false whether request succeeds or fails
      }
    };

    fetchProducts();
  }, []);

  // Show loader while loading
  if (loading) {
    return <Loader />; // Display loader component
  }

  return (
    <div className={styles.productGrid}>
      {products?.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default Product;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import ProductCard from "../Product/Productcard"; // Import your ProductCard component
// import styles from "./Product.module.css"; // Assuming you have a CSS module for styling
// import Loader from "../Loader/Loader"; // Import your Loader component

// function Product() {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true); // State to manage loading

//   useEffect(() => {
//     // Fetch data from the Fake Store API
//     const fetchProducts = async () => {
//       try {
//         const response = await axios.get("https://fakestoreapi.com/products");
//         setProducts(response.data); // Set the fetched products to state
//       } catch (err) {
//         console.error("Error fetching products:", err);
//       } finally {
//         setLoading(false); // Set loading to false whether request succeeds or fails
//       }
//     };

//     fetchProducts();
//   }, []);

//   // Show loader while loading
//   if (loading) {
//     return <Loader />;
//   }

//   return (
//     <div className={styles.productGrid}>
//       {products?.map((product) => (
//         <ProductCard key={product?.id} product={product} />
//       ))}
//     </div>
//   );
// }

// export default Product;

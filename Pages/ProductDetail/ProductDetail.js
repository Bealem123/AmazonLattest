import React, { useEffect, useState } from "react";
import styles from "./ProductDetail.module.css";
import { useParams } from "react-router-dom";
import Layout from "../../Components/Layout/Layout";
import axios from "axios";
import { Producturl } from "../../Api/endPoints";
import Loader from "../../Components/Loader/Loader"; // Importing the Loader component
import ProductCard from "../../Components/Product/Productcard"; // Corrected the import case

function ProductDetail() {
  const { productID } = useParams();
  const [product, setProduct] = useState(null); // State to store product data
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const response = await axios.get(`${Producturl}/products/${productID}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setLoading(false); // Ensure loading is false after request
      }
    };

    fetchProductDetail();
  }, [productID]);

  if (loading) {
    return (
      <Layout>
        <Loader />
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout>
        <div className={styles.error}>Product not found.</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className={styles.productDetailContainer}>
        {/* Render the ProductCard with the product details and flex prop */}
        <ProductCard product={product} renderDesc={true} flex={true} />
      </div>
    </Layout>
  );
}

export default ProductDetail;

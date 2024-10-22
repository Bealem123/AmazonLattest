import React, { useEffect, useState } from "react";
import Classes from "../Results/Results.module.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Producturl } from "../../Api/endPoints";
import ProductCard from "../../Components/Product/Productcard"; // Import the ProductCard component
import Layout from "../../Components/Layout/Layout";
import Loader from "../../Components/Loader/Loader"; // Assuming you have a Loader component

function Results() {
  const { title } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Loader state to show spinner

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Fetch products by category from API
        const response = await axios.get(
          `${Producturl}/products/category/${title}`
        );
        setProducts(response.data); // Set products data
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false); // Stop loading after fetch
      }
    };

    fetchProducts();
  }, [title]); // Re-fetch when 'title' changes

  if (loading) {
    return (
      <Layout>
        <div className={Classes.loaderContainer}>
          <Loader /> {/* Display loader while loading */}
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className={Classes.results}>
        <h1>Results for: {title}</h1>
        <div className={Classes.productsGrid}>
          {products?.length > 0 ? (
            products?.map((product) => (
              <ProductCard key={product?.id} product={product} />
            ))
          ) : (
            <p>No products found for this category.</p>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default Results;

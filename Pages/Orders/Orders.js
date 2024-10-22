
import React, { useEffect, useState } from "react";
import Classes from "./Orders.module.css";
import Layout from "../../Components/Layout/Layout";
import { db } from "../../Utility/firebase"; // Firestore instance
import { collection, query, orderBy, onSnapshot } from "firebase/firestore"; // Firestore methods
import { useDataLayerValue } from "../../Components/Dataprovider/Dataprovider"; // Hook for accessing global state
import ProductCard from "../../Components/Product/Productcard"; // Import ProductCard component
import CurrencyFormat from "../../Components/CurrencyFormat/CurrencyFormat";

function Orders() {
  const [{ user, basket }] = useDataLayerValue(); // Access user and basket from global state
  const [orders, setOrders] = useState([]); // State to store orders

  // Fetch user's orders from Firestore when user is logged in
  useEffect(() => {
    if (user) {
      const ordersRef = collection(db, "users", user.uid, "orders"); // Reference to user's orders
      const q = query(ordersRef, orderBy("created", "desc")); // Query for ordering by creation date

      // Clear orders before adding new data to avoid accumulation
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const ordersData = snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }));
        console.log("Fetched Orders:", ordersData); // Debug: Inspect fetched data
        setOrders([...ordersData]); // Always replace the old state with fresh data
      });

      // Cleanup Firestore listener on component unmount
      return () => unsubscribe();
    } else {
      setOrders([]); // Clear orders when the user is not logged in
    }
  }, [user]);

  return (
    <Layout>
      <section className={Classes.container}>
        <div className={Classes.orders__container}>
          <hr></hr>
          <h2>Your Orders</h2>
          <div>
            {/* Check if the user has no previous orders */}
            {orders.length === 0 ? (
              <p>
                {basket.length === 0
                  ? "You have no orders yet. Start shopping!"
                  : "You have items in your cart but no previous orders."}
              </p>
            ) : (
              orders.map((order) => (
                <div key={order.id} className={Classes.order}>
                  <p>Order ID: {order.id}</p>
                  <p>
                    Order Date: {new Date(order.data.created).toLocaleString()}
                  </p>
                  <h3>Items:</h3>
                  <div className={Classes.order__products}>
                    {/* Render products in each order without the Add to Cart button */}
                    {order.data.basket?.map((product, index) => (
                      <ProductCard
                        key={index}
                        product={{
                          id: product.id,
                          image:
                            product.image || "https://via.placeholder.com/150", // Fallback image
                          price: product.price || 0,
                          title: product.title || "No title available",
                          rating: { rate: product.rating || 0, count: 0 },
                          showAddToCart: false, // Prevent showing Add to Cart button
                        }}
                      />
                    ))}
                  </div>
                  <p>
                    Total Amount:{" "}
                    <CurrencyFormat
                      amount={order.data.amount || 0} // Fallback to 0 if missing
                    />
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default Orders;


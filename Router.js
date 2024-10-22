import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./Pages/Landing/Landing";
import Signin from "./Pages/Auth/Signin";
import Payment from "./Pages/Payment/Payment";
import Orders from "./Pages/Orders/Orders";
import Cart from "./Pages/Cart/Cart";
import Results from "./Pages/Results/Results";
import ProductDetail from "./Pages/ProductDetail/ProductDetail";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import { DataProvider } from "../src/Components/Dataprovider/Dataprovider"; // Import DataProvider
import reducer, { initialState } from "../src/Utility/reducer"; // Assume you have a reducer and initialState
const stripePromise = loadStripe(
  "pk_test_51PzYr1EVVphPays7D7wHr7ZXPHqNiPuoDJ9UaPaylrPvKW2UI7iKRsxct3E4asQfMiWvpBvCr4HrcDA6UmsUcdR200aKqTnCWU"
);

function Routing() {
  return (
    <div>
      {/* Wrap the app with DataProvider for global state */}
      <DataProvider initialState={initialState} reducer={reducer}>
        <Router>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/signin" element={<Signin />} />

            {/* Stripe payment route wrapped with Elements */}
            <Route
              path="/payments"
              element={
                <ProtectedRoute
                  msg="you must login to pay"
                  redirect="/payments"
                >
                  <Elements stripe={stripePromise}>
                    <Payment />
                  </Elements>
                </ProtectedRoute>
              }
            />

            <Route
              path="/orders"
              element={
                <ProtectedRoute
                  msg="you must login to access your orders"
                  redirect="/Orders"
                >
                
                    <Orders />
            
                </ProtectedRoute>
              }
            />
            <Route path="/category/:title" element={<Results />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/products/:productID" element={<ProductDetail />} />
          </Routes>
        </Router>
      </DataProvider>
    </div>
  );
}

export default Routing;

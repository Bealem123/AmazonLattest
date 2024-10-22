 import React, { useState, useEffect } from "react";
 import { useDataLayerValue } from "../../Components/Dataprovider/Dataprovider";
 import { Link, useNavigate } from "react-router-dom";
 import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
 import CurrencyFormat from "../../Components/CurrencyFormat/CurrencyFormat";
 import styles from "./Payment.module.css";
 import { axiosinstance } from "../../Api/axios";
 import { Type } from "../../Utility/actiontype";
 import ClipLoader from "react-spinners/ClipLoader";
 import { db } from "../../Utility/firebase";
 import { doc, setDoc } from "firebase/firestore";

 function Payment() {
   const [{ basket, user }, dispatch] = useDataLayerValue();
   const stripe = useStripe();
   const elements = useElements();
   const navigate = useNavigate();

   const [processing, setProcessing] = useState(false);
   const [error, setError] = useState(null);
   const [succeeded, setSucceeded] = useState(false);
   const [disabled, setDisabled] = useState(true);
   const [clientSecret, setClientSecret] = useState("");

   const getBasketTotal = (basket) =>
     basket?.reduce((amount, item) => item.price * item.count + amount, 0);

   useEffect(() => {
     const createPaymentIntent = async () => {
       const total = parseInt(getBasketTotal(basket) * 100, 10);

       try {
         const response = await axiosinstance({
           method: "post",
           url: `/payment/create?total=${total}`,
         });

         if (response.data.client_secret) {
           setClientSecret(response.data.client_secret);
         } else {
           console.error("Client secret not received:", response.data);
         }
       } catch (error) {
         console.error(
           "Error creating payment intent:",
           error.response || error
         );
         setError("Error creating payment intent. Please try again.");
       }
     };

     if (basket.length > 0) {
       createPaymentIntent();
     }
   }, [basket]);

   const handleSubmit = async (e) => {
     e.preventDefault();
     setProcessing(true);

     if (!stripe || !elements || !clientSecret) {
       setError("Stripe or ClientSecret is missing");
       setProcessing(false);
       return;
     }

     const cardElement = elements.getElement(CardElement);
     const payload = await stripe.confirmCardPayment(clientSecret, {
       payment_method: {
         card: cardElement,
       },
     });

     if (payload.error) {
       setError(`Payment failed: ${payload.error.message}`);
       setProcessing(false);
     } else {
       setSucceeded(true);
       setError(null);
       setProcessing(false);

       const orderData = {
         basket: basket,
         amount: payload.paymentIntent.amount,
         created: payload.paymentIntent.created,
       };

       const orderDocRef = doc(
         db,
         "users",
         user?.uid,
         "orders",
         payload.paymentIntent.id
       );

       try {
         await setDoc(orderDocRef, orderData);
         console.log("Order stored successfully!");

         // Clear the basket after payment
         dispatch({
           type: Type.EMPTY_BASKET,
         });

         navigate("/orders");
       } catch (error) {
         console.error("Error storing order in Firestore:", error);
         setError("Error storing order. Please try again.");
       }
     }
   };

   const handleChange = (e) => {
     setDisabled(e.empty);
     setError(e.error ? e.error.message : "");
   };

   return (
     <div className={styles.payment}>
       <h1>
         Checkout (<Link to="/cart">{basket?.length} items</Link>)
       </h1>

       <div className={styles.payment_section}>
         <div className={styles.payment_title}>
           <h3>Delivery Address</h3>
         </div>
         <div className={styles.payment_address}>
           <p>{user?.email}</p>
           <p>123 React Lane</p>
           <p>Los Angeles, CA</p>
         </div>
       </div>

       <div className={styles.payment_section}>
         <div className={styles.payment_title}>
           <h3>Review Items and Delivery</h3>
         </div>
         <div className={styles.payment_items}>
           {basket.map((item) => (
             <div key={item.id} className={styles.payment_item}>
               <img src={item.image} alt={item.title} />
               <div>
                 <h2>{item.title}</h2>
                 <CurrencyFormat amount={item.price * item.count} />
               </div>
             </div>
           ))}
         </div>
       </div>

       <div className={styles.payment_section}>
         <div className={styles.payment_title}>
           <h3>Payment Method</h3>
         </div>
         <div className={styles.payment_details}>
           <form onSubmit={handleSubmit}>
             <CardElement onChange={handleChange} />
             <div className={styles.payment_price}>
               <CurrencyFormat
                 amount={getBasketTotal(basket)}
                 renderText={(value) => <h3>Order Total: {value}</h3>}
               />
               <button
                 disabled={processing || disabled || succeeded}
                 className={styles.payment_button}
               >
                 {processing ? (
                   <ClipLoader size={20} color={"#fff"} />
                 ) : (
                   "Buy Now"
                 )}
               </button>
             </div>

             {error && <div className={styles.payment_error}>{error}</div>}
           </form>
         </div>
       </div>
     </div>
   );
 }

 export default Payment;

// import React, { useState, useEffect } from "react";
// import { useDataLayerValue } from "../../Components/Dataprovider/Dataprovider";
// import { Link, useNavigate } from "react-router-dom";
// import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
// import CurrencyFormat from "../../Components/CurrencyFormat/CurrencyFormat";
// import styles from "./Payment.module.css";
// import { axiosinstance } from "../../Api/axios"; // Ensure you're using your axios instance
// import { Type } from "../../Utility/actiontype";
// import ClipLoader from "react-spinners/ClipLoader"; // React Spinners
// import { db } from "../../Utility/firebase"; // Firestore import
// import { doc, setDoc } from "firebase/firestore"; // Import the necessary Firestore functions

// function Payment() {
//   const [{ basket, user }, dispatch] = useDataLayerValue();
//   const stripe = useStripe();
//   const elements = useElements();
//   const navigate = useNavigate();

//   const [processing, setProcessing] = useState(false);
//   const [error, setError] = useState(null);
//   const [succeeded, setSucceeded] = useState(false);
//   const [disabled, setDisabled] = useState(true);
//   const [clientSecret, setClientSecret] = useState("");

//   // Get total price from basket
//   const getBasketTotal = (basket) =>
//     basket?.reduce((amount, item) => item.price * item.count + amount, 0);

//   // Create the payment intent when the component mounts
//   useEffect(() => {
//     const createPaymentIntent = async () => {
//       const total = parseInt(getBasketTotal(basket) * 100, 10);
//       console.log("Total for payment intent:", total);

//       try {
//         const response = await axiosinstance({
//           method: "post",
//           url: `/payment/create?total=${total}`,
//         });

//         if (response.data.client_secret) {
//           setClientSecret(response.data.client_secret);
//         } else {
//           console.error("Client secret not received:", response.data);
//         }
//       } catch (error) {
//         console.error(
//           "Error creating payment intent:",
//           error.response || error
//         );
//         setError("Error creating payment intent. Please try again.");
//       }
//     };

//     if (basket.length > 0) {
//       createPaymentIntent();
//     }
//   }, [basket]);

//   // Handle payment submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setProcessing(true);

//     if (!stripe || !elements || !clientSecret) {
//       setError("Stripe or ClientSecret is missing");
//       setProcessing(false);
//       return;
//     }

//     const cardElement = elements.getElement(CardElement);
//     const payload = await stripe.confirmCardPayment(clientSecret, {
//       payment_method: {
//         card: cardElement,
//       },
//     });

//     if (payload.error) {
//       setError(`Payment failed: ${payload.error.message}`);
//       setProcessing(false);
//     } else {
//       setSucceeded(true);
//       setError(null);
//       setProcessing(false);

//       // Prepare order data
//       const orderData = {
//         basket: basket,
//         amount: payload.paymentIntent.amount,
//         created: payload.paymentIntent.created,
//       };

//       // Store order details in Firestore
//       const orderDocRef = doc(
//         db,
//         "users",
//         user?.uid,
//         "orders",
//         payload.paymentIntent.id
//       ); // Create a reference to the order document

//       try {
//         // Store order in Firestore
//         await setDoc(orderDocRef, orderData); // Use setDoc to write data
//         console.log("Order stored successfully!"); // Log success message

//         // Clear the basket
//         dispatch({
//           type: Type.EMPTY_BASKET,
//         });

//         // Redirect to the orders page
//         navigate("/orders");
//       } catch (error) {
//         console.error("Error storing order in Firestore:", error); // Log any errors
//         setError("Error storing order. Please try again."); // Set error state
//       }
//     }
//   };

//   const handleChange = (e) => {
//     setDisabled(e.empty);
//     setError(e.error ? e.error.message : "");
//   };

//   return (
//     <div className={styles.payment}>
//       <h1>
//         Checkout (<Link to="/cart">{basket?.length} items</Link>)
//       </h1>

//       <div className={styles.payment_section}>
//         <div className={styles.payment_title}>
//           <h3>Delivery Address</h3>
//         </div>
//         <div className={styles.payment_address}>
//           <p>{user?.email}</p>
//           <p>123 React Lane</p>
//           <p>Los Angeles, CA</p>
//         </div>
//       </div>

//       <div className={styles.payment_section}>
//         <div className={styles.payment_title}>
//           <h3>Review Items and Delivery</h3>
//         </div>
//         <div className={styles.payment_items}>
//           {basket.map((item) => (
//             <div key={item.id} className={styles.payment_item}>
//               <img src={item.image} alt={item.title} />
//               <div>
//                 <h2>{item.title}</h2>
//                 <CurrencyFormat amount={item.price * item.count} />
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className={styles.payment_section}>
//         <div className={styles.payment_title}>
//           <h3>Payment Method</h3>
//         </div>
//         <div className={styles.payment_details}>
//           <form onSubmit={handleSubmit}>
//             <CardElement onChange={handleChange} />
//             <div className={styles.payment_price}>
//               <CurrencyFormat
//                 amount={getBasketTotal(basket)}
//                 renderText={(value) => <h3>Order Total: {value}</h3>}
//               />
//               <button
//                 disabled={processing || disabled || succeeded}
//                 className={styles.payment_button}
//               >
//                 {processing ? (
//                   <ClipLoader size={20} color={"#fff"} />
//                 ) : (
//                   "Buy Now"
//                 )}
//               </button>
//             </div>

//             {error && <div className={styles.payment_error}>{error}</div>}
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Payment;

import React, { useEffect } from "react";
import "./App.css";
import Routing from "./Router";
import { auth } from "./Utility/firebase"; // Import Firebase auth
import { useDataLayerValue } from "./Components/Dataprovider/Dataprovider"; // Import Data Layer
import { Type } from "./Utility/actiontype"; // Import action types

// Import Stripe.js and the Elements provider
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// Load your Stripe publishable key
const stripePromise = loadStripe("your-publishable-key-here");

function App() {
  const [{}, dispatch] = useDataLayerValue(); // Access the dispatch function

  useEffect(() => {
    // Set up a listener for changes to the user's sign-in state
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in
        dispatch({
          type: Type.SET_USER,
          user: user,
        });
      } else {
        // User is signed out
        dispatch({
          type: Type.SET_USER,
          user: null,
        });
      }
    });

    // Clean up the listener on unmount
    return () => unsubscribe();
  }, [dispatch]);

  return (
    <div className="App">
      {/* Wrap your app with the Stripe Elements provider */}
      <Elements stripe={stripePromise}>
        <Routing />
      </Elements>
    </div>
  );
}

export default App;

// import React, { useEffect } from "react";
// import "./App.css";
// import Routing from "../src/Router";
// import { auth } from "./Utility/firebase"; // Import your Firebase auth
// import { useDataLayerValue } from "./Components/Dataprovider/Dataprovider"; // Import Data Layer
// import { Type } from "./Utility/actiontype"; // Import action types

// function App() {
//   const [{}, dispatch] = useDataLayerValue(); // Access the dispatch function

//   useEffect(() => {
//     // Set up a listener for changes to the user's sign-in state
//     const unsubscribe = auth.onAuthStateChanged((user) => {
//       if (user) {
//         // User is signed in
//         dispatch({
//           type: Type.SET_USER,
//           user: user,
//         });
//       } else {
//         // User is signed out
//         dispatch({
//           type: Type.SET_USER,
//           user: null,
//         });
//       }
//     });

//     // Clean up the listener on unmount
//     return () => unsubscribe();
//   }, [dispatch]);

//   return (
//     <div className="App">
//       <Routing />
//     </div>
//   );
// }

// export default App;

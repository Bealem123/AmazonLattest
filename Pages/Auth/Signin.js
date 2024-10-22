import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom"; // Import useNavigate for navigation
import styles from "../Auth/Signin.module.css";
import { auth } from "../../Utility/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { useDataLayerValue } from "../../Components/Dataprovider/Dataprovider";
import { Type } from "../../Utility/actiontype";
import { ClipLoader } from "react-spinners"; // React Spinner for loading state
import { red } from "@mui/material/colors";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Loading state

  const [{ user }, dispatch] = useDataLayerValue();
  const navigate = useNavigate(); // Initialize useNavigate
  const navStateData = useLocation(); // Use location for navigation state
  console.log("navStateData", navStateData); // Log navStateData to check its structure

  // Sign-in functionality
  const signIn = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      dispatch({
        type: Type.SET_USER,
        user: user,
      });

      console.log("User signed in:", user);

      // Navigate to the homepage or any other page upon successful sign-in
      navigate(navStateData.state?.redirect || "/");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Registration functionality
  const register = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      dispatch({
        type: Type.SET_USER,
        user: user,
      });

      console.log("User registered:", user);

      // Navigate to the homepage or any other page after successful registration
      navigate(navStateData.state?.redirect || "/");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Sign-out functionality
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      dispatch({
        type: Type.SET_USER,
        user: null,
      });

      console.log("User signed out");

      // Navigate to the sign-in page after sign-out
      navigate("/signin");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className={styles.signIn}>
      <Link to="/">
        <img
          className={styles.logo}
          src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
          alt="Amazon Logo"
        />
      </Link>

      <div className={styles.container}>
        {user ? (
          <div>
            <h1>Welcome, {user.email}</h1>
            <button onClick={handleSignOut} className={styles.signOutButton}>
              Sign Out
            </button>
          </div>
        ) : (
          <>
            <h1 className={styles.title}>Sign In</h1>
            {navStateData.state?.msg && (
              <small
                style={{
                  padding: "5px",
                  textAlign: "center",
                  color: red[500], // Use red color from MUI
                  fontWeight: "bold",
                }}
              >
                {navStateData.state.msg} {/* Display the message */}
              </small>
            )}
            <form>
              <h5 className={styles.formLabel}>Email</h5>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.formInput}
              />
              <h5 className={styles.formLabel}>Password</h5>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.formInput}
              />
              {error && <p className={styles.errorMessage}>{error}</p>}
              {loading ? (
                <ClipLoader color={"#000"} size={35} /> // Loading spinner
              ) : (
                <button
                  type="submit"
                  onClick={signIn}
                  className={styles.signInButton}
                >
                  Sign In
                </button>
              )}
            </form>
            <p className={styles.signInInfo}>
              By signing in, you agree to Amazon's Clone Conditions of Use &
              Sale. Please see our Privacy Notice, Cookies Notice, and
              Interest-Based Ads Notice.
            </p>
            <button onClick={register} className={styles.registerButton}>
              Create your Amazon Account
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default SignIn;

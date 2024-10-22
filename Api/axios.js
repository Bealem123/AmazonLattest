import axios from "axios";

const axiosinstance = axios.create({
  //  baseURL: "http://127.0.0.1:5001/e-clone-37c24/us-central1/api",by local server
  baseURL: "https://amazon-api-deployment-1-iged.onrender.com",
});

export {axiosinstance};

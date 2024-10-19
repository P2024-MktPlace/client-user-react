import BASE_API_URL from "../config";

// Helper function to check if the token is expired
const isTokenExpired = () => {
  const token = localStorage.getItem("token"); // Retrieve token from localStorage
  if (!token) return true; // No token present, so it’s considered expired

  try {
    // Decode JWT to get expiry time
    const decodedToken = JSON.parse(atob(token.split('.')[1])); 
    const isExpired = decodedToken.exp * 1000 < Date.now(); // Check expiry time

    if (isExpired) {
      localStorage.removeItem("token"); // Remove token if expired
      localStorage.removeItem("expiryTime"); // Remove expiry time
    }
    return isExpired; // Return true if expired, false otherwise
  } catch (error) {
    console.error("Failed to decode token:", error);
    return true; // Consider invalid tokens as expired
  }
};

// Wrapper object to manage token storage and retrieval
const Token = {
  // Method to set the token and its expiry time
  setToken: (idToken) => {
    const expiryTime = new Date().getTime() + 59 * 60 * 1000; // 59 minutes in milliseconds
    localStorage.setItem("token", idToken);
    localStorage.setItem("expiryTime", expiryTime.toString());
  },

  // Method to get the current token if not expired
  getToken: () => {
    if (!isTokenExpired()) {
      return localStorage.getItem("token");
    }
    return null; // Return null if token is expired or not available
  },
};

export default Token;

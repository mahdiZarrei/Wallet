import { Suspense } from "react"; // Importing Suspense for lazy loading
import { useLocation, useNavigate } from "react-router-dom"; // Importing hooks for navigation and location handling
import { useEffect, useState } from "react"; // Importing hooks for state management and side effects
import { toast } from "react-toastify"; // Importing toast for notifications
import axios from "axios";
import Wallet from "./Wallet"; // Importing Wallet component
import WalletContext from "../../context/wallet"; // Importing WalletContext for context management

const Index = () => {
  const navigate = useNavigate(); // Hook for navigation
  const [walletCrypto, setwalletCrypto] = useState(""); // State for storing wallet crypto
  const [loginType, setLoginType] = useState(""); // State for storing login type
  const [privateKey, setPrivateKey] = useState(""); // State for storing private key

  const { state } = useLocation(); // Hook for getting location state

  const User = async (address) => {
    try {
      const newUser = await axios.post("http://localhost:5000/user", {
        address,
      });

      if (newUser.data.msg === "The user is already registered") {
        toast.success("User successfully logged in");
      } else {
        toast.success(newUser.data.msg);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    try {
      const { wallet, login, privateKey } = state; // Destructuring values from location state
      setwalletCrypto(wallet); // Setting wallet crypto state
      setPrivateKey(privateKey); // Setting private key state
      setLoginType(login); // Setting login type state
      User(wallet.address); // Calling User function with wallet address
    } catch (error) {
      console.log(error);
      navigate("/"); // Navigating to home if there's an error
      toast.error("You are not connected to your wallet"); // Showing error notification
    }
  }, []);

  return (
    <WalletContext.Provider value={{ walletCrypto, loginType, privateKey }}>
      {" "}
      {/* Providing context values */}
      <Suspense fallback={<div>Loading...</div>}>
        {" "}
        {/* Suspense for lazy loading with fallback */}
        {walletCrypto !== "" && <Wallet />}{" "}
        {/* Rendering Wallet component if walletCrypto is not empty */}
      </Suspense>
    </WalletContext.Provider>
  );
};

export default Index;

// Import necessary dependencies and components from the React and Material-UI libraries
import { useState } from "react"; // Import the useState hook from React
import { ethers } from "ethers"; // Import the ethers library for working with Ethereum
import { Box } from "@mui/material"; // Import the Box component from Material-UI
import { Create } from "@mui/icons-material"; // Import the Create icon from Material-UI
import LoadingButton from "@mui/lab/LoadingButton"; // Import the LoadingButton component from Material-UI lab
import Creat from "/Create.png"; // Import the image file for the background
import { motion } from "framer-motion"; // Import the motion component from Framer Motion
import SucceedModal from "./Modal.jsx"; // Import the SucceedModal component
import { ButtonVariants } from "../../animated/index.js"; // Import the animation variants for the button

// Define the CreateWallet component
const CreateWallet = () => {
  // Use the useState hook to create state variables for controlling the modal and button states
  const [openModal, setOpenModal] = useState(false); // State variable for controlling the modal visibility
  const [button, setButton] = useState(false); // State variable for controlling the button loading state
  const [wallet, setWallet] = useState(""); // State variable for storing the created wallet information

  // Define the handleModal function to handle the button click event
  const handleModal = () => {
    // Set the button loading state to true
    setButton(true);

    // Create a new random wallet using the ethers library
    const wallet = ethers.Wallet.createRandom();

    // Set the button loading state to false
    setButton(false);

    // Store the created wallet information in the state variable
    setWallet(wallet);

    // Open the modal
    setOpenModal(true);
  };

  // Render the CreateWallet component
  return (
    // Box component for the main container
    <Box
      sx={{
        width: "100%", // Set the width to 100%
        height: "100vh", // Set the height to 100vh (100% of the viewport height)
        backgroundImage: `url(${Creat})`, // Set the background image
        backgroundRepeat: "no-repeat", // Set the background repeat to no-repeat
        backgroundColor: (t) =>
          t.palette.mode === "light" // Set the background color based on the theme mode
            ? t.palette.grey[50]
            : t.palette.grey[900],
        backgroundSize: "cover", // Set the background size to cover the entire container
        backgroundPosition: "center", // Set the background position to center
        textAlign: "center", // Set the text alignment to center
      }}
    >
      {/* Motion component for applying the animation variants to the button */}
      <motion.div variants={ButtonVariants} initial="initial" animate="animate">
        {/* LoadingButton component for the create wallet button */}
        <LoadingButton
          endIcon={<Create />} // Set the end icon for the button
          loadingPosition="end" // Set the loading position to end
          loading={button} // Set the loading state of the button
          onClick={() => handleModal()} // Set the onClick event handler for the button
          variant="contained" // Set the button variant to contained
          sx={{ borderRadius: 12, p: 2, mt: "49vh" }} // Set the button styles
        >
          creat a new wallet
        </LoadingButton>
      </motion.div>

      {/* SucceedModal component for the success modal */}
      <SucceedModal
        onChange={(newOpen) => setOpenModal(newOpen)} // Set the onChange event handler for the modal
        open={openModal} // Set the open state of the modal
        wallet={wallet} // Pass the created wallet information to the modal
      />
    </Box>
  );
};

// Export the CreateWallet component
export default CreateWallet;

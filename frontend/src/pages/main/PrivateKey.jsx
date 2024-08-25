// Importing necessary dependencies and components from various libraries
import { useState } from "react";
import { useFormik } from "formik";
import { ethers } from "ethers";
import { Avatar, Typography, Box, TextField } from "@mui/material";
import { LockOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import LoadingButton from "@mui/lab/LoadingButton";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

// Importing necessary components from the same directory
import Copyright from "./Copyright";
import DoWallet from "./DoWallet";

// Importing form validation schema from the validations directory
import { privateKeyValid } from "../../validations/PrivateKey";

// Importing animation variants from the animated directory
import { LoginVariants } from "../../animated/index.js";

// This is a functional component that renders a form for users to login using their private key.
const PrivateKey = () => {
  // State hook to manage the loading state of the submit button
  const [button, setButton] = useState(false);

  // Using the useFormik hook to manage form state and validation
  const FormikValid = useFormik({
    initialValues: {
      privateKey: "", // Initial value for the private key input field
    },
    validationSchema: privateKeyValid, // Validation schema for the form

    onSubmit: (values, { resetForm }) => {
      // Function to handle form submission
      handleSubmit(values);
      resetForm();
    },
  });

  // Navigation hook to navigate between pages
  const navigate = useNavigate();

  // Function to handle form submission
  const handleSubmit = async (values) => {
    // Setting the button state to true to indicate that the button is loading
    setButton(true);

    try {
      // Creating a new wallet object using the private key provided by the user
      const wallet = new ethers.Wallet(values.privateKey);

      // Navigating to the wallet page and passing the wallet object and other information in the state
      navigate("/wallet", {
        state: {
          wallet: wallet,
          login: "private",
          privateKey: wallet.privateKey.toString(),
        },
      });

      // Setting the button state to false to indicate that the button is not loading
      setButton(false);
    } catch (error) {
      // Displaying an error message if there is an error creating the wallet object
      toast.error(error.message);
      setButton(false);
    }
  };

  return (
    // Using the motion.div component from Framer Motion to animate the form
    <motion.div initial="initial" animate="animate" variants={LoginVariants}>
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <motion.div variants={LoginVariants} animate="logo">
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlined />
          </Avatar>
        </motion.div>

        <Typography textAlign={"center"} component="h1" variant="h5">
          Login to your wallet
        </Typography>

        <Box
          component="form"
          noValidate
          onSubmit={FormikValid.handleSubmit}
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="privateKey"
            label="private Key"
            name="privateKey"
            autoComplete="privateKey"
            autoFocus
            value={FormikValid.values.privateKey}
            onChange={FormikValid.handleChange}
            onBlur={FormikValid.handleBlur}
            error={
              FormikValid.touched.privateKey &&
              Boolean(FormikValid.errors.privateKey)
            }
            helperText={
              FormikValid.touched.privateKey && FormikValid.errors.privateKey
            }
          />
          <LoadingButton
            // Disabling the submit button if there are validation errors
            disabled={
              FormikValid.errors.privateKey === undefined ? false : true
            }
            // Setting the loading state of the button based on the button state
            loading={button === false ? false : true}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Login
          </LoadingButton>
          <DoWallet sx={{ ml: 7.5 }} />
          <Copyright sx={{ mt: 5 }} />
        </Box>
      </Box>
    </motion.div>
  );
};

// Exporting the PrivateKey component as the default export
export default PrivateKey;

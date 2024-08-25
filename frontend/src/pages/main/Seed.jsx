// Importing necessary dependencies and components from various libraries
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Avatar, Typography, Box, TextField, Switch } from "@mui/material";
import { LockOutlined, Visibility, VisibilityOff } from "@mui/icons-material";
import LoadingButton from "@mui/lab/LoadingButton";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

// Importing animation variants for the login page
import { LoginVariants } from "../../animated/index.js";

// Importing necessary components for the login page
import Copyright from "./Copyright";
import DoWallet from "./DoWallet";

// Seed component represents the login page with seed phrase input
const Seed = () => {
  // Initialize state variables
  const navigate = useNavigate(); // Navigate function from react-router-dom
  const [button, setButton] = useState(false); // Button loading state
  const [checked, setChecked] = useState(true); // 24 word seed phrase toggle state
  const [numberSeed, setNumberSeed] = useState(12); // Number of seed phrase words
  const [see, setSee] = useState(true); // Password visibility toggle state

  // Toggle 24 word seed phrase input
  const handleChange = () => {
    setChecked(!checked);
    setNumberSeed(checked ? 24 : 12);
  };

  // Toggle password visibility
  const handleChangeSee = () => setSee(!see);

  // Validation schema for seed phrase input
  const validationSchema = Yup.object(
    Array.from({ length: numberSeed }, (_, i) => ({
      [`seed${i + 1}`]: Yup.string()
        .required("required")
        .matches(/^\b[a-zA-Z]{3,}\b$/, "not word"),
    })).reduce((acc, curr) => ({ ...acc, ...curr }), {})
  );

  // Formik hook for handling form data and validation
  const formik = useFormik({
    initialValues: Array.from({ length: numberSeed }, (_, i) => ({
      [`seed${i + 1}`]: "",
    })).reduce((acc, curr) => ({ ...acc, ...curr }), {}),
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      handleSubmit(values);
      resetForm();
    },
  });

  // Handle form submission
  const handleSubmit = async (values) => {
    setButton(true);

    try {
      let seed = "";
      // Concatenate seed phrase words into a single string
      for (let index = 1; index <= numberSeed; index++) {
        seed += values[`seed${index}`] + " ";
      }
      seed = seed.trim();
      // Generate HDNodeWallet from seed phrase
      const wallet = ethers.HDNodeWallet.fromPhrase(seed);

      // Navigate to wallet page and pass wallet object as state
      navigate("/wallet", {
        state: {
          wallet: wallet,
          login: "seed",
          privateKey: wallet.privateKey.toString(),
        },
      });
      setButton(false);
    } catch (error) {
      // Show error message and reset button loading state
      toast.error(error.message);
      setButton(false);
      console.log(error);
    }
  };

  // Handle seed phrase input change
  const handleSeedInputChange = (e) => {
    const inputSeed = e.target.value.trim();
    const seedWords = inputSeed.split(" ");
    if (seedWords.length === numberSeed) {
      seedWords.forEach((word, index) => {
        formik.setFieldValue(`seed${index + 1}`, word);
      });
    }
  };

  // Reset form when number of seed phrase words changes
  useEffect(() => {
    formik.resetForm({
      values: Array.from({ length: numberSeed }, (_, i) => ({
        [`seed${i + 1}`]: "",
      })).reduce((acc, curr) => ({ ...acc, ...curr }), {}),
    });
  }, [numberSeed]);

  // Render the login page with seed phrase input and related components
  return (
    <motion.div initial="initial" animate="animate" variants={LoginVariants}>
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <motion.div variants={LoginVariants} animate="logo">
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlined />
          </Avatar>
        </motion.div>
        <Typography component="h1" variant="h5">
          Login to your wallet
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={formik.handleSubmit}
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            fullWidth
            id="seedInput"
            label="Enter full seed phrase"
            autoComplete="off"
            onChange={handleSeedInputChange}
            sx={{ mb: 3 }}
          />
          <Box textAlign="center" alignItems="center">
            {/* Render seed phrase input fields */}
            {Array.from({ length: numberSeed }, (_, i) => (
              <TextField
                key={i + 1}
                margin="normal"
                sx={{ width: 80, mr: 1 }}
                type={see ? "" : "password"}
                error={
                  formik.touched[`seed${i + 1}`] &&
                  Boolean(formik.errors[`seed${i + 1}`])
                }
                helperText={
                  formik.touched[`seed${i + 1}`] &&
                  formik.errors[`seed${i + 1}`]
                }
                size="small"
                label={i + 1}
                autoComplete={`seed${i + 1}`}
                id={`seed${i + 1}`}
                name={`seed${i + 1}`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values[`seed${i + 1}`]}
              />
            ))}
          </Box>

          <Box textAlign={"center"}>
            <Typography variant="p">24 word</Typography>
            <Switch checked={checked} onChange={handleChange} />
            <Typography variant="p">12 word</Typography>
          </Box>

          <Box sx={{ mt: 3, mb: 2, display: "flex" }}>
            {/* Render login and password visibility toggle buttons */}
            <LoadingButton
              loading={button}
              type="submit"
              variant="contained"
              sx={{ width: "90%" }}
            >
              Login
            </LoadingButton>
            <LoadingButton
              loading={button}
              variant="contained"
              sx={{ ml: 1 }}
              onClick={handleChangeSee}
            >
              {see ? <VisibilityOff /> : <Visibility />}
            </LoadingButton>
          </Box>
          <DoWallet />
          <Copyright sx={{ mt: 5 }} />
        </Box>
      </Box>
    </motion.div>
  );
};

export default Seed;

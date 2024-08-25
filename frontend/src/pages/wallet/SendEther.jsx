import { useState, useEffect, useContext } from "react";
import { Box, Typography, TextField } from "@mui/material";
import { CreditCardRounded, Paid } from "@mui/icons-material";
import { useFormik } from "formik";

import WalletContext from "../../context/wallet";
import { sendValid } from "../../validations/Send";
import { FormGrid } from "./FormGrid";
import InfoContext from "../../context/info";

// SendEther component handles the form for sending Ether transactions
const SendEther = ({ onChange }) => {
  // Formik setup for form validation and state management
  const FormikValid = useFormik({
    initialValues: {
      destination: "",
      amount: "",
    },
    validationSchema: sendValid,
  });

  // State to manage error messages
  const [error, setError] = useState({ show: false, message: "" });

  // Context to get wallet details
  const { walletCrypto } = useContext(WalletContext);
  const { balance } = useContext(InfoContext);

  // Effect to handle form validation and error management
  useEffect(() => {
    if (
      FormikValid.errors.amount ||
      FormikValid.errors.destination ||
      FormikValid.values.destination === "" ||
      FormikValid.values.amount === ""
    ) {
      onChange({ disabled: true, address: "", amount: "", addressToken: "" });
      setError({ show: false, message: "" });
    } else {
      if (balance > FormikValid.values.amount + 0.00105) {
        if (walletCrypto.address === FormikValid.values.destination) {
          setError({
            show: true,
            message: "You cannot send to the address you want to send to",
          });
          onChange({
            disabled: true,
            address: "",
            amount: "",
            addressToken: "",
          });
        } else {
          onChange({
            disabled: false,
            address: FormikValid.values.destination,
            amount: FormikValid.values.amount,
            addressToken: "",
          });
          setError({ show: false, message: "" });
        }
      } else {
        setError({
          show: true,
          message: "Insufficient balance to send this amount of Ether",
        });
        onChange({
          disabled: true,
          address: "",
          amount: "",
          addressToken: "",
        });
      }
    }
  }, [
    FormikValid.errors.amount,
    FormikValid.errors.destination,
    FormikValid.values.amount,
    FormikValid.values.destination,
  ]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          p: 3,
          borderRadius: "20px",
          border: "1px solid ",
          borderColor: "divider",
          backgroundColor: "background.paper",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.05)",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography color="secondary" variant="h6" component="h1">
            send Ether
          </Typography>
          <CreditCardRounded sx={{ color: "text.secondary" }} />
        </Box>
        <Paid
          color="secondary"
          sx={{
            mt: 1,
            fontSize: { xs: 48, sm: 56 },
          }}
        />
        <Box sx={{ display: "flex", gap: 2, mt: 2 }} component="form">
          <FormGrid sx={{ flexGrow: 1 }}>
            <TextField
              value={FormikValid.values.destination}
              onChange={FormikValid.handleChange}
              onBlur={FormikValid.handleBlur}
              error={Boolean(FormikValid.errors.destination)}
              helperText={FormikValid.errors.destination}
              label="Destination address"
              id="destination"
              autoComplete="destination"
              placeholder="destination"
            />
          </FormGrid>
          <FormGrid sx={{ flexGrow: 1 }}>
            <TextField
              value={FormikValid.values.amount}
              onChange={FormikValid.handleChange}
              onBlur={FormikValid.handleBlur}
              error={
                FormikValid.touched.amount && Boolean(FormikValid.errors.amount)
              }
              helperText={
                FormikValid.touched.amount && FormikValid.errors.amount
              }
              label="Amount"
              id="amount"
              autoComplete="amount"
              placeholder="amount"
              type="number"
            />
          </FormGrid>
        </Box>
        {error.show && (
          <Typography textAlign="center" mt={2.5} color="error">
            {error.message}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default SendEther;

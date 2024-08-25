import { useEffect, useState, useContext, useRef } from "react";
import { Box, Typography, TextField } from "@mui/material";
import { CreditCardRounded, Token } from "@mui/icons-material";
import { useFormik } from "formik";
import BN from "bn.js";
import { ethers, Contract } from "ethers";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

import { DefaultERC20 } from "../../data/ABIERC20";
import WalletContext from "../../context/wallet";
import { sendValid } from "../../validations/Send";
import { FormGrid } from "./FormGrid";
import InfoContext from "../../context/info";
import { TokenVariants } from "../../animated";

// SendToken component handles the form for sending token transactions
const SendToken = ({ onChange, addressToken }) => {
  const { walletCrypto, privateKey } = useContext(WalletContext);
  const { provider } = useContext(InfoContext);
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [contract, setContract] = useState("");
  const [tokenAddress, setTokenAddress] = useState("");
  const [symbol, setSymbol] = useState("");
  const [balance, setBalance] = useState("");
  const [error, setError] = useState({ show: false, message: "" });
  const [load, setLoad] = useState(false);

  const handleChange = (event) => {
    setTokenAddress(event.target.value);
  };
  // Formik setup for form validation and state management
  const FormikValid = useFormik({
    initialValues: {
      destination: "",
      amount: "",
      tokenAddress: "",
    },
    validationSchema: sendValid,
  });

  // Effect function to handle token address changes
  const effect = async () => {
    try {
      // Check if token address is different from the wallet's own address
      if (walletCrypto.address !== FormikValid.values.tokenAddress) {
        const wallet = new ethers.Wallet(privateKey, provider);

        if (contract === "") {
          // Create a new contract instance
          const ct = new Contract(
            FormikValid.values.tokenAddress,
            DefaultERC20,
            wallet
          );
          setError({ show: false, message: "" });
          setShow(false);

          // Fetch token details
          const symbol = await ct.symbol();
          setSymbol(symbol);
          const balance = await ct.balanceOf(walletCrypto.address);
          setBalance(new BN(balance).toString());

          const name = await ct.name();
          setName(name);
          setShow(true);
          setLoad(false);
          setContract({
            contract: ct,
            address: FormikValid.values.tokenAddress,
            provider: provider,
          });
        } else if (
          contract.address === FormikValid.values.tokenAddress &&
          contract.provider === provider
        ) {
          setShow(true);
          if (FormikValid.values.amount > balance) {
            setError({
              show: true,
              message: "Insufficient balance to send this amount of token",
            });
            onChange({
              disabled: true,
              address: "",
              amount: "",
              addressToken: "",
            });
          } else if (
            FormikValid.values.destination.length !== 0 &&
            FormikValid.errors.destination === undefined &&
            FormikValid.values.amount !== "" &&
            FormikValid.values.amount <= balance &&
            FormikValid.errors.amount === undefined
          ) {
            setError({ show: false, message: "" });
            onChange({
              disabled: false,
              address: FormikValid.values.destination,
              amount: FormikValid.values.amount,
              addressToken: FormikValid.values.tokenAddress,
              contract: contract.contract,
            });
            setLoad(false);
          } else {
            onChange({
              disabled: true,
              address: "",
              amount: "",
              addressToken: "",
            });
          }
        } else {
          setError({ show: false, message: "" });
          setShow(false);
          onChange({
            disabled: true,
            address: "",
            amount: "",
            addressToken: "",
          });

          // Create a new contract instance if token address or provider changes
          const ct = new ethers.Contract(
            FormikValid.values.tokenAddress,
            DefaultERC20,
            wallet
          );

          const symbol = await ct.symbol();
          setSymbol(symbol);
          const balance = await ct.balanceOf(walletCrypto.address);
          setBalance(new BN(balance).toString());

          const name = await ct.name();
          setName(name);
          setShow(true);
          setLoad(false);
          setContract({
            contract: ct,
            address: FormikValid.values.tokenAddress,
            provider: provider,
          });
        }
      } else {
        setError({
          show: true,
          message: "The token address cannot be your own address",
        });
        onChange({
          disabled: true,
          address: "",
          amount: "",
          addressToken: "",
        });
      }
    } catch (error) {
      onChange({
        disabled: true,
        address: "",
        amount: "",
        addressToken: "",
      });
      if (
        error.message ===
          'could not decode result data (value="0x", info={ "method": "symbol", "signature": "symbol()" }, code=BAD_DATA, version=6.13.1)' ||
        error.message ===
          `missing provider (operation="call", code=UNSUPPORTED_OPERATION, version=6.13.1)`
      ) {
        toast.error("Contract is not defined");
      } else if (error instanceof TypeError) {
        toast.error("bad address checksum");
      } else {
        toast.error(error.message);
        console.log(error);
      }
    }
  };

  // useEffect to handle token address changes and validation
  useEffect(() => {
    if (
      FormikValid.values.tokenAddress.length === 42 &&
      FormikValid.errors.tokenAddress === undefined
    ) {
      effect();
    } else {
      setError({ show: false, message: "" });
      onChange({
        disabled: true,
        address: "",
        amount: "",
        addressToken: "",
      });
      setBalance("");
      FormikValid.values.amount = "";
      setShow(false);
    }
  }, [
    FormikValid.values.destination,
    FormikValid.errors.destination,
    FormikValid.errors.amount,
    FormikValid.values.amount,
    FormikValid.values.tokenAddress,
    FormikValid.errors.tokenAddress,
    provider,
  ]);
  useEffect(() => {
    FormikValid.values.tokenAddress = tokenAddress;
  }, [tokenAddress]);

  useEffect(() => {
    if (addressToken !== "") {
      setTokenAddress(addressToken);
      setLoad(true);
    }
  }, [addressToken]);

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
          <Typography variant="h6" color="primary">
            Send token
          </Typography>

          <CreditCardRounded sx={{ color: "text.secondary" }} />
        </Box>

        <motion.div
          variants={load && TokenVariants}
          initial="rotate"
          animate="rotate"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginRight: "80%",
            marginTop: "10px",
          }}
        >
          <Token
            color="primary"
            sx={{
              fontSize: { xs: 48, sm: 56 },
              transform: "rotate(90deg)",
            }}
          />
        </motion.div>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            gap: 2,
          }}
        >
          {show && (
            <FormGrid sx={{ maxWidth: "20%", mt: 5 }}>
              <TextField
                label="name"
                id="name"
                autoComplete="name"
                placeholder="name"
                value={name}
                InputProps={{
                  readOnly: true,
                }}
              />
            </FormGrid>
          )}
          <FormGrid sx={{ flexGrow: 1, mt: 5 }}>
            <TextField
              value={tokenAddress}
              onChange={handleChange}
              onBlur={FormikValid.handleBlur}
              error={Boolean(FormikValid.errors.tokenAddress)}
              helperText={FormikValid.errors.tokenAddress}
              id="tokenAddress"
              autoComplete="TokenAddress"
              placeholder="0x....."
              required
            />
          </FormGrid>
          {show && (
            <FormGrid sx={{ maxWidth: "20%", mt: 5 }}>
              <TextField
                label="symbol"
                id="symbol"
                autoComplete="symbol"
                placeholder="symbol"
                value={symbol}
                InputProps={{
                  readOnly: true,
                }}
              />
            </FormGrid>
          )}
        </Box>
        {show && (
          <Typography variant="h6" mt={2} mb={2}>
            Balance : {balance}
          </Typography>
        )}
        {show && (
          <Box sx={{ display: "flex", gap: 2 }}>
            <FormGrid sx={{ flexGrow: 1 }}>
              <TextField
                value={FormikValid.values.destination}
                onChange={FormikValid.handleChange}
                onBlur={FormikValid.handleBlur}
                error={
                  FormikValid.touched.destination &&
                  Boolean(FormikValid.errors.destination)
                }
                helperText={
                  FormikValid.touched.destination &&
                  FormikValid.errors.destination
                }
                label="Destination address"
                id="destination"
                autoComplete="Destination"
                placeholder="Destination"
              />
            </FormGrid>
            <FormGrid sx={{ flexGrow: 1 }}>
              <TextField
                value={FormikValid.values.amount}
                onChange={FormikValid.handleChange}
                onBlur={FormikValid.handleBlur}
                error={
                  FormikValid.touched.amount &&
                  Boolean(FormikValid.errors.amount)
                }
                helperText={
                  FormikValid.touched.amount && FormikValid.errors.amount
                }
                label="Amount"
                id="amount"
                autoComplete="amount"
                placeholder="Amount"
                type="number"
              />
            </FormGrid>
          </Box>
        )}
        {error.show && (
          <Typography textAlign="center" color="error">
            {error.message}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default SendToken;

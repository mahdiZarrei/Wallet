import { useState, useEffect, useContext } from "react";
import {
  Select,
  MenuItem,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";

import { ChevronLeftRounded, ChevronRightRounded } from "@mui/icons-material";
import LoadingButton from "@mui/lab/LoadingButton";

import { ethers } from "ethers";
import BN from "bn.js";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

import InfoContext from "../../context/info"; // Importing InfoContext for context management
import Info from "./info";
import InfoMobile from "./info/InfoMobile";
import SendType from "./SendType";
import Review from "./Review";
import { WalletVariants } from "../../animated/index";
import Mode from "../../components/Mode";
import Success from "./Success";
import { REACT_APP_SECRET } from "../../../data";

import WalletContext from "../../context/wallet";

const Wallet = () => {
  // Step titles for the stepper
  const steps = ["details send ", "Check your request"];
  const [tab, setTab] = useState("1"); // State to manage current tab value
  const [addressToken, setAddressToken] = useState("");
  // Function to get the content of each step based on the current step
  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <SendType
            onChange={(newData) => setData(newData)}
            // balance={balance}
            // provider={provider}
            network={network}
            setSendType={setTab}
            SendType={tab}
            addressToken={addressToken}
          />
        );
      case 1:
        return <Review data={data} network={network} />;
      default:
        throw new Error("Unknown step");
    }
  };

  const { walletCrypto, privateKey } = useContext(WalletContext); // Getting values from WalletContext
  const [activeStep, setActiveStep] = useState(0); // State for active step in the stepper
  const [balance, setBalance] = useState(""); // State for wallet balance
  const [disabledPr, setDisabledPr] = useState(false); // State for disabling the progress
  const [data, setData] = useState({
    disabled: true,
    address: "",
    amount: "",
    addressToken: "",
  }); // State for transaction data
  const [gasPrice, setGasPrice] = useState(""); // State for gas price
  const [blockNumber, setBlockNumber] = useState(""); // State for block number
  const [chainId, setChainId] = useState(0.0);
  const [txCount, setTxCount] = useState(0.0);

  const [transection, setTransection] = useState({
    block: "",
    amount: "",
    transactionHash: "",
    type: "",
  }); // State for transaction details
  const [network, setNetwork] = useState("mainnet"); // State for network selection
  const [provider, setProvider] = useState(""); // State for provider

  // Handle network change
  const handleChange = async (event) => {
    const selectedNetwork = event.target.value;
    setNetwork(selectedNetwork);
  };

  // Effect to fetch data based on network and active step
  useEffect(() => {
    const effect = async () => {
      if (network === "mainnet") {
        const pr = new ethers.JsonRpcProvider(
          `https://mainnet.infura.io/v3/${REACT_APP_SECRET}`
        );
        const tCount = await pr.getTransactionCount(walletCrypto.address);
        setTxCount(tCount);
        const network = await pr.getNetwork();
        setChainId(new BN(network.chainId).toNumber());
        const balance = await pr.getBalance(walletCrypto.address);
        setBalance(ethers.formatEther(balance));
        const feeData = await pr.getFeeData();
        const gas = new BN(feeData.gasPrice).toNumber();
        setGasPrice(gas);
        const Bnumber = new BN(await pr.getBlockNumber()).toNumber();
        setBlockNumber(Bnumber);
        setProvider(pr);
      } else {
        const pr = new ethers.JsonRpcProvider(
          `https://sepolia.infura.io/v3/${REACT_APP_SECRET}`
        );
        const balance = await pr.getBalance(walletCrypto.address);
        setBalance(ethers.formatEther(balance));
        const feeData = await pr.getFeeData();
        const gas = new BN(feeData.gasPrice).toNumber();
        const tCount = await pr.getTransactionCount(walletCrypto.address);
        setTxCount(tCount);
        const network = await pr.getNetwork();
        setChainId(new BN(network.chainId).toNumber());

        setGasPrice(gas);
        const Bnumber = new BN(await pr.getBlockNumber()).toNumber();
        setBlockNumber(Bnumber);
        setProvider(pr);
      }
    };
    effect();
  }, [network, activeStep]);

  // Handle the next step action
  const handleNext = async () => {
    if (activeStep === steps.length - 1) {
      setDisabledPr(true);
      try {
        if (data.addressToken === "") {
          const wallet = new ethers.Wallet(privateKey, provider);
          const tx = {
            to: data.address,
            value: ethers.parseEther(data.amount.toString()),
          };
          await wallet.sendTransaction(tx).then((objectTx) => {
            setTransection({
              block: new BN(objectTx.nonce).toNumber(),
              amount: data.amount,
              transactionHash: objectTx.hash,
              type: "ether",
            });
          });
          toast.success("It was sent successfully");
          setActiveStep(steps.length);
        } else {
          await data.contract
            .transfer(data.address, ethers.parseEther(data.amount.toString()))
            .then((tx) => {
              setTransection({
                block: new BN(tx.nonce).toNumber(),
                amount: data.amount,
                transactionHash: tx.hash,
                type: "token",
              });
            });
          toast.success("It was sent successfully");
          setActiveStep(steps.length);
        }
      } catch (error) {
        toast.error(error.message);
        setActiveStep(0);
      } finally {
        setData({ disabled: true, address: "", amount: "", addressToken: "" });
        setDisabledPr(false);
      }
    } else {
      setActiveStep(activeStep + 1);
    }
  };

  // Handle the back step action
  const handleBack = () => {
    setActiveStep(activeStep - 1);
    setData({ disabled: true, address: "", amount: "", addressToken: "" });
  };

  return (
    <InfoContext.Provider
      value={{ provider, balance, gasPrice, blockNumber, chainId, txCount }}
    >
      <motion.div variants={WalletVariants} animate="animate" initial="initial">
        <Grid container sx={{ height: { xs: "100%", sm: "100vh" } }}>
          {/* Left side info for larger screens */}
          <Grid
            item
            xs={12}
            sm={5}
            lg={4}
            sx={{
              display: { xs: "none", md: "flex" },
              flexDirection: "column",
              backgroundColor: "background.paper",
              borderRight: { sm: "none", md: "1px solid" },
              borderColor: { sm: "none", md: "divider" },
              alignItems: "start",
              pt: 4,
              gap: 4,
            }}
          >
            <Info setToken={setAddressToken} setNewTab={setTab} tab={tab} />
          </Grid>
          {/* Right side form and stepper */}
          <Grid
            item
            sm={12}
            md={7}
            lg={8}
            sx={{
              display: "flex",
              flexDirection: "column",
              maxWidth: "100%",
              width: "100%",
              backgroundColor: {
                xs: "background.default",
                sm: "background.default",
              },
              alignItems: "start",
              pt: { xs: 2, sm: 4 },
              px: { xs: 2, sm: 10 },
              gap: { xs: 4, md: 8 },
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: { sm: "space-between", md: "flex-end" },
                alignItems: "center",
                width: "100%",
                maxWidth: { sm: "100%", md: 600 },
              }}
            >
              <Box
                sx={{
                  display: { xs: "flex", md: "none" },
                  flexDirection: "row",
                  width: "100%",
                  justifyContent: "space-between",
                }}
              >
                <Select
                  value={network}
                  onChange={handleChange}
                  disabled={!data.disabled}
                >
                  <MenuItem value="mainnet">Mainnet</MenuItem>
                  <MenuItem value="sepolia">sepolia</MenuItem>
                </Select>
                <Mode />
              </Box>
              <Box
                sx={{
                  display: { xs: "none", md: "flex" },
                  flexDirection: "column",
                  justifyContent: "space-between",
                  alignItems: "flex-end",
                  flexGrow: 1,
                  height: 150,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    width: "100%",
                    justifyContent: "space-between",
                  }}
                >
                  <Select
                    value={network}
                    onChange={handleChange}
                    disabled={!data.disabled}
                  >
                    <MenuItem value="mainnet">Mainnet</MenuItem>
                    <MenuItem value="sepolia">sepolia</MenuItem>
                  </Select>
                  <Mode />
                </Box>
                <Stepper
                  id="desktop-stepper"
                  activeStep={activeStep}
                  sx={{
                    width: "100%",
                    height: 40,
                  }}
                >
                  {steps.map((label) => (
                    <Step
                      sx={{
                        ":first-of-type": { pl: 0 },
                        ":last-child": { pr: 0 },
                      }}
                      key={label}
                    >
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </Box>
            </Box>
            <Card
              sx={{
                display: { xs: "flex", md: "none" },
                width: "100%",
              }}
            >
              <CardContent
                sx={{
                  display: "flex",
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "space-between",
                  ":last-child": { pb: 2 },
                }}
              >
                <Typography variant="body1">
                  {Math.floor(balance * 100) / 100}
                </Typography>
                <InfoMobile
                  setTab={setTab}
                  setToken={setAddressToken}
                  tab={tab}
                  balance={balance}
                  gasPrice={gasPrice}
                  blockNumber={blockNumber}
                />
              </CardContent>
            </Card>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                flexGrow: 1,
                width: "100%",
                maxWidth: { sm: "100%", md: 600 },
                maxHeight: "720px",
                gap: { xs: 5, md: "none" },
              }}
            >
              <Stepper
                id="mobile-stepper"
                activeStep={activeStep}
                alternativeLabel
                sx={{ display: { sm: "flex", md: "none" } }}
              >
                {steps.map((label) => (
                  <Step
                    sx={{
                      ":first-of-type": { pl: 0 },
                      ":last-child": { pr: 0 },
                      "& .MuiStepConnector-root": { top: { xs: 6, sm: 12 } },
                    }}
                    key={label}
                  >
                    <StepLabel
                      sx={{
                        ".MuiStepLabel-labelContainer": { maxWidth: "70px" },
                      }}
                    >
                      {label}
                    </StepLabel>
                  </Step>
                ))}
              </Stepper>
              {activeStep === steps.length ? (
                <Success
                  transection={transection}
                  network={network}
                  onChange={(newStep) => setActiveStep(newStep)}
                />
              ) : (
                <>
                  {getStepContent(activeStep)}
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: { xs: "column-reverse", sm: "row" },
                      justifyContent:
                        activeStep !== 0 ? "space-between" : "flex-end",
                      alignItems: "end",
                      flexGrow: 1,
                      gap: 1,
                      pb: { xs: 12, sm: 0 },
                      mt: { xs: 2, sm: 0 },
                      mb: "60px",
                    }}
                  >
                    {activeStep !== 0 && (
                      <Button
                        startIcon={<ChevronLeftRounded />}
                        onClick={handleBack}
                        variant="text"
                        disabled={disabledPr}
                        sx={{ display: { xs: "none", sm: "flex" } }}
                      >
                        Previous
                      </Button>
                    )}

                    {activeStep !== 0 && (
                      <Button
                        startIcon={<ChevronLeftRounded />}
                        onClick={handleBack}
                        variant="outlined"
                        fullWidth
                        disabled={disabledPr}
                        sx={{ display: { xs: "flex", sm: "none" } }}
                      >
                        Previous
                      </Button>
                    )}
                    <LoadingButton
                      loading={disabledPr}
                      variant="contained"
                      endIcon={<ChevronRightRounded />}
                      onClick={handleNext}
                      sx={{ width: { xs: "100%", sm: "fit-content" } }}
                      disabled={data.disabled}
                    >
                      {activeStep === steps.length - 1
                        ? "Send confirmation"
                        : "Next"}
                    </LoadingButton>
                  </Box>
                </>
              )}
            </Box>
          </Grid>
        </Grid>
      </motion.div>
    </InfoContext.Provider>
  );
};

export default Wallet;

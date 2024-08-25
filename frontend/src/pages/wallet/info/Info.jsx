// This is the Info component which displays wallet information to the user.
// It receives no props and exports the component as the default export.

import { useContext } from "react"; // Importing useContext hook from React

import {
  IconButton,
  Box,
  List,
  ListItemText,
  ListItem,
  Typography,
} from "@mui/material"; // Importing necessary components from Material-UI

import { ContentCopy } from "@mui/icons-material"; // Importing necessary icons from Material-UI

import { textEdit, copyToClipboard } from "../../../utils/index"; // Importing necessary functions from utils

import WalletContext from "../../../context/wallet"; // Importing WalletContext from context

import AnimatedCircularProgress from "./CirculeInfo"; // Importing AnimatedCircularProgress component

import InfoContext from "../../../context/info"; // Importing InfoContext from context

// This is the Info component
const Info = () => {
  // Destructuring necessary values from the context
  const { walletCrypto, loginType, privateKey } = useContext(WalletContext);
  const { balance, gasPrice, blockNumber } = useContext(InfoContext);

  // Array of products to be displayed
  const products = [
    {
      name: "Address", // Name of the product
      desc: "your public address", // Description of the product
      explain: textEdit(walletCrypto.address, 8), // Part of the address to be displayed
      real: walletCrypto.address, // The actual address
    },
    {
      name: "privateKey", // Name of the product
      desc: "your privateKey", // Description of the product
      explain: textEdit(privateKey, 8), // Part of the privateKey to be displayed
      real: privateKey, // The actual privateKey
    },
    {
      name: "Gas price", // Name of the product
      desc: "amount to pay for each transaction", // Description of the product
      explain: gasPrice, // The gasPrice to be displayed
      real: gasPrice, // The actual gasPrice
    },
    {
      name: "Block number", // Name of the product
      desc: "The number of network blocks", // Description of the product
      explain: blockNumber, // The blockNumber to be displayed
      real: blockNumber, // The actual blockNumber
    },
  ];

  // This function returns the JSX for the Info component
  return (
    <>
      <Box>
        <Box>
          <Typography variant="h5" textAlign="center" color="primary">
            balance
          </Typography>
          <Typography
            variant="h6"
            textAlign="center"
            gutterBottom
            color="primary"
          >
            {balance}
          </Typography>
          <AnimatedCircularProgress />
          <List disablePadding>
            {/* If loginType is "seed", display the seed words */}
            {loginType === "seed" && (
              <ListItem sx={{ py: 1, px: 0 }}>
                <ListItemText
                  sx={{ mr: 2 }}
                  primary={<Typography color="secondary">seed </Typography>}
                  secondary={" Wallet seed words"}
                />
                <Typography
                  variant="body1"
                  color="secondary"
                  fontWeight="medium"
                >
                  {textEdit(walletCrypto.mnemonic.phrase, 8)}
                </Typography>
                <IconButton
                  onClick={() => copyToClipboard(walletCrypto.mnemonic.phrase)}
                >
                  <ContentCopy color="success" size="small" />
                </IconButton>
              </ListItem>
            )}
            {/* Display the products array */}
            {products.map((product, index) => (
              <ListItem key={index} sx={{ py: 1, px: 0 }}>
                <ListItemText
                  sx={{ mr: 2 }}
                  primary={
                    <Typography color="secondary">{product.name}</Typography>
                  }
                  secondary={product.desc}
                />
                <Typography
                  variant="body1"
                  color="secondary"
                  fontWeight="medium"
                >
                  {product.explain}
                </Typography>
                <IconButton onClick={() => copyToClipboard(product.real)}>
                  <ContentCopy color="success" size="small" />
                </IconButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
    </>
  );
};

export default Info;

// Importing necessary components and icons from MUI library
import { ContentCopy, Close } from "@mui/icons-material";
import { Box, Button, IconButton, Modal, Typography } from "@mui/material";

// Importing useNavigate hook from react-router-dom to handle navigation
import { useNavigate } from "react-router-dom";

// Importing custom utility functions
import { textEdit, copyToClipboard } from "../../utils/index";

// Importing the image for the modal
import image from "/modalImage.png";

// SucceedModal component displays a success modal with wallet information and navigation buttons
const SucceedModal = ({ onChange, wallet, open }) => {
  // Initializing the navigate function from useNavigate hook
  const navigate = useNavigate();

  // Handling the close event of the modal
  const handleClose = () => {
    onChange(false);
  };

  // Checking if the wallet object is empty, if so initializing it with default values
  const wall =
    wallet !== ""
      ? wallet
      : { address: "", privateKey: "", mnemonic: { phrase: "" } };

  return (
    // Rendering the modal component
    <Modal open={open} onClose={handleClose} sx={{ overflow: "scroll" }}>
      {/* Rendering the modal content */}
      <Box
        sx={{
          position: "absolute",
          top: { md: "50%", xs: "10%" },
          left: { md: "50%", xs: "7.2%" },
          transform: {
            md: "translate(-50%, -50%)",
          },
          width: { md: "50%", xs: "70%" },
          bgcolor: "background.paper",
          borderRadius: "25px",
          pr: 4,
          pl: 4,
          pb: 2,
          overflow: { sx: "scroll" },
          alignItems: "center",
          textAlign: "center",
        }}
      >
        {/* Rendering a close button for the modal */}
        <Box textAlign="right" sx={{ ml: "97%" }}>
          <IconButton onClick={handleClose}>
            <Close />
          </IconButton>
        </Box>

        {/* Rendering the image for the modal */}
        <Box
          display="flex"
          alignItems="center"
          textAlign="center"
          sx={{
            width: { md: "50%", sm: "50%", xs: "100%" },
            mr: { md: "25%", sm: "25%", xs: 0 },
            ml: { md: "25%", sm: "25%", xs: 0 },
          }}
        >
          <Box
            component="img"
            src={image}
            sx={{ width: "100%" }}
            alt="manage imag"
          />
        </Box>

        {/* Rendering the wallet information */}
        <Box display="flex" flexDirection="column">
          <Typography variant="h6" component="p" sx={{ mt: 1 }}>
            address : {textEdit(wall.address.toString(), 10)}
            {/* Rendering a copy button for the address */}
            <IconButton
              onClick={() => copyToClipboard(wall.address.toString())}
            >
              <ContentCopy size="small" />
            </IconButton>
          </Typography>
          <Typography variant="h6" component="h6" sx={{ mt: 1 }}>
            privateKey : {textEdit(wall.privateKey.toString(), 10)}
            {/* Rendering a copy button for the private key */}
            <IconButton
              onClick={() => copyToClipboard(wall.privateKey.toString())}
            >
              <ContentCopy size="small" />
            </IconButton>
          </Typography>
        </Box>

        {/* Rendering the seed phrase */}
        <Typography variant="h6" component="h4" sx={{ mt: 1 }}>
          seed : {textEdit(wall.mnemonic.phrase.toString(), 10)}
          {/* Rendering a copy button for the seed phrase */}
          <IconButton
            onClick={() => copyToClipboard(wall.mnemonic.phrase.toString())}
          >
            <ContentCopy size="small" />
          </IconButton>
        </Typography>

        {/* Rendering navigation buttons */}
        <Box
          textAlign="center"
          sx={{
            mt: 4,
            display: { md: "flex" },
          }}
        >
          {/* Button to navigate to the wallet page */}
          <Button
            fullWidth={{ sm: true }}
            variant="contained"
            color="success"
            onClick={() =>
              navigate("/wallet", {
                state: {
                  wallet: wallet,
                  login: "seed",
                  privateKey: wall.privateKey.toString(),
                },
              })
            }
            sx={{ mr: { md: 2 }, mt: { xs: 2 } }}
          >
            wallet
          </Button>
          {/* Button to navigate to Etherscan with the wallet address */}
          <Button
            variant="contained"
            target="_blank"
            fullWidth={{ sm: true }}
            color="success"
            sx={{ mt: { xs: 2 } }}
            href={`https://etherscan.io/address/${wall.address}`}
          >
            etherScan
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

// Exporting the SucceedModal component
export default SucceedModal;

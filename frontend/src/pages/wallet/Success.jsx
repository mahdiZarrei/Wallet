import { Stack, Typography, Box, Button } from "@mui/material";

// Success component displays a success message after a transaction is completed
const Success = ({ onChange, transection, network }) => {
  return (
    <Stack spacing={2} useFlexGap>
      {/* Displays a checkmark emoji to indicate success */}
      <Typography variant="h1">✅</Typography>

      {/* Displays a success message with the type of transaction */}
      <Typography variant="h5">{transection.type} sent successfully</Typography>

      {/* Displays details about the transaction amount and block nonce */}
      <Typography variant="body1" color="text.secondary">
        The desired amount <strong>&nbsp;({transection.amount})</strong> was
        successfully sent and placed in nonce
        <strong> {transection.block}</strong>
      </Typography>

      {/* Container for the buttons with responsive layout */}
      <Box display="flex" sx={{ flexDirection: { xs: "column", sm: "row" } }}>
        {/* Button to navigate back to the home page, hidden on small screens */}
        <Box display={{ xs: "none", sm: "flex" }}>
          <Button
            onClick={() => onChange(0)}
            variant="outlined"
            sx={{
              mr: 5,
              alignSelf: "start",
              width: { xs: "100%", sm: "auto" },
            }}
          >
            back to home page
          </Button>
        </Box>

        {/* Button to view the transaction on Etherscan, with different URLs based on network */}
        <Button
          variant="contained"
          target="_blank"
          href={
            network === "mainnet"
              ? `https://etherscan.io/tx/${transection.transactionHash}`
              : `https://sepolia.etherscan.io/tx/${transection.transactionHash}`
          }
          sx={{
            alignSelf: "start",
            width: { xs: "100%", sm: "auto" },
          }}
        >
          see your transaction
        </Button>

        {/* Button to navigate back to the home page, displayed only on small screens */}
        <Box display={{ xs: "flex", sm: "none" }}>
          <Button
            onClick={() => onChange(0)}
            variant="outlined"
            sx={{
              mt: 2,
              alignSelf: "start",
              width: { xs: "100%", sm: "auto" },
            }}
          >
            back to home page
          </Button>
        </Box>
      </Box>
    </Stack>
  );
};

export default Success;

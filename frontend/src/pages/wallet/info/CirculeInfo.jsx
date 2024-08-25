import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import InfoContext from "../../../context/info";

const CirculeInfo = () => {
  const { txCount, chainId } = useContext(InfoContext);
  const [price, setPrice] = useState(0.0);
  const circles = [
    {
      id: 1,
      text: Math.round(price),
      color: "warning",
      description: "price Ether($)",
    },
    { id: 2, text: txCount, color: "primary", description: "tx count" },
    { id: 3, text: chainId, color: "secondary", description: "ChainId" },
  ];
  const getPrice = async () => {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
    );
    const data = await response.json();
    setPrice(data.ethereum.usd);
  };
  useEffect(() => {
    getPrice();
  }, []);
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      mt={5}
      alignItems="center"
    >
      <Box display="flex" justifyContent="center" alignItems="center">
        {circles.map((circle) => (
          <motion.div
            key={circle.id}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: circle.id * 0.5 }}
            style={{ margin: "0 20px" }}
          >
            <Box
              position="relative"
              display="inline-flex"
              flexDirection="column"
              alignItems="center"
            >
              <motion.div
                transition={{ duration: 3, ease: "easeInOut", repeat: 5 }}
              >
                <CircularProgress
                  size={80}
                  thickness={4}
                  color={circle.color}
                />
              </motion.div>
              <Box
                top={0}
                left={0}
                bottom={0}
                right={0}
                position="absolute"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    duration: 1,
                    ease: "easeInOut",
                    repeat: 3,
                  }}
                >
                  <Typography
                    variant="h5"
                    color={circle.id === 1 ? "#ffcd38" : circle.color}
                  >
                    {circle.text}
                  </Typography>
                </motion.div>
              </Box>
            </Box>
            <Typography
              textAlign={"center"}
              sx={{
                color: (t) =>
                  t.palette.mode === "dark"
                    ? t.palette.grey[50]
                    : t.palette.grey[900],
              }}
              variant="body2"
              mt={1}
            >
              {circle.description}
            </Typography>
          </motion.div>
        ))}
      </Box>
      <Typography variant="h6" mt={3}></Typography>
    </Box>
  );
};

export default CirculeInfo;

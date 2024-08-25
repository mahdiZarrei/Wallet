import { useState, useEffect, useContext } from "react";
import { TabPanel, TabContext, TabList } from "@mui/lab";
import { Tab, Box, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

import Info from "./Info";
import Token from "./Token";
import axios from "axios";
import { toast } from "react-toastify";
import WalletContext from "../../../context/wallet";

const InfoType = ({ setNewTab, tab, setToken }) => {
  const { walletCrypto } = useContext(WalletContext);

  const [tokens, setTokens] = useState([]);
  const [ref, setRef] = useState(false);

  const handleChange = (event, newValue) => {
    setNewTab(newValue);
  };
  const navigate = useNavigate();

  const getToken = async () => {
    try {
      const user = await axios.get(
        `http://localhost:5000/user/${walletCrypto.address}`
      );
      if (user.data.msg === "is not user") {
        toast.error(user.data.msg);
        navigate("/");
      } else {
        setTokens(user.data.tokens);
        setRef(false);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    getToken();
  }, [ref]);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        alignItems: "center",

        mt: 5,
      }}
    >
      <TabContext value={tab}>
        <Box>
          <TabList onChange={handleChange} centered>
            <Tab label="Info" value="1" />
            <Tab label="Token" value="2" />
          </TabList>
        </Box>

        <TabPanel value="1">
          <Info />
        </TabPanel>
        <TabPanel value="2">
          <Token
            onChange={(newRef) => setRef(newRef)}
            setToken={setToken}
            address={walletCrypto.address}
            tokens={tokens}
          />
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default InfoType;

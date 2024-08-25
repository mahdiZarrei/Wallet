import React, { useEffect } from "react";
import {
  List,
  ListItemButton,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  IconButton,
  Box,
  Typography,
} from "@mui/material";
import { deepOrange, green, grey } from "@mui/material/colors";
import { motion } from "framer-motion";
import ListSubheader from "@mui/material/ListSubheader";
import { copyToClipboard, textEdit } from "../../../utils/index";
import AddToken from "./AddToken";
import {
  TokenOutlined,
  Delete,
  ContentCopyOutlined,
} from "@mui/icons-material";
import axios from "axios";
import { toast } from "react-toastify";

const listVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.3 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0 },
};

const TokenList = ({ setToken, tokens, address, onChange }) => {
  const handleDelete = async (index) => {
    const tokenDel = await axios.put("http://localhost:5000/removeToken", {
      address,
      index,
    });
    if (tokenDel.data.msg === "Token not found") {
      toast.error(tokenDel.data.msg);
    } else {
      toast.success(tokenDel.data.msg);
      onChange(true);
    }
  };
  const test = async (address) => {
    await setToken(address);
    setToken("");
  };
  useEffect(() => {
    setToken("");
  }, []);
  return (
    <motion.div initial="hidden" animate="visible" variants={listVariants}>
      <List
        sx={{ width: "100%", bgcolor: "background.paper" }}
        subheader={<ListSubheader>Tokens</ListSubheader>}
      >
        {tokens.map((address, index) => (
          <motion.div key={index} variants={itemVariants}>
            <ListItem
              key={index}
              secondaryAction={
                <IconButton
                  color="error"
                  onClick={() => handleDelete(index)}
                  edge="end"
                >
                  <Delete />
                </IconButton>
              }
              disablePadding
            >
              {" "}
              <IconButton onClick={() => copyToClipboard(address)} edge="end">
                <ContentCopyOutlined
                  sx={{
                    color: index % 2 === 0 ? deepOrange[500] : green[500],
                  }}
                />
              </IconButton>
              <ListItemButton onClick={() => test(address)}>
                <ListItemAvatar>
                  <Box>
                    <Avatar
                      sx={{
                        bgcolor: index % 2 === 0 ? green[500] : deepOrange[500],
                      }}
                      variant="rounded"
                    >
                      <TokenOutlined fontSize="medium" />
                    </Avatar>
                  </Box>
                </ListItemAvatar>
                <ListItemText
                  sx={{
                    color: (t) =>
                      t.palette.mode === "light" ? grey[900] : grey[50],
                  }}
                  id={index}
                  primary={
                    <Typography sx={{ fontSize: { md: 16, sm: 20, xs: 13 } }}>
                      {textEdit(address, 15)}
                    </Typography>
                  }
                />
              </ListItemButton>
            </ListItem>
          </motion.div>
        ))}
        <motion.div variants={itemVariants}>
          <AddToken address={address} onChange={onChange} />
        </motion.div>
      </List>
    </motion.div>
  );
};

export default TokenList;

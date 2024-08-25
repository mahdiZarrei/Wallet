import { useEffect, useState } from "react";
import { Box, Button, Drawer, IconButton } from "@mui/material";

import { Close, ExpandMoreRounded } from "@mui/icons-material";

import Info from "./index";

const InfoMobile = ({ setTab, tab, setToken }) => {
  const [open, setOpen] = useState(false);
  const [change, onchange] = useState(tab);

  useEffect(() => {
    setTab(change);
  }, [change]);
  useEffect(() => {
    onchange(tab);
  }, [tab]);
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: "auto", px: 3, pb: 3, pt: 8 }} role="presentation">
      <IconButton
        onClick={toggleDrawer(false)}
        sx={{ position: "absolute", right: 8, top: 8 }}
      >
        <Close />
      </IconButton>
      <Info setNewTab={onchange} tab={change} setToken={setToken} />
    </Box>
  );

  return (
    <div>
      <Button
        variant="text"
        endIcon={<ExpandMoreRounded />}
        onClick={toggleDrawer(true)}
      >
        View details
      </Button>
      <Drawer open={open} anchor="top" onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
};

export default InfoMobile;

import { useState, useEffect, useContext } from "react";
import {
  Typography,
  Stack,
  RadioGroup,
  CardContent,
  CardActionArea,
  Card,
} from "@mui/material";
import { Paid, Token } from "@mui/icons-material";

import SendEther from "./SendEther";
import SendToken from "./SendToken";

// SendType component handles the selection and rendering of Send types (Ether or Token)
const SendType = ({
  onChange,

  SendType,
  setSendType,
  addressToken,
}) => {
  const [data, setData] = useState({
    disabled: true,
    address: "",
    amount: "",
    token: "",
  });

  // Handles the change of Send type selection
  const handleSendTypeChange = (event) => {
    setSendType(event.target.value);
  };

  // Resets data and sets Send type to 'token'
  const onClickToken = () => {
    onChange({
      disabled: true,
      address: "",
      amount: "",
      token: "",
    });
    setSendType("2");
  };

  // Resets data and sets Send type to 'ether'
  const onClickEther = () => {
    onChange({
      disabled: true,
      address: "",
      amount: "",
      token: "",
    });
    setSendType("1");
  };

  // Updates parent component whenever data state changes
  useEffect(() => {
    onChange(data);
  }, [data]);

  return (
    <Stack spacing={{ xs: 3, sm: 6 }} useFlexGap>
      <RadioGroup
        aria-label="Send options"
        name="SendType"
        value={SendType}
        onChange={handleSendTypeChange}
        sx={{
          flexDirection: { sm: "column", md: "row" },
          gap: 2,
        }}
      >
        <Card
          raised={SendType === "1"}
          sx={{
            maxWidth: { sm: "100%", md: "50%" },
            flexGrow: 1,
            outline: "1px solid",
            outlineColor: SendType === "1" ? "primary.main" : "divider",
            backgroundColor: SendType === "1" ? "background.default" : "",
          }}
        >
          <CardActionArea onClick={onClickEther}>
            <CardContent sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Paid color="secondary" fontSize="small" />
              <Typography color="secondary" fontWeight="medium">
                Ether
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card
          raised={SendType === "2"}
          sx={{
            maxWidth: { sm: "100%", md: "50%" },
            flexGrow: 1,
            outline: "1px solid",
            outlineColor: SendType === "2" ? "primary.main" : "divider",
            backgroundColor: SendType === "2" ? "background.default" : "",
          }}
        >
          <CardActionArea onClick={onClickToken}>
            <CardContent sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Token color="primary" fontSize="small" />
              <Typography color="primary" fontWeight="medium">
                Token
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </RadioGroup>

      {/* Render the appropriate component based on the selected Send type */}
      {SendType === "1" && (
        <SendEther onChange={(newData) => setData(newData)} />
      )}
      {SendType === "2" && (
        <SendToken
          onChange={(newData) => setData(newData)}
          addressToken={addressToken}
        />
      )}
    </Stack>
  );
};

export default SendType;

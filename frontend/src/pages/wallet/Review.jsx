import {
  Typography,
  Stack,
  ListItemText,
  ListItem,
  List,
  Divider,
} from "@mui/material";
import { textEdit } from "../../utils/index";

const Review = ({ data, network }) => {
  return (
    <Stack spacing={2}>
      <List disablePadding>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText
            primary="Amount"
            secondary={data.addressToken === "" ? "ether" : "token"}
          />
          <Typography variant="body2">{data.amount}</Typography>
        </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Send address" secondary={network} />
          <Typography variant="body2">{textEdit(data.address, 8)}</Typography>
        </ListItem>
      </List>
      <Divider />
      {data.addressToken === "" ? (
        ""
      ) : (
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Token address" secondary={network} />
          <Typography variant="body2">
            {textEdit(data.addressToken, 8)}
          </Typography>
        </ListItem>
      )}

      <Stack
        direction="column"
        divider={<Divider flexItem />}
        spacing={2}
        sx={{ my: 2 }}
      />
    </Stack>
  );
};

export default Review;

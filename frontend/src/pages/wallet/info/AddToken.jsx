import { useState } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
} from "@mui/material";
import { useFormik } from "formik";
import { sendValid } from "../../../validations/Send";
import { FormGrid } from "../FormGrid";
import { LoadingButton } from "@mui/lab";
import axios from "axios";
import { toast } from "react-toastify";

const AddToken = ({ address, onChange }) => {
  const [open, setOpen] = useState(false);
  const [add, setAdd] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleAdd = async () => {
    if (FormikValid.values.tokenAddress !== "") {
      try {
        setAdd(true);
        if (FormikValid.values.tokenAddress !== address) {
          const token = await axios.put("http://localhost:5000/addToken", {
            address,
            token: FormikValid.values.tokenAddress,
          });
          if (token.data.msg === "The token has already been written") {
            toast.error(token.data.msg);
          } else {
            toast.success(token.data.msg);
            onChange(true);
            setOpen(false);
          }
        } else {
          toast.error("The token address cannot be your own address");
        }
      } catch (error) {
      } finally {
        setAdd(false);
        FormikValid.values.tokenAddress = "";
      }
    }
  };
  const FormikValid = useFormik({
    initialValues: {
      tokenAddress: "",
    },
    validationSchema: sendValid,
  });

  return (
    <>
      <Box mt={5} textAlign="center">
        <Button variant="outlined" onClick={handleClickOpen}>
          add token
        </Button>
      </Box>

      <Dialog
        open={open}
        aria-labelledby="form-dialog-title"
        PaperProps={{
          style: {
            width: "600px",
          },
        }}
      >
        <DialogTitle id="form-dialog-title">Token</DialogTitle>
        <Box component="form" onSubmit={FormikValid.handleSubmit}>
          <DialogContent>
            <FormGrid>
              <TextField
                value={FormikValid.values.tokenAddress}
                onChange={FormikValid.handleChange}
                onBlur={FormikValid.handleBlur}
                error={Boolean(FormikValid.errors.tokenAddress)}
                helperText={FormikValid.errors.tokenAddress}
                label="token address"
                id="tokenAddress"
                autoComplete="address"
                placeholder="token address"
                margin="dense"
              />
            </FormGrid>
          </DialogContent>

          <DialogActions>
            <LoadingButton onClick={handleClose} loading={add} color="error">
              Cancel
            </LoadingButton>
            <LoadingButton
              onClick={handleAdd}
              type="submit"
              disabled={Boolean(FormikValid.errors.tokenAddress)}
              loading={add}
              color="primary"
            >
              Add
            </LoadingButton>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  );
};

export default AddToken;

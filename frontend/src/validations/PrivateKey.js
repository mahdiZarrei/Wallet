import { object, string } from "yup";
export const privateKeyValid = object({
  privateKey: string("Type not String")
    .required("Required field")
    .matches(/^(0x)?[0-9a-f]{64}$/i, "is Not privateKey"),
});

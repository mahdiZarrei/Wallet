import { object, number, string } from "yup";
export const sendValid = object({
  amount: number("just number").typeError("just number").required().moreThan(0),
  destination: string()
    .required()
    .matches(/^0x[a-fA-F0-9]{40}$/g, "is Not Address"),
  tokenAddress: string()
    .required()
    .matches(/^0x[a-fA-F0-9]{40}$/g, "is Not Address"),
});

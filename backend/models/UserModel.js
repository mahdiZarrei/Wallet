import mongoose from "mongoose";

const User = mongoose.Schema({
  address: {
    type: String,
    required: true,
    unique: true,
    minlength: 42,
    maxlength: 42,
  },
  addressTokens: {
    type: [String],
  },
});
export default mongoose.model("User", User);

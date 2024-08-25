import User from "../models/UserModel.js";

export const getUserByAddress = async (req, res) => {
  try {
    const user = await User.findOne({ address: req.params.address });
    if (user === null) {
      res.json({
        tokens: [],
        haveToken: false,
        msg: "is not user",
      });
    } else {
      res.json({
        tokens: user.addressTokens,
        haveToken: user.addressTokens[0] === undefined ? false : true,
        msg: "User successfully logged in",
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const saveUser = async (req, res) => {
  if (req.body.address === undefined) {
    res.json({ msg: "address is required" });
  } else {
    const user = await User.findOne({ address: req.body.address });
    if (user === null) {
      const newUser = new User(req.body);
      try {
        const inserteduser = await newUser.save();
        res.json(inserteduser);
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
      //  }
    } else {
      res.json({ msg: "The user is already registered" });
    }
  }
};

export const addToken = async (req, res) => {
  try {
    const user = await User.findOne({ address: req.body.address });
    const tokens = user.addressTokens;
    if (tokens[0] !== undefined) {
      for (let index = 0; index < tokens.length; index++) {
        if (tokens[index] === req.body.token) {
          return res.json({ msg: "The token has already been written" });
        }
      }
      await User.updateOne(
        { address: req.body.address },
        { $push: { addressTokens: req.body.token } }
      );
    } else {
      await User.updateOne(
        { address: req.body.address },
        { $push: { addressTokens: req.body.token } }
      );
    }
    return res.json({ msg: "Token added successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const removeToken = async (req, res) => {
  try {
    const user = await User.findOne({ address: req.body.address });
    const tokens = user.addressTokens;
    if (tokens[req.body.index] !== undefined) {
      await User.updateOne(
        { address: req.body.address },
        { $unset: { [`addressTokens.${req.body.index}`]: 1 } }
      );

      await User.updateOne(
        { address: req.body.address },
        { $pull: { addressTokens: null } }
      );
    } else {
      return res.json({ msg: "Token not found" });
    }
    return res.json({ msg: "Token removed successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

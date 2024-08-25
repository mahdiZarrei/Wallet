const getGasAmount = async (fromAddress, toAddress, amount, web3) => {
  var gasAmount = "";
  await web3.eth
    .estimateGas({
      to: toAddress,
      from: fromAddress,
      value: web3.utils.toWei(amount, "ether"),
    })
    .then((amount) => (gasmount = amount));
  return gasAmount;
};
export default getGasAmount;

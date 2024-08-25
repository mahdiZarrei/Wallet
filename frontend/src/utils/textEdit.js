const shortenString = (str, length) => {
  if (str.length < 10) {
    return str;
  }
  const firstFive = str.substring(0, length);
  const lastFive = str.substring(str.length - length);
  return `${firstFive}...${lastFive}`;
};
export default shortenString;

export default numString => {
  let builtNumString = numString;
  const romanConversions = {
    1000: `M`,
    900: `CM`,
    500: `D`,
    400: `CD`,
    100: `C`,
    90: `XC`,
    50: `L`,
    40: `XL`,
    10: `X`,
    9: `IX`,
    5: `V`,
    4: `IV`,
    1: `I`,
  };
  let result = ``;
  const keys = Object.keys(romanConversions);
  let i = keys.length - 1;

  while (i >= 0) {
    const int = keys[i];
    while (builtNumString >= parseInt(int, 10)) {
      builtNumString -= int;
      result += romanConversions[int];
    }
    i--;
  }
  return `${result}.`;
};

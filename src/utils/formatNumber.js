const formatNumber = (value, decimalPlaces) => {
  const decimals = decimalPlaces || 2;
  const convertedValue = parseFloat(value.replace(".", "").replace(",", "."));
  return !isNaN(convertedValue)
    ? convertedValue.toFixed(decimals)
    : "No cotiza";
};

module.exports = { formatNumber };

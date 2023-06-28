export const formatNumber = (value: string, decimalPlaces?: number): string => {
  const decimals: number = decimalPlaces || 2;
  const convertedValue: number = parseFloat(
    value.replace(".", "").replace(",", ".")
  );
  return !isNaN(convertedValue)
    ? convertedValue.toFixed(decimals)
    : "No cotiza";
};

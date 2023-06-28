"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatNumber = void 0;
const formatNumber = (value, decimalPlaces) => {
    const decimals = decimalPlaces || 2;
    const convertedValue = parseFloat(value.replace(".", "").replace(",", "."));
    return !isNaN(convertedValue)
        ? convertedValue.toFixed(decimals)
        : "No cotiza";
};
exports.formatNumber = formatNumber;

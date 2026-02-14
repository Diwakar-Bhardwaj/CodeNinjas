/**
 * Calculates the discount percentage.
 * @param {number} price - The current (discounted) price.
 * @param {number} realPrice - The original price.
 * @returns {string} - The discount percentage string (e.g., "50% off").
 */
export const calculateDiscountPercentage = (price, realPrice) => {
  if (!realPrice || realPrice <= price) {
    return "0% off";
  }
  
  const discount = ((realPrice - price) / realPrice) * 100;
  return `${Math.round(discount)}% off`;
};
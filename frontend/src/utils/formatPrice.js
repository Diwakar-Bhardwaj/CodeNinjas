/**
 * Formats a number as a currency string.
 * @param {number} price - The price to format.
 * @returns {string} - The formatted price string (e.g., "₹999").
 */
export const formatPrice = (price) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price);
};
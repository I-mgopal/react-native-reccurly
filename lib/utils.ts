/**
 * Formats a numeric value as standard Indian money (INR) with exactly two decimal places.
 * 
 * @param value - The numeric value to format (number or string)
 * @param currency - The currency code (defaults to 'INR')
 * @returns A formatted currency string
 */
// export const formatCurrency = (value: number | string, currency: string = 'INR') => {
//   try {
//     const numericValue = typeof value === 'string' ? parseFloat(value) : value;

//     if (isNaN(numericValue)) {
//       return `${currency === 'INR' ? '₹' : currency} 0.00`;
//     }

//     return new Intl.NumberFormat('en-IN', {
//       style: 'currency',
//       currency: currency,
//       minimumFractionDigits: 2,
//       maximumFractionDigits: 2,
//     }).format(numericValue);
//   } catch (error) {
//     console.error('Error formatting currency:', error);
    
//     // Fallback formatting
//     const formattedValue = typeof value === 'number' ? value.toFixed(2) : value;
//     const symbol = currency === 'INR' ? '₹' : currency;
//     return `${symbol} ${formattedValue}`;
//   }
// };

// export const formatDate = (dateString: string | undefined) => {
//   if (!dateString) return "";
//   const date = new Date(dateString);
//   if (isNaN(date.getTime())) return "";

//   // Format as "MM/DD/YYYY" -> "10/25/2024"
//   const month = (date.getMonth() + 1).toString().padStart(2, "0");
//   const day = date.getDate().toString().padStart(2, "0");
//   const year = date.getFullYear();

//   return `${month}/${day}/${year}`;
// };
import dayjs from "dayjs";

export const formatCurrency = (value: number, currency = "USD"): string => {
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  } catch {
    return value.toFixed(2);
  }
};

export const formatSubscriptionDateTime = (value?: string): string => {
  if (!value) return "Not provided";
  const parsedDate = dayjs(value);
  return parsedDate.isValid() ? parsedDate.format("MM/DD/YYYY") : "Not provided";
};

export const formatStatusLabel = (value?: string): string => {
  if (!value) return "Unknown";
  return value.charAt(0).toUpperCase() + value.slice(1);
};
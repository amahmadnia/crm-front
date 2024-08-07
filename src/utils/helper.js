export function extractHourAndMinute(timeString) {
  // Split the time string by ':' to get hours, minutes, and seconds
  const parts = timeString.split(':');

  // Extract hours and minutes
  const hours = parts[0];
  const minutes = parts[1];

  // Return the formatted result
  return `${hours}:${minutes}`;
}

export function formatNumber(num) {
  // Remove the decimal part
  let integerPart = Math.floor(num);

  // Convert to string and add commas every 3 digits
  return integerPart.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function formatDate(date) {
  let year = date.getFullYear();
  let month = (date.getMonth() + 1).toString().padStart(2, '0'); // getMonth() is zero-based
  let day = date.getDate().toString().padStart(2, '0');

  return `${year}-${month}-${day}`;
}

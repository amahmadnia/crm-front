export function extractHourAndMinute(timeString) {
  // Split the time string by ':' to get hours, minutes, and seconds
  const parts = timeString.split(':');

  // Extract hours and minutes
  const hours = parts[0];
  const minutes = parts[1];

  // Return the formatted result
  return `${hours}:${minutes}`;
}

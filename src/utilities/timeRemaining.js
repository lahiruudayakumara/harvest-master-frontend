import { default as convertToStandardDate } from "./dateConversions";



function calculateTimeRemaining(startDate) {
  // Convert the start date to standard date format
  startDate = convertToStandardDate(startDate);

  // Convert the start date to milliseconds
  const startMillis = new Date(startDate).getTime();

  // Calculate the deadline by adding 7 days to the start date
  const deadlineMillis = startMillis + 7 * 24 * 60 * 60 * 1000;

  // Calculate the difference in milliseconds between the deadline and the start date
  const difference = deadlineMillis - Date.now();

  // Convert the difference to days, hours, and minutes
  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

  return `${days} days ${hours} hrs ${minutes} mins`;
}

export default calculateTimeRemaining;

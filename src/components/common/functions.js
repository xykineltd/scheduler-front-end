export function toSentenceCase(str) {
  if (!str || typeof str !== "string") {
    return ""; // Handle non-string input or empty string
  }

  // Convert the first character to uppercase and the rest to lowercase
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/**
 * Check if a character is an alphabetic character
 *
 * @param {string} character - The character to check
 * @returns {boolean} True if the character is alphabetic, false otherwise
 * @example
 * isAlpha("a"); // returns true
 * isAlpha("1"); // returns false
 * isAlpha("A"); // returns true
 * isAlpha("!"); // returns false
 * isAlpha(" "); // returns false
 * isAlpha("abc"); // returns false
 */
const isAlpha = (character) => /[A-Za-z]/v.test(character);

export default isAlpha;

import isAlphaNumeric from "../../_common/is-alpha-numeric.js";

/**
 * Checks if a character is valid for use in a section name.
 * Valid characters include alphanumeric characters, hyphens, and periods.
 *
 * @param {string} character - The character to check for validity
 * @returns {boolean} True if the character is valid for a section name, false otherwise
 * @example
 * isValidNameCharacter("a"); // returns true
 * isValidNameCharacter("-"); // returns true
 * isValidNameCharacter("."); // returns true
 * isValidNameCharacter(" "); // returns false
 */
const isValidNameCharacter = (character) => isAlphaNumeric(character) || character === "-" || character === ".";

export default isValidNameCharacter;

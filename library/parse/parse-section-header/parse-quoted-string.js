import { parseEscapeSequence } from "./parse-quoted-string/_exports.js";

/**
 * Parse a quoted string, handling escape sequences
 *
 * @param {string} string - The string to parse
 * @returns {{rest: string, value: string}} An object containing the remaining string and the parsed value
 * @example
 * parseQuotedString('"Hello, world!"');
 * // Returns { rest: "", value: "Hello, world!" }
 */
const parseQuotedString = (string) => {
	let result = "";
	let index = 0;

	// Skip the opening quote
	if (string[index] === "\"") {
		index += 1;
	}

	while (index < string.length) {
		if (string[index] === "\"") {
			// End of quoted string
			index += 1;
			break;
		}
		else if (string[index] === "\\") {
			// Handle escape sequence
			const { nextIndex, character } = parseEscapeSequence(string, index);

			result += character;
			index = nextIndex;
		}
		else {
			result += string[index];
			index += 1;
		}
	}

	return {
		rest: string.slice(index).trim(),
		value: result
	};
};

export default parseQuotedString;

/* eslint-disable regexp/no-super-linear-move -- necessary */

import { isAlphaNumeric, isWhitespace } from "./_common/_exports.js";
import { isAlpha } from "./parse-variable/_exports.js";

/**
 * Parse variable name and value: name = value
 *
 * @param {string} line - The line to parse
 * @returns {{name: string, value: string}|null} An object containing the variable name and value, or null if invalid
 * @example
 */
const parseVariable = (line) => {
	let index = 0;
	let name = "";

	// Parse variable name
	while (index < line.length) {
		const char = line[index];

		if (index === 0 && !isAlpha(char)) {
			// Variable names must start with a letter
			return null;
		}
		else if (isWhitespace(char) || char === "=") {
			break;
		}
		else if (isAlphaNumeric(char) || char === "-") {
			name += char;
		}
		else {
			// Invalid character in variable name
			return null;
		}
		index += 1;
	}

	// Skip whitespace before equals sign
	while (index < line.length && isWhitespace(line[index])) {
		index += 1;
	}

	// If there's no equals sign, treat as boolean true
	if (index >= line.length || line[index] !== "=") {
		return {
			name: name.toLowerCase(),
			value: "true"
		};
	}

	// Skip equals sign and whitespace after it
	index += 1;
	while (index < line.length && isWhitespace(line[index])) {
		index += 1;
	}

	// Rest of the line is the value, trimmed of trailing whitespace
	const value = line.slice(index).replace(/\s+$/v, "");

	return {
		name: name.toLowerCase(),
		value
	};
};

export default parseVariable;

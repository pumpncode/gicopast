import isWhitespace from "../_common/is-whitespace.js";

import { isValidNameCharacter } from "./parse-main-section-name/_exports.js";

/**
 * Parses the main section name from the given content string.
 * Extracts the section name and remaining content.
 *
 * @param {string} content - The content string to parse for a section name
 * @returns {{parts: string[], remaining: string}|null} An object containing the parsed parts and remaining content, or null if invalid
 * @example
 * parseMainSectionName("section content");
 * // Returns { parts: ["section"], remaining: "content" }
 *
 * parseMainSectionName("section");
 * // Returns { parts: ["section"], remaining: "" }
 */
const parseMainSectionName = (content) => {
	const parts = [];

	let remaining = content;
	let sectionName = "";

	// Parse the main section name
	for (let index = 0; index < remaining.length; index++) {
		const char = remaining[index];

		if (isWhitespace(char)) {
			parts.push(sectionName);
			remaining = remaining.slice(index).trim();
			break;
		}
		else if (isValidNameCharacter(char)) {
			sectionName += char;
		}
		else {
			// Invalid character in section name
			return null;
		}

		// If we reach the end, add the section name
		if (index === remaining.length - 1) {
			parts.push(sectionName);
			remaining = "";
		}
	}

	return {
		parts,
		remaining
	};
};

export default parseMainSectionName;

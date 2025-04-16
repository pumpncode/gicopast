import { isWhitespace } from "./_common/_exports.js";
import {
	parseMainSectionName,
	parseQuotedString
} from "./parse-section-header/_exports.js";

/**
 * Parse section header: [section "subsection"]
 *
 * @param {string} line - The line to parse
 * @returns {string[]|null} An array of section names or null if invalid
 * @example
 */
const parseSectionHeader = (line) => {
	if (!line.startsWith("[")) {
		return null;
	}
	if (!line.endsWith("]")) {
		return null;
	}

	// Remove brackets
	const content = line.slice(1, -1).trim();

	const parseMainSectionNameResult = parseMainSectionName(content) ?? {
		parts: [],
		remaining: content
	};

	const { parts } = parseMainSectionNameResult;
	let { remaining } = parseMainSectionNameResult;

	// Parse any subsection names (quoted strings)
	while (remaining.length > 0) {
		if (remaining.startsWith("\"")) {
			const { rest, value } = parseQuotedString(remaining);

			parts.push(value);
			remaining = rest;
		}
		else if (isWhitespace(remaining[0])) {
			remaining = remaining.slice(1);
		}
		else {
			// Invalid character
			return null;
		}
	}

	return parts;
};

export default parseSectionHeader;

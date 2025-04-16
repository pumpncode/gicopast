import {
	parseSectionHeader,
	parseVariable,
	skipWhitespaceAndComments
} from "./parse/_exports.js";

/**
 * Parse a git config file string into a structured format
 *
 * @param {string} text - The git config file content to parse
 * @returns {{name: string[], values: Record<string, string>}[]} An array of sections with their values
 * @example
 * parse('[user]\n  name = John Doe\n  email = john@example.com');
 * // Returns: [{ name: ['user'], values: { name: 'John Doe', email: 'john@example.com' }}]
 */
const parse = (text) => {
	// State variables for parsing
	let position = 0;
	let lines = text.split("\n");
	const result = [];

	/**
	 * @type {{name: string[], values: Record<string, string>}|null}
	 */
	let currentSection = null;

	// Main parsing logic
	while (position < lines.length) {
		(
			{
				lines,
				position
			} = skipWhitespaceAndComments({
				lines,
				position
			})
		);

		if (position >= lines.length) {
			break;
		}

		const line = lines[position].trim();

		// Parse section header
		if (line.startsWith("[")) {
			const sectionParts = parseSectionHeader(line);

			if (sectionParts) {
				currentSection = {
					name: sectionParts,
					values: {}
				};

				result.push(currentSection);
			}
		}
		// Parse variable if we're in a section
		else if (currentSection !== null) {
			const variable = parseVariable(line);

			if (variable !== null) {
				currentSection.values[variable.name] = variable.value;
			}
		}

		position += 1;
	}

	return result;
};

export default parse;

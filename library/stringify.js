/**
 * Escape special characters in a string value
 *
 * @param {string} value - The string to escape
 * @returns {string} The escaped string
 * @example
 */
const escapeValue = (value) => value
	.replaceAll("\\", "\\\\")
	.replaceAll("\"", String.raw`\"`)
	.replaceAll("\n", String.raw`\n`)
	.replaceAll("\t", String.raw`\t`)
	.replaceAll("\r", String.raw`\r`)
	.replaceAll("\f", String.raw`\f`);

/**
 * Format a section header with potential subsections
 *
 * @param {string[]} nameParts - The section name parts
 * @returns {string} The formatted section header
 * @example
 */
const formatSectionHeader = (nameParts) => {
	if (!Array.isArray(nameParts) || nameParts.length === 0) {
		throw new TypeError("Section name must be a non-empty array");
	}

	const [mainSection, ...subsections] = nameParts;

	if (subsections.length === 0) {
		return `[${mainSection}]`;
	}

	const quotedSubsections = subsections
		.map((sub) => `"${escapeValue(sub)}"`)
		.join(" ");

	return `[${mainSection} ${quotedSubsections}]`;
};

/**
 * Format a key-value pair
 *
 * @param {string} key - The variable name
 * @param {string} value - The variable value
 * @returns {string} The formatted key-value pair
 * @example
 */
const formatKeyValue = (key, value) => {
	if (value === "true") {
		return key;
	}

	return `${key} = ${value}`;
};

/**
 * Convert a parsed Git config object back to a config file string
 *
 * @param {{name: string[], values: Record<string, string>}[]} object - The parsed Git config object
 * @returns {string} The formatted Git config string
 * @example
 * ```js
 * stringify([{ name: ["user"], values: { name: "John Doe", email: "john@example.com" } }]);
 * // Returns: `[user]
 * // 	name = John Doe
 * // 	email = john@example.com`
 * ```
 */
const stringify = (object) => {
	if (!Array.isArray(object)) {
		throw new TypeError("Input must be an array of section objects");
	}

	const result = [];

	// Process each section
	for (const section of object) {
		// Add the section header
		result.push(formatSectionHeader(section.name));

		// Add each key-value pair in this section
		for (const [key, value] of Object.entries(section.values)) {
			result.push(`\t${formatKeyValue(key, value)}`);
		}

		// Add an empty line after each section except the last
		if (section !== object.at(-1)) {
			result.push("");
		}
	}

	return result.join("\n");
};

export default stringify;

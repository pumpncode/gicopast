/**
 * Skip whitespace and comments.
 *
 * @param {object} options - The root object
 * @param {string[]} options.lines - The root object
 * @param {number} options.position - The root object
 * @example
 */
const skipWhitespaceAndComments = ({
	lines,
	position
}) => {
	let nextPosition = position;
	const nextLines = [...lines];

	while (nextPosition < nextLines.length) {
		const line = nextLines[nextPosition].trim();

		if (line === "" || line.startsWith("#") || line.startsWith(";")) {
			nextPosition += 1;
		}
		else {
			break;
		}
	}

	return {
		lines: nextLines,
		position: nextPosition
	};
};

export default skipWhitespaceAndComments;

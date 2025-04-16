/**
 * Parse escape sequences like in the Haskell escSeq function
 *
 * @param {string} string - The string containing escape sequences to parse
 * @param {number} index - The current index in the string where a backslash was found
 * @returns {{nextIndex: number, character: string}} An object containing the next index to continue parsing from and the parsed character
 * @example
 * parseEscapeSequence('test\\ntext', 4); // => { nextIndex: 6, character: '\n' }
 */
const parseEscapeSequence = (string, index) => {
	if (index + 1 >= string.length) {
		return {
			nextIndex: index + 1,
			character: "\\"
		};
	}

	const nextCharacter = string[index + 1];

	switch (nextCharacter) {
		case "\"": return {
			nextIndex: index + 2,
			character: "\""
		};
		case "/": return {
			nextIndex: index + 2,
			character: "/"
		};
		case "\\": return {
			nextIndex: index + 2,
			character: "\\"
		};
		case "b": return {
			nextIndex: index + 2,
			character: "\b"
		};
		case "f": return {
			nextIndex: index + 2,
			character: "\f"
		};
		case "n": return {
			nextIndex: index + 2,
			character: "\n"
		};
		case "r": return {
			nextIndex: index + 2,
			character: "\r"
		};
		case "t": return {
			nextIndex: index + 2,
			character: "\t"
		};
		default: return {
			nextIndex: index + 2,
			character: nextCharacter
		};
	}
};

export default parseEscapeSequence;

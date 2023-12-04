export const config = {
	options: ['inline', 'blockType', 'textAlign'],
	inline: {
		options: ['bold', 'italic', 'underline', 'strikethrough'],
	},
	blockType: {
		inDropdown: true,
		options: ['Normal', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6'],
	},
	list: {
		inDropdown: true,
		options: ['unordered', 'ordered'],
	},
	textAlign: {
		inDropdown: true,
		options: ['left', 'center', 'right', 'justify'],
	},
	link: {
		inDropdown: false,
	},
	emoji: {
		inDropdown: false,
	},
	image: {
		urlEnabled: true,
		uploadEnabled: true,
		alignmentEnabled: true,
		uploadCallback: () => {},
	},
};

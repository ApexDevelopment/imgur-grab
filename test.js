const assert = require("assert");
const url = require("url");
const imgur = require("./index.js");

imgur("test").then((links) => {
	console.log("First link: " + links[0]);
	assert(links, `Links was null or undefined: ${typeof links}`);
	assert(Array.isArray(links), `Links was not an array: ${typeof links}`);

	links.forEach((link, index) => {
		assert.strictEqual(typeof link, "string", `Link #${index} was not a string: ${typeof link}`);

		const parsed = url.parse(link);
		assert.strictEqual(parsed.hostname, "i.imgur.com", `Link #${index} was not an Imgur image link: ${parsed.hostname}`);
	});

	console.log("Tests passed.");
});
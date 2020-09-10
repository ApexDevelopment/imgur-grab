## imgur-grab
### No-BS Imgur searching.
<hr>

`npm i ApexDevelopment/imgur-grab`

This is a package that allows for easy scraping of Imgur search results (so no API key is needed). It is meant for simple hobby projects and should not be used in production! A simple change to Imgur's frontend HTML could break this.

### How to use
Using `imgur-grab` is simple:
```JavaScript
const imgur = require("imgur-grab");

// "imgur" is a function that takes a search query:
imgur("puppies").then((results) => {
	// "results" is an array of links to the raw images
	// For example, https://i.imgur.com/someimage.png
	for (let result of results) {
		console.log(result);
	}
}).catch((err) => {
	console.log(err);
});
```
That's it! There are no options to configure. The results are exactly what you would get by visiting Imgur and typing something into the search box. Results are limited to only the first page. This should be sufficient for, say, a Discord bot with an image search command.
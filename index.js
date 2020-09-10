const { get } = require("https");

module.exports = (query) => {
	return new Promise((resolve, reject) => {
		get(`https://imgur.com/search?q=${query}`, {
			headers: {
				"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:68.0) Gecko/20100101 Firefox/68.0"
			}
		}, (res) => {
			const { statusCode } = res;
			const contentType = res.headers["content-type"];
			
			if (statusCode != 200) {
				reject(new Error(`Request failed. Status code: ${statusCode}`));
			}
			else if (!/^text\/html/.test(contentType)) {
				reject(new Error(`Expected text/html but got ${contentType}`));
			}
			else {
				let body = "";
				res.setEncoding("utf-8");
				res.on("data", d => body += d);
				res.on("end", () => {
					let matches = [...body.matchAll(/(\/\/i\.imgur\.com\/(?:[A-z]|[0-9])+\.[a-z]*?)"/g)];
					
					matches.forEach((val, index) => {
						matches[index] = `https:${val[1]}`;
					});

					resolve(matches);
				}); 
			}
		});
	});
};
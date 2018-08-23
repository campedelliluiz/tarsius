const	SitemapGenerator = require('sitemap-generator'),
		backstop = require('backstopjs'),
		fs = require('fs'),
		parser = require('xml2json'),
		ora = require('ora'),
		spinner = ora('Crawling...').start();

const generator = SitemapGenerator('http://www.hellmanns.com/uk', {
	stripQuerystring: false
});

generator.on('add', (url) => {
	spinner.text = url;
});

generator.on('done', () => {
	spinner.stopAndPersist({
		symbol: '✔',
		text: 'sitemap generated'
	});

	fs.readFile('sitemap.xml', function(err, data) {
		fs.writeFile('sitemap.json', parser.toJson(data), function(err) {});
	});

	spinner.stopAndPersist({
		symbol: '✔',
		text: 'json created'
	});

	spinner.succeed(['done']);
});

spinner.start();
generator.start();
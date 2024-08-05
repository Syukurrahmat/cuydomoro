import fs from 'fs';

const data = JSON.parse(fs.readFileSync('./ww.json', 'utf8'));

let gg = data.map((e) => ({
	...e,
	name:
		e.name.split('-').slice(0, -1).length == 0
			? e.name.trim()
			: e.name.split('-').slice(0, -1).join('-').trim(),
	price: parseInt(
		e.price
			.replaceAll('\\n', ' ')
			.trim()
			.split(' ')
			.reverse()[0]
			.replaceAll('.', '')
	),
}));


fs.writeFileSync('./data.json', JSON.stringify(gg, null, 4))
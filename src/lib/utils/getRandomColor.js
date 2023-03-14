const backgroundColors = [
	'#37306B',
	'#00235B ',
	'#66347F',
	'#9E4784',
	'#D27685',
	'#2E4F4F',
	'#0E8388',
	'#3F979B',
	'#6096B4',
	'#913175',
	'#1F8A70',
	'#227C70',
	'#4B56D2',
	'#439A97',
	'#00005C',
	'#42855B'
];

export default function () {
	const randomNumber = Math.floor(Math.random() * backgroundColors.length);
	return backgroundColors[randomNumber];
}

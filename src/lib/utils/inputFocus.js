export function labelShine(e) {
	e.currentTarget.previousElementSibling.style.textShadow =
		'3px 2px 15px #ffff';
}
export function stopLabelShine(e) {
	e.currentTarget.previousElementSibling.style.textShadow = 'none';
}

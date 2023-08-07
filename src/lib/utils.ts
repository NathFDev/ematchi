export function shuffle<T>(arr: T[]) {
	let i = arr.length;

	while (i--) {
		const j = Math.floor(Math.random() * i + 1);
		const temp = arr[i];
		arr[i] = arr[j];
		arr[j] = temp;
	}

	return arr;
}

export function get_twemoji_url(emoji: string) {
	const code = [...emoji].map((char) => char.codePointAt(0)!.toString(16)).join("-");
	return `/twemoji/${code}.svg`;
}

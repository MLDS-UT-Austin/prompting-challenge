import { json } from '@sveltejs/kit';

export function POST({ params }: { params: { passcode: string }}) {
	const number = Math.floor(Math.random() * 6) + 1;

	return json(number);
}

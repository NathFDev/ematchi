import { crossfade } from "svelte/transition";
import { cubicOut } from "svelte/easing";

export const [send, recieve] = crossfade({
	duration: 400,
	easing: cubicOut
});

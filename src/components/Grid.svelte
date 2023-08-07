<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import Square from "./Square.svelte";

	export let grid: string[];
	export let found: string[];

	const dispatch = createEventDispatcher();

	let first: number = -1;
	let second: number = -1;
	let reset_timeout: ReturnType<typeof setTimeout>;

	function handleClick(idx: number, emoji: string) {
		clearTimeout(reset_timeout);

		if (first === -1 && second === -1) {
			first = idx;
		} else if (second === -1) {
			second = idx;

			if (grid[first] === grid[second]) {
				dispatch("found", emoji);
			} else {
				reset_timeout = setTimeout(() => {
					first = second = -1;
				}, 1000);
			}
		} else {
			first = idx;
			second = -1;
		}
	}
</script>

<div class="grid">
	{#each grid as emoji, i (i)}
		<Square
			{emoji}
			on:click={() => handleClick(i, emoji)}
			selected={first === i || second === i}
			found={found.includes(emoji)}
			group={grid.indexOf(emoji) === i ? "a" : "b"}
		/>
	{/each}
</div>

<style>
	.grid {
		display: grid;
		grid-template-columns: repeat(var(--size), 1fr);
		grid-template-rows: repeat(var(--size), 1fr);
		gap: 1em;
		width: 85em;
		height: 100%;
		perspective: 100vw;
	}
</style>

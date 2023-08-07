<script lang="ts">
	import Grid from "./Grid.svelte";
	import type { Level } from "$lib/level";
	import { shuffle } from "$lib/utils";
	import Found from "./Found.svelte";
	import Countdown from "./Countdown.svelte";
	import { createEventDispatcher, onMount } from "svelte";

	const dispatch = createEventDispatcher();

	let size: number;
	let grid: string[] = [];
	let found: string[] = [];
	let remaining: number;
	let duration: number;
	let playing: boolean = false;
	let shouldRender: boolean = false;

	export function start(level: Level) {
		size = level.size;
		grid = createGrid(level);
		remaining = duration = level.duration;
		resume();
	}

	export function resume() {
		playing = true;
		shouldRender = true;
		countdown();

		dispatch("play");
	}

	export function quit() {
		playing = false;
		shouldRender = false;
		found = [];
	}

	function createGrid(level: Level) {
		const copy = level.emojis.slice();
		const pairs: string[] = [];

		for (let i = 0; i < level.size ** 2 / 2; i++) {
			const index = Math.floor(Math.random() * copy.length);
			const emoji = copy[index];

			copy.splice(index, 1);
			pairs.push(emoji);
		}

		pairs.push(...pairs);

		return shuffle(pairs);
	}

	function handleFound(e: CustomEvent) {
		found = [...found, e.detail];

		if (found.length === size ** 2 / 2) {
			found = [];
			playing = false;
			shouldRender = false;
			dispatch("win");
		}
	}

	function handlePause() {
		playing = false;
		dispatch("pause");
	}

	function countdown() {
		const start = Date.now();
		let remainingStart = remaining;

		function loop() {
			if (!playing) return;
			requestAnimationFrame(loop);

			remaining = remainingStart - (Date.now() - start);

			if (remaining <= 0) {
				dispatch("lose");
				playing = false;
				shouldRender = false;
			}
		}

		loop();
	}
</script>

<div class="game" style="--size: {size}">
	{#if shouldRender}
		<div class="info">
			{#if playing}
				<Countdown {remaining} {duration} on:click={handlePause} />
			{/if}
		</div>
		<div class="grid-container">
			<Grid {grid} on:found={handleFound} {found} />
		</div>
		<div class="info">
			<Found {found} />
		</div>
	{/if}
</div>

<style>
	.game {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 100%;
		font-size: min(1vmin, 0.3rem);
		background-color: #111111;
	}

	.info {
		width: 85em;
		height: 10em;
		margin-top: 2em;
		margin-bottom: 2em;
	}

	.grid-container {
		width: 85em;
		height: 90em;
	}
</style>

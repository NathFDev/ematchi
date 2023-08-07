<script lang="ts">
	import Game from "../components/Game.svelte";
	import Modal from "../components/Modal.svelte";
	import { levels } from "$lib/level";
	import { confetti } from "@neoconfetti/svelte";
	import "../styles.css";

	let state: "waiting" | "playing" | "paused" | "won" | "lost" = "waiting";
	let game: Game;
</script>

<Game
	bind:this={game}
	on:play={() => (state = "playing")}
	on:lose={() => (state = "lost")}
	on:win={() => (state = "won")}
	on:pause={() => (state = "paused")}
/>

{#if state !== "playing"}
	<Modal>
		<header>
			<h1>e<span>match</span>i</h1>
			<h2>the emoji matching game</h2>
		</header>

		{#if state === "won" || state === "lost"}
			<p>you {state} the game!</p>
		{:else if state === "paused"}
			<p>game paused</p>
		{:else if state === "waiting"}
			<p>Choose a level:</p>
		{/if}

		<div class="buttons">
			{#if state === "paused"}
				<button
					on:click={() => {
						state = "playing";
						game.resume();
					}}>resume</button
				>
				<button
					on:click={() => {
						state = "waiting";
						game.quit();
					}}>quit</button
				>
			{:else}
				{#each levels as level}
					<button on:click={() => game.start(level)}>{level.label}</button>
				{/each}
			{/if}
		</div>
	</Modal>
{/if}

{#if state === "won"}
	<div
		class="confetti"
		use:confetti={{
			stageHeight: innerHeight,
			stageWidth: innerWidth
		}}
	/>
{/if}

<style>
	h1 {
		font-size: 8em;
		margin: inherit;
	}

	h1 span {
		color: #a424ff;
	}

	h1,
	h2,
	p {
		color: white;
	}

	p,
	h2 {
		font-family: Grandstander;
		margin: inherit;
	}

	h2 {
		position: relative;
		font-size: 2.1em;
		transform: translateY(-1em);
	}

	.confetti {
		position: fixed;
		height: 100%;
		width: 100%;
		left: 50%;
		top: 30%;
		pointer-events: none;
	}

	button {
		background-color: #a424ff;
		color: #fff;
		font-size: 1.4em;
		font-family: inherit;
		border: none;
		padding: 1em;
		border-radius: 0.5em;
		margin: .5em;
	}
</style>

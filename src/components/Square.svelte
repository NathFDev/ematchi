<script lang="ts">
	import { get_twemoji_url } from "$lib/utils";
	import { send } from "$lib/transition";

	export let emoji: string;
	export let selected: boolean;
	export let found: boolean;
	export let group: "a" | "b";
</script>

<div class="square" class:flipped={selected || found} class:found>
	<button on:click />

	<div class="background" />

	{#if !found}
		<img alt={emoji} src={get_twemoji_url(emoji)} out:send={{ key: `${emoji}:${group}` }} />
	{/if}
</div>

<style>
	.square {
		display: flex;
		align-items: center;
		justify-content: center;
		transform-style: preserve-3d;
		transition: transform 0.4s;
	}

	.flipped {
		transform: rotateY(180deg);
	}

	button {
		position: absolute;
		width: 100%;
		height: 100%;
		backface-visibility: hidden;
		background-color: #777777;
		border: 0;
		border-radius: 25%;
		font-size: inherit;
	}

	.found .background{
		border-color: #111111;
	}

	.background {
		position: absolute;
		background-color: #111111;
		backface-visibility: hidden;
		transform: rotateY(180deg);
		width: 100%;
		height: 100%;
		border-radius: 25%;
		border: 0.5em solid #a424ff;
	}

	img {
		width: 6em;
		height: 6em;
		pointer-events: none;
		backface-visibility: hidden;
		transform: rotateY(180deg);
	}
</style>

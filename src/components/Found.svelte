<script lang="ts">
	import { recieve } from "$lib/transition";
	import { get_twemoji_url } from "$lib/utils";

	export let found: string[];
</script>

<div class="found">
	{#each found as emoji (emoji)}
		<div class="pair">
			<img src={get_twemoji_url(emoji)} alt={emoji} in:recieve={{ key: `${emoji}:a` }} />
			<img src={get_twemoji_url(emoji)} alt={emoji} in:recieve={{ key: `${emoji}:b` }} />
		</div>
	{/each}
</div>

<style>
	img {
		position: absolute;
		width: 8em;
		height: 8em;
	}

	.pair {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 8em;
		height: 8em;
		background-color: #111111;
		padding: 1em;
		border-radius: 50%;
	}

	.found {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 3em;
		height: 100%;
		filter: drop-shadow(0.2em 0.2em 0.5em rgba(0, 0, 0, 0.2));
	}
</style>

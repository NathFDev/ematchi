<script>
	import { blur } from "svelte/transition";
</script>

<div class="modal-background" transition:blur>
	<div class="modal">
		<slot />
	</div>
</div>

<style>
	.modal-background {
		position: fixed;
    top: 0;
    left: 0;
		width: 100%;
		height: 100%;
		backdrop-filter: blur(10px);
		display: grid;
		place-items: center;
		z-index: 1000;
	}

	.modal {
		text-align: center;
	}
</style>

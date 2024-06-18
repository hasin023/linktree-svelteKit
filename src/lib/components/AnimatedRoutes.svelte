<script lang="ts">
	import { fly } from 'svelte/transition';
	import { quintInOut } from 'svelte/easing';
	import { page } from '$app/stores';
</script>

{#key $page.url}
	<div in:fly={{ x: -100, duration: 400, easing: quintInOut }}>
		<slot />
	</div>
{/key}

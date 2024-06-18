<script lang="ts">
	import { user } from '$lib/firebase';
</script>

{#if $user}
	<slot />
{:else}
	<p class="text-error my-8 flex flex-col gap-4">
		You must be signed in to view this page.
		<a class="btn btn-sm btn-outline btn-secondary" href="/login">Sign in</a>
	</p>
{/if}

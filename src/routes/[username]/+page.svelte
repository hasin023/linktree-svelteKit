<script lang="ts">
	import UserLink from '$lib/components/UserLink.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	const user = data.foundUser;
</script>

<svelte:head>
	<title>@{user?.username} Links</title>
	<meta name="description" content={user?.bio} />
</svelte:head>

<main class="prose text-center mx-auto mt-6">
	{#if user}
		<h1 class="text-2xl text-success">@{user.username}</h1>
		<img
			src={user.photoURL ?? '/user.jpg'}
			alt="photoURL"
			height="128"
			width="128"
			class="mx-auto mt-4 rounded-md"
		/>
		<p class="text-primary my-8">{user.bio ?? 'No bio yet ..'}</p>
		<ul class="list-none">
			{#each user.links as link}
				<UserLink {...link} />
			{/each}
		</ul>

		<a href={`${user.username}/edit`} class="mt-4 btn btn-outline btn-info"> Add a link </a>
	{:else}
		<h1 class="card-title text-warning">{data.error}</h1>
	{/if}
</main>

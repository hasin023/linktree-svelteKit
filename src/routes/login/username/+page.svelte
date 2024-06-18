<script lang="ts">
	import AuthCheck from '$lib/components/AuthCheck.svelte';
	import { db, user } from '$lib/firebase';
	import { doc, getDoc, writeBatch } from 'firebase/firestore';

	let username = '';
	let loading = false;
	let isAvailable = false;

	let debounceTimer: NodeJS.Timeout;

	const checkAvailability = async () => {
		isAvailable = false;
		clearTimeout(debounceTimer);
		loading = true;

		debounceTimer = setTimeout(async () => {
			console.log('Checking availability for ' + username);

			const ref = doc(db, 'usernames', username);
			const exists = await getDoc(ref).then((doc) => doc.exists());

			isAvailable = !exists;
			loading = false;
		}, 500);
	};

	const confirmUsername = () => {};
</script>

<AuthCheck>
	<h2>Username</h2>
	<form class="w-2/5" on:submit|preventDefault={confirmUsername}>
		<input
			type="text"
			placeholder="Enter your username"
			class="input w-full mb-3"
			bind:value={username}
			on:input={checkAvailability}
		/>
		{#if isAvailable}
			<p class="text-success text-sm">
				The username {username} is Available.
			</p>
		{:else}
			<p class="text-error text-sm">
				The username {username} is not Available.
			</p>
		{/if}

		<button class="btn btn-sm btn-outline btn-success mt-7">
			Confirm username @{username}
		</button>
	</form>
</AuthCheck>

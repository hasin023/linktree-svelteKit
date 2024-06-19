<script lang="ts">
	import AuthCheck from '$lib/components/AuthCheck.svelte';
	import { db, user } from '$lib/firebase';
	import { doc, getDoc, writeBatch } from 'firebase/firestore';

	let username = '';
	let loading = false;
	let isAvailable = false;

	let debounceTimer: NodeJS.Timeout;

	const regexString = /^(?=[a-zA-Z0-9._]{3,16}$)(?!.*[_.]{2})[^_.].*[^_.]$/;
	$: isValid = username.length > 2 && username.length < 16 && regexString.test(username);
	$: isTouched = username.length > 0;
	$: isTaken = isValid && !isAvailable && !loading;

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

	const confirmUsername = async () => {
		console.log('Confirming username', username);
		const batch = writeBatch(db);

		batch.set(doc(db, 'usernames', username), { uid: $user?.uid });
		batch.set(doc(db, 'users', $user!.uid), {
			username,
			photoURL: $user?.photoURL ?? null,
			published: true,
			bio: 'Default BIO',
			links: [
				{
					icon: 'custom',
					title: 'Default TITLE',
					url: 'Default URL'
				}
			]
		});

		await batch.commit();
	};
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
			class:input-error={!isValid && isTouched}
			class:input-warning={isTaken}
			class:input-success={isAvailable && isValid && !loading}
		/>

		<div class="mb-4">
			{#if username.length > 0 && loading}
				<p class="text-secondary text-sm">
					Checking availability for @<strong>
						{username}
					</strong>
					...
				</p>
			{/if}

			{#if !isValid && isTouched}
				<p class="text-error text-sm">Must be 3-16 characters long, Alphanumeric only</p>
			{/if}

			{#if isValid && !isAvailable && !loading}
				<p class="text-warning text-sm">@<strong>{username}</strong> not available</p>
			{/if}
		</div>

		{#if isValid && isAvailable && !loading}
			<button class="btn btn-sm btn-outline btn-success">
				Confirm username @{username}
			</button>
		{:else}
			<button class="btn btn-sm btn-outline btn-neutral disabled" disabled>
				Confirm username @{username}
			</button>
		{/if}
	</form>
</AuthCheck>

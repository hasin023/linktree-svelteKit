<script lang="ts">
	import { auth } from '$lib/firebase';
	import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';

	import { user } from '$lib/firebase';

	const singInWithGoogle = async () => {
		const provider = new GoogleAuthProvider();
		const user = await signInWithPopup(auth, provider);

		console.log(user);
	};
</script>

<h2 class="text-2xl mb-4">LinkTree</h2>

{#if $user}
	<h2 class="card-title">Welcome, {$user.displayName}</h2>
	<p class="text-center text-success">You are logged in!</p>
	<button on:click={() => signOut(auth)} class="btn btn-sm btn-outline btn-error">Sign Out</button>
{:else}
	<button on:click={singInWithGoogle} class="btn btn-outline btn-sm btn-accent"
		>Sign in with Google</button
	>
{/if}

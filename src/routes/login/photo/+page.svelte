<script lang="ts">
	import AuthCheck from '$lib/components/AuthCheck.svelte';

	let previewURL: string;
	let uploading = false;

	const previewImage = (event: any) => {
		const file = event.target.files[0];
		previewURL = URL.createObjectURL(file);
	};

	const uploadProfilePicture = async () => {
		uploading = true;

		setTimeout(() => {
			console.log('Uploaded Image to DB');
			uploading = false;
		}, 2000);
	};
</script>

<AuthCheck>
	<h2 class="card-title">Upload a profile photo</h2>
	<form class="max-w-screen-md w-full" on:submit|preventDefault={uploadProfilePicture}>
		<div class="form-control w-full max-w-xs my-5 mx-auto text-center">
			<img
				src={previewURL ?? '/user.jpg'}
				alt="photoURL"
				height="200"
				width="200"
				class="mx-auto mb-4 rounded-md"
			/>
			<label for="photoURL" class="label">
				<span class="label-text"> Pick a file </span>
			</label>
			<input
				on:change={previewImage}
				type="file"
				name="photoURL"
				class="file-input file-input-bordered w-full max-w-xs mb-4"
				accept="image/png, image/jpeg, image/jpg, image/gif, image/webp"
			/>

			<button class="btn btn-sm btn-outline btn-success"> Confirm Image </button>

			{#if uploading}
				<div class="flex flex-col items-center justify-center mt-4">
					<p>uploading ...</p>
					<progress class="progress progress-success w-56 mt-2" />
				</div>
			{/if}
		</div>
	</form>
</AuthCheck>

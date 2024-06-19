<script lang="ts">
	import { icons } from '$lib/data/icons';
	import { writable } from 'svelte/store';

	let showForm = false;

	const formDefaults = {
		icon: 'custom',
		title: '',
		url: 'https://'
	};

	const formData = writable(formDefaults);

	$: urlIsValid = $formData.url.match(/^(ftp|http|https):\/\/[^"]+$/);
	$: titleIsValid = $formData.title.length < 20 && $formData.title.length > 0;
	$: formIsValid = urlIsValid && titleIsValid;

	const addLink = () => {
		console.log('Add new link to user');

		formData.set({
			icon: '',
			title: '',
			url: ''
		});

		showForm = false;
	};
</script>

<form
	on:submit|preventDefault={addLink}
	class="bg-base-200 p-6 w-full mx-auto rounded-xl flex items-center justify-center gap-4"
>
	<select name="icon" class="select select-sm" bind:value={$formData.icon}>
		{#each icons as icon}
			<option value={icon.toLowerCase()}>{icon}</option>
		{/each}
	</select>

	<input
		name="title"
		type="text"
		placeholder="Title"
		class="input input-sm"
		bind:value={$formData.title}
	/>
	<input
		name="url"
		type="text"
		placeholder="URL"
		class="input input-sm"
		bind:value={$formData.url}
	/>

	<button class="btn btn-sm btn-success">Add Link</button>
	<button class="btn btn-sm btn-outline btn-error">Cancel</button>
</form>

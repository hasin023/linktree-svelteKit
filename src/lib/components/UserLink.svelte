<script lang="ts">
	export let icon = 'default';
	export let url = 'foo';
	export let title = 'default title';
</script>

<a
	href={url}
	class="card md:card-side p-3 w-80 bg-gray-900 text-neutral-content mb-2 justify-between items-center rounded-md"
>
	<img src={`/icons/${icon}.png`} alt={icon} width="32" height="32" />
	<span class="font-semibold">{title}</span>
</a>

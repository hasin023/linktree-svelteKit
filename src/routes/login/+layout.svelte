<script lang="ts">
	import { page } from '$app/stores';
	import AnimatedRoutes from '$lib/components/AnimatedRoutes.svelte';
</script>

<nav class="text-center mb-4 md:mb-10">
	<ul class="steps steps-vertical md:steps-horizontal">
		<a href="/login" class="step step-primary">Sign In</a>
		<a
			href="/login/username"
			class:step-primary={$page.route.id?.match(/username|photo/g)}
			class="step"
		>
			Username
		</a>
		<a href="/login/photo" class="step" class:step-primary={$page.route.id?.includes('photo')}>
			Photo</a
		>
	</ul>
</nav>

<AnimatedRoutes>
	<main class="card w-4/6 bg-neutral text-neutral-content mx-auto">
		<div class="card-body items-center text-center">
			<slot />
		</div>
	</main>
</AnimatedRoutes>

<script lang="ts">
	import './layout.css';
	import '@fontsource/jetbrains-mono/400.css';
	import '@fontsource/jetbrains-mono/500.css';
	import '@fontsource/jetbrains-mono/700.css';

	let { children } = $props();
</script>

<svelte:head>
	<title>Azzam's Portfolio</title>
	<meta
		name="description"
		content="A Linux terminal-themed portfolio showcasing projects, skills, and experience."
	/>
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<meta name="theme-color" content="#1e1e2e" />
</svelte:head>

{@render children()}

<script lang="ts">
	import { fly } from 'svelte/transition';

	let { data } = $props();

	let links = $derived([
		{ name: 'GitHub', url: `${data.github}`, icon: 'gh' },
		{ name: 'LinkedIn', url: `${data.linkedin}`, icon: 'in' },
		{ name: 'LeetCode', url: `${data.leetcode}`, icon: 'lc' },
		{ name: 'Email', url: `mailto:${data.email}`, icon: '@' }
	]);
</script>

<div class="space-y-2 max-w-xl" in:fly={{ y: 10, duration: 200 }}>
	<p class="text-ctp-mauve font-bold mb-1">Connect with me:</p>

	<div class="grid gap-1">
		{#each links as link, i}
			<a
				href={link.url}
				target="_blank"
				rel="noopener noreferrer"
				class="flex items-center gap-4 p-3 rounded hover:bg-ctp-surface0/50 transition-colors group"
				in:fly={{ x: -10, duration: 150, delay: i * 50 }}
			>
				<span class="text-ctp-blue font-mono font-bold w-8 text-center group-hover:text-ctp-sky"
					>[{link.icon}]</span
				>
				<span class="text-ctp-text group-hover:text-ctp-subtext1 flex-1">{link.name}</span>
				<span class="text-ctp-overlay0 text-sm opacity-0 group-hover:opacity-100 transition-opacity"
					>➜</span
				>
			</a>
		{/each}
	</div>
</div>

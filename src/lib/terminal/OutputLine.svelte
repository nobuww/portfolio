<script lang="ts">
	import { fly } from 'svelte/transition';
	import type { Snippet } from 'svelte';

	interface Props {
		command?: string;
		delay?: number;
		username?: string;
		hostname?: string;
		path?: string;
		children: Snippet;
	}

	let { command, delay = 0, username = 'nobuw', path = '~/portfolio', children }: Props = $props();
</script>

<div class="mb-2" in:fly={{ y: 10, duration: 200, delay }}>
	{#if command}
		<div class="flex items-center font-mono text-sm mb-1">
			<div
				class="flex items-center bg-ctp-blue text-ctp-crust px-2.5 py-0.5 rounded-l-xl relative z-20 h-5"
			>
				<span class="font-bold text-xs">{username}</span>

				<svg
					class="absolute -right-[10px] top-0 h-5 w-[10px] z-30"
					viewBox="0 0 10 20"
					preserveAspectRatio="none"
				>
					<polygon points="0,0 10,10 0,20" class="fill-ctp-blue" />
				</svg>
			</div>

			<div
				class="flex items-center bg-ctp-surface1 text-ctp-text pl-4 pr-2.5 py-0.5 relative z-10 -ml-[2px] h-5"
			>
				<span class="font-medium text-xs">{path}</span>

				<svg
					class="absolute -right-[10px] top-0 h-5 w-[10px] z-20"
					viewBox="0 0 10 20"
					preserveAspectRatio="none"
				>
					<polygon points="0,0 10,10 0,20" class="fill-ctp-surface1" />
				</svg>
			</div>

			<span class="text-ctp-text ml-4">{command}</span>
		</div>
	{/if}

	<div class="pl-0 text-ctp-text font-mono text-sm leading-relaxed">
		{@render children()}
	</div>
</div>

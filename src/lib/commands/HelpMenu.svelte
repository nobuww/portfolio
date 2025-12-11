<script lang="ts">
	import { fly } from 'svelte/transition';
	import { getAvailableCommands } from '$lib/terminal/commandExecutor';

	const commands = getAvailableCommands();
</script>

<div class="space-y-1">
	<p class="text-ctp-mauve font-bold mb-3">Available Commands:</p>

	<div class="grid gap-1">
		{#each commands as cmd, i}
			<div class="flex gap-4 text-sm" in:fly={{ x: -10, duration: 150, delay: i * 30 }}>
				<span class="text-ctp-green font-medium min-w-[100px]">{cmd.name}</span>
				<span class="text-ctp-subtext0">{cmd.description}</span>
				{#if cmd.usage}
					<span class="text-ctp-overlay0 text-xs">({cmd.usage})</span>
				{/if}
			</div>
		{/each}
	</div>

	<p class="text-ctp-overlay1 text-xs mt-4">
		Tip: Use ↑/↓ arrows to navigate command history, Ctrl+C to cancel, Ctrl+L to clear
	</p>
</div>

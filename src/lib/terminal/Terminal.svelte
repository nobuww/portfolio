<script lang="ts">
	import { onMount, tick } from 'svelte';
	import { fly } from 'svelte/transition';
	import Prompt from './Prompt.svelte';
	import OutputLine from './OutputLine.svelte';
	import { executeCommand, type CommandResult } from './commandExecutor';

	import HelpMenu from '$lib/commands/HelpMenu.svelte';
	import About from '$lib/commands/About.svelte';
	import ProjectsGrid from '$lib/commands/ProjectsGrid.svelte';
	import SkillsBar from '$lib/commands/SkillsBar.svelte';
	import Links from '$lib/commands/Links.svelte';

	interface Props {
		isActive?: boolean;
	}

	let { isActive = true }: Props = $props();

	interface OutputEntry {
		id: string;
		command?: string;
		result: CommandResult;
	}

	let outputs: OutputEntry[] = $state([]);
	let promptComponent: Prompt | null = $state(null);
	let terminalBody: HTMLDivElement | null = $state(null);
	let isShuttingDown = $state(false);

	const componentMap: Record<string, any> = {
		HelpMenu,
		About,
		ProjectsGrid,
		SkillsBar,
		Links
	};

	onMount(() => {
		const result = executeCommand('about');
		const results = Array.isArray(result) ? result : [result];

		outputs = results.map((res) => ({
			id: generateId(),
			command: 'about',
			result: res
		}));

		promptComponent?.focus();
	});

	function generateId(): string {
		return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
	}

	async function handleCommand(command: string) {
		const result = executeCommand(command);
		const results = Array.isArray(result) ? result : [result];

		for (const res of results) {
			if (res.type === 'clear') {
				outputs = [];
			} else if (res.componentName === 'ShutdownSequence') {
				isShuttingDown = true;
				outputs = [...outputs, { id: generateId(), command, result: res }];
			} else {
				outputs = [...outputs, { id: generateId(), command, result: res }];
			}
		}

		await tick();
		if (terminalBody) {
			terminalBody.scrollTop = terminalBody.scrollHeight;
		}

		await tick();
		promptComponent?.focus();
	}

	function handleCancel() {}

	function handleTerminalClick() {
		const selection = window.getSelection();
		if (selection && selection.toString()) {
			return;
		}
		promptComponent?.focus();
	}
</script>

<div
	class="max-w-[99.5%] w-full max-w-7xl mx-auto bg-ctp-base/70 backdrop-blur-[12px] backdrop-brightness-110 rounded-md overflow-hidden transition-shadow duration-300 {isActive
		? 'terminal-glow-active'
		: 'terminal-glow-inactive'}"
	in:fly={{ y: 20, duration: 400 }}
>
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		bind:this={terminalBody}
		onclick={handleTerminalClick}
		class="px-3 md:px-4 pt-2 pb-4 h-[calc(100dvh-5rem-env(safe-area-inset-bottom))] md:h-[85vh] md:min-h-[600px] md:max-h-[1000px] overflow-y-auto"
	>
		{#each outputs as output, i (output.id)}
			<div class={i === 0 ? 'mt-2' : ''}>
				<OutputLine command={output.command}>
					{#snippet children()}
						{#if output.result.type === 'text'}
							<pre class="whitespace-pre-wrap text-ctp-text">{output.result.content}</pre>
						{:else if output.result.type === 'ascii'}
							<pre class="text-ctp-blue whitespace-pre font-mono text-xs sm:text-sm">{output.result
									.content}</pre>
						{:else if output.result.type === 'error'}
							<span class="text-ctp-red">{output.result.content}</span>
						{:else if output.result.type === 'component' && output.result.componentName}
							{@const Component = componentMap[output.result.componentName]}
							{#if Component}
								{#if output.result.componentName === 'ShutdownSequence'}
									<Component />
								{:else}
									<Component {...output.result.props} />
								{/if}
							{/if}
						{/if}
					{/snippet}
				</OutputLine>
			</div>
		{/each}

		{#if !isShuttingDown}
			<div class="mt-2">
				<Prompt bind:this={promptComponent} onCommand={handleCommand} onCancel={handleCancel} />
			</div>
		{/if}
	</div>
</div>

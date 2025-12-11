<script lang="ts">
	import { tick } from 'svelte';

	interface Props {
		username?: string;
		hostname?: string;
		path?: string;
		onCommand?: (command: string) => void;
		onCancel?: () => void;
		disabled?: boolean;
	}

	let {
		username = 'nobuw',
		path = '~/portfolio',
		onCommand,
		onCancel,
		disabled = false
	}: Props = $props();

	let inputValue = $state('');
	let inputElement: HTMLInputElement | null = $state(null);
	let historyIndex = $state(-1);
	let commandHistory: string[] = $state([]);

	$effect(() => {
		if (typeof window !== 'undefined') {
			const saved = localStorage.getItem('terminal-history');
			if (saved) {
				commandHistory = JSON.parse(saved);
			}
		}
	});

	function handleKeydown(event: KeyboardEvent) {
		if (disabled) return;

		if (event.key === 'Enter' && inputValue.trim()) {
			const command = inputValue.trim();

			commandHistory = [...commandHistory, command];
			if (typeof window !== 'undefined') {
				localStorage.setItem('terminal-history', JSON.stringify(commandHistory.slice(-100)));
			}

			onCommand?.(command);
			inputValue = '';
			historyIndex = -1;
		} else if (event.key === 'ArrowUp') {
			event.preventDefault();
			if (commandHistory.length > 0) {
				if (historyIndex === -1) {
					historyIndex = commandHistory.length - 1;
				} else if (historyIndex > 0) {
					historyIndex--;
				}
				inputValue = commandHistory[historyIndex] || '';
			}
		} else if (event.key === 'ArrowDown') {
			event.preventDefault();
			if (historyIndex !== -1) {
				if (historyIndex < commandHistory.length - 1) {
					historyIndex++;
					inputValue = commandHistory[historyIndex] || '';
				} else {
					historyIndex = -1;
					inputValue = '';
				}
			}
		} else if (event.key === 'c' && event.ctrlKey) {
			const selection = window.getSelection();
			const hasSelection = selection && selection.toString();
			const hasInputSelection =
				inputElement && inputElement.selectionStart !== inputElement.selectionEnd;

			if (hasSelection || hasInputSelection) {
				return;
			}

			event.preventDefault();
			inputValue = '';
			historyIndex = -1;
			onCancel?.();
		} else if (event.key === 'l' && event.ctrlKey) {
			event.preventDefault();

			onCommand?.('clear');
			inputValue = '';
		}
	}

	export function focus() {
		tick().then(() => inputElement?.focus());
	}
</script>

<div class="flex items-center font-mono text-sm">
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

	<div class="flex-1 relative ml-4">
		<input
			bind:this={inputElement}
			bind:value={inputValue}
			onkeydown={handleKeydown}
			{disabled}
			type="text"
			class="w-full bg-transparent outline-none text-ctp-text caret-transparent font-mono text-sm"
			autocomplete="off"
			autocorrect="off"
			autocapitalize="off"
			spellcheck="false"
		/>

		<span
			class="absolute top-0 pointer-events-none text-ctp-text"
			style="left: {inputValue.length}ch;"
		>
			<span class="cursor-block"></span>
		</span>
	</div>
</div>

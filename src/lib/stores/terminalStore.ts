import { writable } from 'svelte/store';

export interface OutputItem {
	id: string;
	type: 'text' | 'component' | 'error' | 'ascii';
	content: string;
	command?: string;
	componentName?: string;
	props?: Record<string, unknown>;
}

function createHistoryStore() {
	const stored = typeof window !== 'undefined' ? localStorage.getItem('terminal-history') : null;
	const initial: string[] = stored ? JSON.parse(stored) : [];

	const { subscribe, set, update } = writable<string[]>(initial);

	return {
		subscribe,
		add: (command: string) => {
			update((history) => {
				const newHistory = [...history, command].slice(-100);
				if (typeof window !== 'undefined') {
					localStorage.setItem('terminal-history', JSON.stringify(newHistory));
				}
				return newHistory;
			});
		},
		clear: () => {
			set([]);
			if (typeof window !== 'undefined') {
				localStorage.removeItem('terminal-history');
			}
		}
	};
}

export const commandHistory = createHistoryStore();

export const currentPath = writable('~/portfolio');

export const outputBuffer = writable<OutputItem[]>([]);

export const isBusy = writable(false);

export function generateId(): string {
	return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function addOutput(item: Omit<OutputItem, 'id'>) {
	outputBuffer.update((buffer) => [...buffer, { ...item, id: generateId() }]);
}

export function clearOutput() {
	outputBuffer.set([]);
}

<script lang="ts">
	import { fly } from 'svelte/transition';

	interface Project {
		id: number;
		name: string;
		description: string;
		tech: string[];
		github?: string;
		demo?: string;
	}

	interface Props {
		projects?: Project[];
	}

	let { projects = [] }: Props = $props();
</script>

<div class="space-y-4">
	<p class="text-ctp-mauve font-bold">~/projects/</p>

	<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
		{#each projects as project, i (project.id)}
			<div
				class="border border-ctp-surface1 rounded-lg overflow-hidden bg-ctp-mantle/50 hover:border-ctp-blue transition-colors duration-200"
				in:fly={{ y: 20, duration: 300, delay: i * 100 }}
			>
				<div class="flex items-center gap-2 px-3 py-2 bg-ctp-surface0 border-b border-ctp-surface1">
					<span class="w-2.5 h-2.5 rounded-full bg-ctp-red"></span>
					<span class="w-2.5 h-2.5 rounded-full bg-ctp-yellow"></span>
					<span class="w-2.5 h-2.5 rounded-full bg-ctp-green"></span>
					<span class="text-xs text-ctp-subtext0 ml-2 truncate">{project.name}</span>
				</div>

				<div class="p-3 space-y-3">
					<p class="text-sm text-ctp-text leading-relaxed">
						{project.description}
					</p>

					<div class="flex flex-wrap gap-1.5">
						{#each project.tech as tech}
							<span class="px-2 py-0.5 text-xs bg-ctp-surface1 text-ctp-subtext1 rounded">
								{tech}
							</span>
						{/each}
					</div>

					{#if project.github || project.demo}
						<div class="flex gap-3 pt-2 border-t border-ctp-surface1">
							{#if project.github}
								<a
									href={project.github}
									target="_blank"
									rel="noopener noreferrer"
									class="text-xs text-ctp-blue hover:text-ctp-sapphire hover:underline transition-colors"
								>
									[GitHub]
								</a>
							{/if}
							{#if project.demo}
								<a
									href={project.demo}
									target="_blank"
									rel="noopener noreferrer"
									class="text-xs text-ctp-green hover:text-ctp-teal hover:underline transition-colors"
								>
									[Demo]
								</a>
							{/if}
						</div>
					{/if}
				</div>
			</div>
		{/each}
	</div>

	<p class="text-ctp-overlay0 text-xs mt-2">
		{projects.length} project(s) found
	</p>
</div>

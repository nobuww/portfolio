<script lang="ts">
	import { fly } from 'svelte/transition';

	interface Skill {
		name: string;
	}

	interface SkillsData {
		core?: Skill[];
		webDev?: Skill[];
		databaseCloud?: Skill[];
		infrastructure?: Skill[];
	}

	interface Props {
		skills?: SkillsData;
	}

	let props: Props = $props();

	let getSkills = $derived(props.skills ?? {});

	let categories = $derived([
		{ title: 'Core Languages', items: getSkills.core || [], color: 'text-ctp-red' },
		{
			title: 'Web Development',
			items: getSkills.webDev || [],
			color: 'text-ctp-blue'
		},
		{
			title: 'Database & Cloud',
			items: getSkills.databaseCloud || [],
			color: 'text-ctp-yellow'
		},
		{
			title: 'Infrastructure',
			items: getSkills.infrastructure || [],
			color: 'text-ctp-mauve'
		}
	]);
</script>

<div class="space-only-6">
	{#each categories as category, catIndex}
		{#if category.items.length > 0}
			<div in:fly={{ y: 10, duration: 200, delay: catIndex * 100 }} class="mb-6">
				<p class="{category.color} font-bold mb-3 text-lg">{category.title}</p>

				<div class="flex flex-wrap gap-3 pl-1">
					{#each category.items as skill, i}
						<div
							class="px-3 py-1.5 rounded-full bg-ctp-surface0/50 hover:bg-ctp-surface0 transition-colors border border-ctp-surface1/30"
							in:fly={{ x: -10, duration: 150, delay: catIndex * 100 + i * 40 }}
						>
							<span class="text-ctp-text text-sm font-medium">{skill.name}</span>
						</div>
					{/each}
				</div>
			</div>
		{/if}
	{/each}

	<p class="text-ctp-overlay0 text-xs mt-4 italic">
		Skills are self-assessed based on project experience.
	</p>
</div>

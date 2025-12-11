<script lang="ts">
	import { fly } from 'svelte/transition';
	import { LOGO } from '$lib/utils/asciiArt';

	interface PortfolioData {
		name: string;
		title: string;
		location: string;
		major: string;
	}

	interface Props {
		data?: PortfolioData;
	}

	const defaultData: PortfolioData = {
		name: 'Muhammad Azzam',
		title: 'Software Engineer',
		location: 'Indonesia',
		major: 'Computer Science'
	};

	let props: Props = $props();

	let getData = $derived(props.data ?? defaultData);

	let infoLines = $derived([
		{ label: 'Major', value: getData.major, color: 'text-ctp-blue' },
		{ label: 'Location', value: getData.location, color: 'text-ctp-yellow' }
	]);

	const colors = [
		'bg-ctp-red',
		'bg-ctp-peach',
		'bg-ctp-yellow',
		'bg-ctp-green',
		'bg-ctp-teal',
		'bg-ctp-blue',
		'bg-ctp-mauve',
		'bg-ctp-pink'
	];
</script>

<div class="flex flex-col gap-6">
	<div class="flex flex-col lg:flex-row gap-4 lg:gap-8">
		<div in:fly={{ x: -20, duration: 300 }}>
			<pre class="text-ctp-blue text-xs leading-none">{LOGO}</pre>
		</div>

		<div class="flex flex-col gap-4 min-w-0 justify-center">
			<div class="space-y-2 max-w-xl" in:fly={{ x: 20, duration: 300, delay: 100 }}>
				<p class="text-ctp-text leading-relaxed">
					My name is <span class="text-ctp-blue font-bold">{getData.name}</span>, a student based in
					<span class="text-ctp-yellow">{getData.location}</span>. I'm passionate about
					<span class="text-ctp-peach">software engineering</span>. I specialize in building modern,
					scalable applications with a strong focus on accessibility and user experience.
				</p>
				<p class="text-ctp-subtext0 leading-relaxed">
					I am also deeply interested in <span class="text-ctp-green">data analysis</span>,
					specifically in exploring how raw data can be transformed into meaningful insights.
				</p>
			</div>

			<div class="flex flex-col gap-1 mt-2">
				{#each infoLines as line, i}
					<div class="flex gap-2 text-sm" in:fly={{ x: 20, duration: 200, delay: 200 + i * 50 }}>
						<span class="{line.color} font-bold min-w-[90px]">{line.label}</span>
						<span class="text-ctp-overlay1">~</span>
						<span class="text-ctp-text truncate">{line.value}</span>
					</div>
				{/each}
			</div>

			<div
				class="flex mt-2 rounded-md overflow-hidden"
				in:fly={{ x: 20, duration: 200, delay: 450 }}
			>
				{#each colors as color, i}
					<div class="{color} w-8 h-5" style="animation-delay: {i * 50}ms;"></div>
				{/each}
			</div>
		</div>
	</div>

	<p class="text-ctp-overlay1 text-sm" in:fly={{ y: 20, duration: 200, delay: 500 }}>
		Type <span class="text-ctp-mauve font-bold">'skills'</span> to see my technical skills, or
		<span class="text-ctp-mauve font-bold">'projects'</span> to view my work.
	</p>
</div>

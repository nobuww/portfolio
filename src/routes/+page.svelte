<script lang="ts">
	import Terminal from '$lib/terminal/Terminal.svelte';
	import { onMount } from 'svelte';

	let isTerminalActive = $state(true);
	let time = $state(new Date());

	onMount(() => {
		const interval = setInterval(() => {
			time = new Date();
		}, 1000);
		return () => clearInterval(interval);
	});
</script>

<svelte:head>
	<title>Azzam's Portfolio</title>
</svelte:head>

<div
	class="h-[100dvh] relative overflow-hidden bg-cover bg-center bg-no-repeat transition-all duration-700"
	style="background-image: url('/background.jpeg');"
	onfocus={() => (isTerminalActive = true)}
>
	<div class="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>

	<div
		class="fixed top-2 left-2 right-2 md:top-4 md:left-4 md:right-4 z-50 flex justify-between pointer-events-none text-sm"
	>
		<div
			class="pointer-events-auto flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-ctp-crust/60 backdrop-blur-md rounded-full border border-white/5 shadow-lg shadow-black/20"
		>
			<div class="flex gap-1.5 align-middle">
				<span
					class="w-2h-2 md:w-2.5 md:h-2.5 rounded-full bg-ctp-blue transition-all duration-300 w-2 md:w-6 h-2 md:h-2.5"
				></span>
				<span class="hidden md:block w-2.5 h-2.5 rounded-full bg-ctp-surface1"></span>
				<span class="hidden md:block w-2.5 h-2.5 rounded-full bg-ctp-surface1"></span>
				<span class="hidden md:block w-2.5 h-2.5 rounded-full bg-ctp-surface1"></span>
			</div>
		</div>

		<div
			class="pointer-events-auto absolute left-1/2 -translate-x-1/2 flex items-center gap-2 md:gap-3 px-3 py-1.5 md:px-4 md:py-2 bg-ctp-mantle/70 backdrop-blur-md rounded-full border border-white/5 shadow-lg shadow-black/20 max-w-[50%] md:max-w-none"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				fill="currentColor"
				class="text-ctp-white w-3 h-3 md:w-3.5 md:h-3.5"
			>
				<path
					fill-rule="evenodd"
					d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm14.024-.983a1.125 1.125 0 010 1.966l-5.603 3.113A1.125 1.125 0 019 15.113V8.887c0-.857.921-1.4 1.671-.983l5.603 3.113z"
					clip-rule="evenodd"
				/>
			</svg>
			<div class="w-20 sm:w-32 md:w-32 lg:w-48 overflow-hidden mask-linear">
				<div
					class="whitespace-nowrap font-bold animate-marquee text-ctp-text text-[10px] md:text-xs"
				>
					ヨルシカ - アルジャーノン
				</div>
			</div>
			<div class="hidden sm:flex gap-2 text-ctp-overlay1 text-xs">
				<button class="hover:text-ctp-text transition-colors">⏮</button>
				<button class="hover:text-ctp-text transition-colors">⏸</button>
				<button class="hover:text-ctp-text transition-colors">⏭</button>
			</div>
		</div>

		<div
			class="pointer-events-auto flex items-center gap-4 px-3 py-1.5 md:px-4 md:py-2 bg-ctp-crust/60 backdrop-blur-md rounded-full border border-white/5 shadow-lg shadow-black/20"
		>
			<div class="flex items-center gap-2 text-xs font-mono">
				<span class="text-ctp-blue font-bold">
					{time.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' })}
				</span>
			</div>
		</div>
	</div>

	<main
		class="relative z-10 pt-14 md:pt-14 px-2 md:px-4 h-[100dvh] pb-[env(safe-area-inset-bottom)] flex items-start md:items-center justify-center overflow-hidden"
	>
		<Terminal isActive={isTerminalActive} />
	</main>
</div>

<style>
	.animate-marquee {
		display: inline-block;
		animation: marquee 15s linear infinite;
	}

	@keyframes marquee {
		0% {
			transform: translateX(100%);
		}
		100% {
			transform: translateX(-100%);
		}
	}

	.mask-linear {
		mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
	}
</style>

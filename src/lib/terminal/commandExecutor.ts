export interface CommandResult {
	type: 'text' | 'component' | 'error' | 'ascii' | 'clear' | 'action';
	content?: string;
	componentName?: string;
	props?: Record<string, unknown>;
	action?: () => void;
}

interface CommandHandler {
	description: string;
	usage?: string;
	handler: (args: string[]) => CommandResult | CommandResult[];
}

const PORTFOLIO_DATA = {
	name: 'Muhammad Azzam',
	title: 'Software Engineer',
	location: 'Indonesia',
	email: 'ajamm999@gmail.com',
	github: 'https://github.com/nobuww',
	leetcode: 'https://leetcode.com/u/nobuww/',
	linkedin: 'https://linkedin.com/in/muhammadazzama/',
	major: 'Computer Science'
};

const SKILLS_DATA = {
	core: [
		{ name: 'TypeScript' },
		{ name: 'JavaScript' },
		{ name: 'Go' },
		{ name: 'Python' },
		{ name: 'SQL' },
		{ name: 'PHP' }
	],
	webDev: [
		{ name: 'Svelte/SvelteKit' },
		{ name: 'React/Next.js' },
		{ name: 'NestJS' },
		{ name: 'Tailwind CSS' },
		{ name: 'htmx' },
		{ name: 'Laravel' },
		{ name: 'FastAPI' }
	],
	databaseCloud: [
		{ name: 'PostgreSQL' },
		{ name: 'MySQL' },
		{ name: 'MongoDB' },
		{ name: 'Redis' },
		{ name: 'Drizzle' },
		{ name: 'Prisma' },
		{ name: 'sqlc' }
	],
	infrastructure: [
		{ name: 'Docker' },
		{ name: 'Caddy' },
		{ name: 'Traefik' },
		{ name: 'GitHub Actions' }
	]
};

interface Project {
	id: number;
	name: string;
	description: string;
	tech: string[];
	github?: string;
	demo?: string;
}

const PROJECTS_DATA: Project[] = [
	{
		id: 1,
		name: 'Simpel KTP',
		description: 'A web application for citizen to apply for creating/extending their KTP',
		tech: ['Go', 'templ', 'htmx', 'Tailwind CSS', 'PostgreSQL', 'Docker'],
		github: 'https://github.com/nobuww/simpel-ktp',
		demo: 'https://simpel-ktp.nobuw.me'
	},
	{
		id: 2,
		name: 'Websocket Chat-app',
		description: 'A websocket chat application built using Node.js ws library',
		tech: ['TypeScript', 'ws', 'Tailwind CSS', 'React'],
		github: 'https://github.com/nobuww/websocket-chat-app'
	}
];

const commands: Record<string, CommandHandler> = {
	help: {
		description: 'Show available commands',
		handler: () => ({
			type: 'component',
			componentName: 'HelpMenu'
		})
	},

	about: {
		description: 'About me',
		handler: () => ({
			type: 'component',
			componentName: 'About',
			props: { data: PORTFOLIO_DATA }
		})
	},

	projects: {
		description: 'Show my projects',
		handler: () => ({
			type: 'component',
			componentName: 'ProjectsGrid',
			props: { projects: PROJECTS_DATA }
		})
	},

	skills: {
		description: 'Display my skills',
		handler: () => ({
			type: 'component',
			componentName: 'SkillsBar',
			props: { skills: SKILLS_DATA }
		})
	},

	links: {
		description: 'Show social links',
		handler: () => ({
			type: 'component',
			componentName: 'Links',
			props: { data: PORTFOLIO_DATA }
		})
	},

	clear: {
		description: 'Clear the terminal',
		handler: () => ({
			type: 'clear'
		})
	},

	sudo: {
		description: '🥪',
		handler: (args) => {
			if (args.join(' ') === 'make me a sandwich') {
				return { type: 'text', content: 'Okay.' };
			}
			if (args[0] === 'rm' && args.includes('-rf') && args.includes('/')) {
				return { type: 'text', content: '🔥 Nice try. System protected by Hyprland magic. 🔥' };
			}
			return { type: 'error', content: `sudo: ${args[0]}: command not found` };
		}
	},

	hyprctl: {
		description: 'Hyprland control',
		handler: (args) => {
			if (args.join(' ') === 'dispatch exit') {
				return { type: 'component', componentName: 'ShutdownSequence' };
			}
			return { type: 'text', content: 'hyprctl: Invalid dispatcher' };
		}
	}
};

function playBell() {
	if (typeof window !== 'undefined') {
		try {
			const audio = new Audio('/bell.wav');
			audio.volume = 0.3;
			audio.play().catch(() => {});
		} catch {}
	}
}

export function executeCommand(input: string): CommandResult | CommandResult[] {
	const trimmed = input.trim();
	if (!trimmed) {
		return { type: 'text', content: '' };
	}

	const parts = trimmed.split(/\s+/);
	const commandName = parts[0].toLowerCase();
	const args = parts.slice(1);

	const command = commands[commandName];
	if (command) {
		return command.handler(args);
	}

	playBell();
	return {
		type: 'error',
		content: `bash: ${commandName}: command not found. Type 'help' for available commands.`
	};
}

export function getAvailableCommands() {
	return Object.entries(commands)
		.filter(([name]) => !['sudo', 'hyprctl'].includes(name))
		.map(([name, cmd]) => ({
			name,
			description: cmd.description,
			usage: cmd.usage
		}));
}

export { PORTFOLIO_DATA, SKILLS_DATA, PROJECTS_DATA };

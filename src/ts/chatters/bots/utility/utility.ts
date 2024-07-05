import './utility.css';

import { renderLocalMessages } from '../../../messages/messages';
import { profilePicsPath, sendMessage } from '../../chatters';
import { createBot, mapToHTMLString, sendInvalidParamsMessage, TBot, TBotInfo, TCommand, TParam } from '../bots';
import { cheapSharkCommands } from '../cheapShark/cheapShark';
import { colormindCommands } from '../colormind/colormind';
import { dogPicsCommands } from '../dogPics/dogPics';
import { rpsCommands } from '../rps/rps';

/** Utility bot ID. */
export const UTILITY_BOT_ID: number = 1;
/** Utility bot singleton. */
let instance: TBot | undefined = undefined;

/**
 * Creates the utility bot if it doesn't already exist, then returns it.
 * @returns The utility bot.
 */
export function Utility(): TBot {
	if (instance) return instance;

	const utilityBotInfo: TBotInfo = {
		id: 1,
		profilePicture: {
			path: `${profilePicsPath}/utility.png`,
			backgroundColor: 'var(--primary)',
		},
		username: 'Utility',
		description: 'Type "help" to get a list of commands',
		apiBaseUrl: '',
		introduction: 'Hey, I am a small utility bot that does not use any API. I am only here for testing purposes :)',
	};

	const commands: TCommand[] = [
		{
			body: 'help',
			bot: utilityBotInfo,
			description: 'Shows a list of all available commands.',
			execute: sendAllCommands,
		},
		{
			body: 'commandinfo',
			bot: utilityBotInfo,
			description: 'Shows more informations about the command passed as parameter.',
			params: [{ name: 'command' }],
			execute: commandInfo,
			throwInvalidParamsError: nbParams => sendInvalidParamsMessage(utilityBotInfo, nbParams),
		},
		{
			body: 'hello',
			bot: utilityBotInfo,
			description: 'Let the bots introduce themselves to you!',
			execute: () => sendMessage(utilityBotInfo, utilityBotInfo.introduction!),
		},
		{
			body: 'clearconv',
			bot: utilityBotInfo,
			description: 'Clears the conversation.',
			execute: clearConv,
		},
	];

	const utilityCommands = commands;
	const utilityBot: TBot = createBot(utilityBotInfo, commands);
	instance = utilityBot;

	// Getting all of the other bots' commands,
	// while ignoring the default `hello` command
	const allCommands: TCommand[] = [
		...colormindCommands.filter(command => command.body !== 'hello'),
		...dogPicsCommands.filter(command => command.body !== 'hello'),
		...cheapSharkCommands.filter(command => command.body !== 'hello'),
		...rpsCommands.filter(command => command.body !== 'hello'),
		...utilityCommands,
	];

	function sendAllCommands() {
		sendMessage(
			utilityBotInfo,
			`<div class="column help-message">
				<span>
					Here is a list of all the available commands:
				</span>

				<div class="column help-message-section">
					${mapToHTMLString<TCommand>(allCommands, command => `
						<span><u>${command.bot.username}:</u> ${command.body}${command.params ? ` <b>(+${command.params.length} param${command.params.length > 1 ? 's' : ''})</b>` : ''}</span>
					`)}
				</div>

				<div class="column command-definition">
					<span>
						Some functions have <b>parameters</b>, here is an example of the syntax to use:
					</span>

					<span class="command-example">
						commandinfo ?hello
					</span>
				</div>
			</div>`,
		);
	}

	function commandInfo(command?: string[]) {
		if (!command || command[0] === '') {
			sendMessage(
				utilityBotInfo,
				'No parameter provided.',
				true,
			);

			return;
		}

		const fullCommand = allCommands.find(c => c.body.includes(command[0]));

		if (!fullCommand) {
			sendMessage(
				utilityBotInfo,
				'This command does not exist.',
				true,
			);

			return;
		}

		sendMessage(
			utilityBotInfo,
			`<div class="column command-definition-message">
				<div class="column">
					<h3>
						${fullCommand.bot.username} - ${fullCommand.body}
					</h3>
				</div>

				<div class="column command-definition">
					<span>${fullCommand.description}</span>
					<span class="command-example">Example: ${fullCommand.body}${mapToHTMLString<TParam>(fullCommand.params ?? [], param => ` ?${param.name}`)}</span>
				</div>
			</div>`,
		);
	}

	function clearConv() {
		localStorage.removeItem('conv');
		renderLocalMessages();
	}

	return utilityBot;
}

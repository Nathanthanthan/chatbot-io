import { profilePicsPath, sendMessage } from '../../chatters';
import { createBot, TBot, TBotInfo, TCommand } from '../bots';

let instance: TBot | undefined = undefined;
export var rpsCommands: TCommand[] = [];

enum Choices {
	ROCK = 'ROCK',
	PAPER = 'PAPER',
	SCISSORS = 'SCISSORS',
}

export function RPS(): TBot {
	if (instance) return instance;

	const rpsBotInfo: TBotInfo = {
		id: 5,
		profilePicture: { path: `${profilePicsPath}/ChatGPT_real_not_fake.png` },
		username: 'Rock Paper Scissors',
		description: 'Plays rock paper scissors',
		apiBaseUrl: '',
		introduction: 'Yo! I\'m a bot with no API, and I play rock paper scissors!',
	};

	const commands: TCommand[] = [
		{
			body: 'rps',
			bot: rpsBotInfo,
			description: 'Plays a game of rock paper scissors.',
			params: [{ name: 'choice' }],
			execute: rps,
		},
	];

	rpsCommands = commands;
	const rpsBot: TBot = createBot(rpsBotInfo, commands);
	instance = rpsBot;

	function rps(choice?: string[]) {
		if (!choice || choice[0] === '' || !Object.values(Choices).includes(choice[0].toUpperCase() as Choices)) {
			sendMessage(
				rpsBotInfo,
				'...you\'re not trying to play the well I hope?',
				true,
			);

			return;
		}

		const upperCaseChoice = choice[0].toUpperCase();

		switch (upperCaseChoice) {
			case Choices.ROCK:
				sendMessage(
					rpsBotInfo,
					`<div class="column">
						<span>
							You chose ${upperCaseChoice}, I chose ${Choices.ROCK}...
						</span>

						<b>It's a tie!<b/>
					<div>`,
				);
				break;

			case Choices.PAPER:
				sendMessage(
					rpsBotInfo,
					`<div class="column">
						<span>
							You chose ${upperCaseChoice}, I chose ${Choices.SCISSORS}...
						</span>

						<b>I win!<b/>
					<div>`,
				);
				break;

			case Choices.SCISSORS:
				sendMessage(
					rpsBotInfo,
					`<div class="column">
						<span>
							You chose ${upperCaseChoice}, I chose ${Choices.ROCK}...
						</span>

						<b>I win!<b/>
					<div>`,
				);
				break;

			default:
				sendMessage(
					rpsBotInfo,
					`THERE IS NO FOURTH COICE, THE WELL ISN'T REAL, NO ONE CAN EVEN AGREE ON WHAT IT WINS AND LOSES AGAINST!!! STOP THAT!!!`,
					true,
				);
				break;
		}
	}

	return rpsBot;
}

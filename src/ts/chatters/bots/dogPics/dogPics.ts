import './dogPics.css';

import { sendMessage } from '../../chatters';
import { createBot, mapToHTMLString, queryApi, TBot, TBotInfo, TCommand } from '../bots';

let instance: TBot | undefined = undefined;
export var dogPicsCommands: TCommand[] = [];

export function DogPics(): TBot {
	if (instance) return instance;

	const dogPicsBotInfo: TBotInfo = {
		id: 3,
		profilePicture: {
			path: 'https://dog.ceo/img/dog-api-logo.svg',
			backgroundColor: '#F0F0F0',
		},
		username: 'Dog pics',
		description: 'Sends cute dog pictures :)',
		apiBaseUrl: 'https://dog.ceo/api/',
		introduction: 'Hi, it is a pleasure to meet you. I am a bot based on the <a href="https://dog.ceo/dog-api/" target="_blank" rel="noopener noreferrer">Dog API</a>, which I can use to provide a wide variety of dog pictures.',
	};

	const commands: TCommand[] = [
		{
			body: 'randomdog',
			bot: dogPicsBotInfo,
			description: 'Shows a picture of a random (and delightful) dog.',
			execute: randomDog,
		},
		{
			body: 'allbreeds',
			bot: dogPicsBotInfo,
			description: 'Shows an extensive list of dog breeds. Splendid.',
			execute: allBreeds,
		},
	];

	dogPicsCommands = commands;
	const dogPicsBot: TBot = createBot(dogPicsBotInfo, commands);
	instance = dogPicsBot;

	function randomDog() {
		queryApi<{ message: string }>({
			method: 'GET',
			url: `${dogPicsBotInfo.apiBaseUrl}breeds/image/random`,
			onResponseCallback: response => sendDog('Ah, yes, what a wonderful specimen... Delightful indeed.', response.message),
		});
	}

	function allBreeds() {
		queryApi<{ message: Object }>({
			method: 'GET',
			url: `${dogPicsBotInfo.apiBaseUrl}breeds/list/all`,
			onResponseCallback: response => sendMessage(
				dogPicsBotInfo,
				`<div class="column dog-message">
					<h3>OH STARS THAT IS A LOT OF DOGS</h3>

					<div class="column">
						${mapToHTMLString<string>(Object.keys(response.message), breed => `
							<span>${breed}</span>
						`)}
					</div>
				</div>`,
			),
		});
	}

	function sendDog(message: string, url: string) {
		sendMessage(
			dogPicsBotInfo,
			`<div class="column dog-message">
				${message}
	
				<div class="dog-picture">
					<img src="${url}" />
				</div>
			</div>`,
		);
	}

	return dogPicsBot;
}

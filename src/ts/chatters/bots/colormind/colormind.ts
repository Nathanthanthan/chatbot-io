import './colormind.css';

import { profilePicsPath, sendMessage } from '../../chatters';
import { createBot, mapToHTMLString, queryApi, sendInvalidParamsMessage, TBot, TBotInfo, TCommand } from '../bots';

let instance: TBot | undefined = undefined;
export var colormindCommands: TCommand[] = [];
const body = document.body;

export function Colormind(): TBot {
	if (instance) return instance;

	const colormindBotInfo: TBotInfo = {
		id: 2,
		profilePicture: { path: `${profilePicsPath}/I_had_to_recenter_this_logo_myself_because_colormind_off_centered_it_in_an_image_editor_so_it_would_be_aligned_on_their_website.png` },
		username: 'Colormind',
		description: 'Generates color palettes',
		apiBaseUrl: 'http://colormind.io/api/',
		introduction: 'Hi! I am a bot that uses <a href="http://colormind.io/api-access/" target="_blank" rel="noopener noreferrer">Colormind\'s API</a> to bring you some of the functionalities from their site: colormind.io.',
	};

	const commands: TCommand[] = [
		{
			body: 'randompalette',
			bot: colormindBotInfo,
			description: 'Returns a random color palette.',
			execute: generateRandomPalette,
		},
		{
			body: 'suggestpalette',
			bot: colormindBotInfo,
			description: 'Suggests a color palette based on the RGB value passed with parameters.',
			params: [{ name: 'R' }, { name: 'G' }, { name: 'B' }],
			execute: suggestPalette,
			throwInvalidParamsError: nbParams => sendInvalidParamsMessage(colormindBotInfo, nbParams),
		},
		{
			body: 'changetheme',
			bot: colormindBotInfo,
			description: 'Changes the primary color of the application to the RGB value passed with parameters.',
			params: [{ name: 'R' }, { name: 'G' }, { name: 'B' }],
			execute: changeTheme,
			throwInvalidParamsError: nbParams => sendInvalidParamsMessage(colormindBotInfo, nbParams),
		},
		{
			body: 'restoretheme',
			bot: colormindBotInfo,
			description: 'Restores the default theme of the application.',
			execute: restoreTheme,
		},
	];

	colormindCommands = commands;
	const colormindBot: TBot = createBot(colormindBotInfo, commands);
	instance = colormindBot;

	function generateRandomPalette() {
		queryApi<{ result: number[][] }>({
			method: 'POST',
			url: colormindBotInfo.apiBaseUrl,
			body: JSON.stringify({ model: 'default' }),
			onResponseCallback: response => sendPalette('Here is a randomly generated color palette:', response.result),
		});
	}

	function suggestPalette(rgb?: string[]) {
		if (!rgb || rgb.some(value => value === '' || isNaN(Number(value)) || Number(value) < 0 || Number(value) > 255)) {
			sendMessage(
				colormindBotInfo,
				'The parameters provided do not equate to a valid RGB value. Make sure every parameter is a number between 0 and 255 before trying again.',
				true,
			);

			return;
		}

		queryApi<{ result: number[][] }>({
			method: 'POST',
			url: colormindBotInfo.apiBaseUrl,
			body: JSON.stringify({
				model: 'default',
				input: [rgb, "N", "N", "N"],
			}),
			onResponseCallback: response => sendPalette('Here is a color palette generated based on your input:', response.result),
		});
	}

	function sendPalette(message: string, palette: number[][]) {
		sendMessage(
			colormindBotInfo,
			`<div class="palette-message">
				${message}
	
				<div class="palette-container">
					${mapToHTMLString<number[]>(palette, color => `
						<div
							class="palette-color"
							style="background-color: rgb(${color[0]}, ${color[1]}, ${color[2]})"
						></div>
					`)}
				</div>
			</div>`
		);
	}

	function changeTheme(rgb?: string[]) {
		if (!rgb || rgb.some(value => value === '' || isNaN(Number(value)) || Number(value) < 0 || Number(value) > 255)) {
			sendMessage(
				colormindBotInfo,
				'The parameters provided do not equate to a valid RGB value. Make sure every parameter is a number between 0 and 255 before trying again.',
				true,
			);

			return;
		}

		sendMessage(
			colormindBotInfo,
			`The app's theme has been changed!`,
		);

		body.style.setProperty('--primary', `rgb(${rgb.join(', ')})`);
	}

	function restoreTheme() {
		sendMessage(
			colormindBotInfo,
			'You can\'t go wrong with cyan and black... It just looks so slick!',
		);

		body.style.setProperty('--primary', `rgb(0, 255, 255)`);
	}

	return colormindBot;
}

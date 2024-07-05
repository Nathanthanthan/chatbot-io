import './cheapShark.css';

import { sendMessage } from '../../chatters';
import { createBot, mapToHTMLString, queryApi, sendInvalidParamsMessage, TBot, TBotInfo, TCommand } from '../bots';

/** CheapShark bot singleton. */
let instance: TBot | undefined = undefined;
/** CheapShark bot commands. */
export var cheapSharkCommands: TCommand[] = [];

/** Partial type returned by the API. */
type TDeal = Readonly<{
	title: string;
	metacriticScore: string;
	steamRatingText: string;
	normalPrice: string;
	salePrice: string;
}>;

/** Partial type returned by the API. */
type TGame = Readonly<{
	external: string;
	cheapest: string;
}>;

/**
 * Creates the CheapShark bot if it doesn't already exist, then returns it.
 * @returns The CheapShark bot.
 */
export function CheapShark(): TBot {
	if (instance) return instance;

	const cheapSharkBotInfo: TBotInfo = {
		id: 4,
		profilePicture: { path: 'https://www.cheapshark.com/img/logo_image.png?v=1.0' },
		username: 'CheapShark',
		description: 'Finds deals and compares prices for PC games',
		apiBaseUrl: 'https://www.cheapshark.com/api/1.0/',
		introduction: 'Hello! I\'m a bot that can show you deals on PC games. I am powered by <a href="https://apidocs.cheapshark.com/" target="_blank" rel="noopener noreferrer">CheapShark\'s API</a>.',
	};

	const commands: TCommand[] = [
		{
			body: 'showdeals',
			bot: cheapSharkBotInfo,
			description: 'Shows X amounts of deals from the current list of deals at cheapshark.com.',
			params: [{ name: 'nbDeals' }],
			execute: showDeals,
			throwInvalidParamsError: nbParams => sendInvalidParamsMessage(cheapSharkBotInfo, nbParams),
		},
		{
			body: 'searchgame',
			bot: cheapSharkBotInfo,
			description: '',
			params: [{ name: 'gameName' }],
			execute: searchGame,
			throwInvalidParamsError: nbParams => sendInvalidParamsMessage(cheapSharkBotInfo, nbParams),
		},
	];

	cheapSharkCommands = commands;
	const cheapSharkBot: TBot = createBot(cheapSharkBotInfo, commands);
	instance = cheapSharkBot;

	function showDeals(pageSize?: string[]) {
		if (!pageSize || pageSize[0] === '' || isNaN(Number(pageSize[0])) || Number(pageSize[0]) < 1) {
			sendMessage(
				cheapSharkBotInfo,
				'The parameter provided is not a valid number. Make sure the parameter is a number equal to or higher than 1.',
				true,
			);

			return;
		}

		queryApi<TDeal[]>({
			method: 'GET',
			url: `${cheapSharkBotInfo.apiBaseUrl}deals?pageSize=${pageSize[0]}&onSale=1`,
			onResponseCallback: response => sendMessage(
				cheapSharkBotInfo,
				`<div class="deals-message">
					<span>	
						Here is ${pageSize[0]} game${Number(pageSize[0]) > 1 ? 's' : ''} currently on sale:
					</span>

					<div class="deals-list">
						${mapToHTMLString<TDeal>(response, deal => `
							<div class="deal">
								<span class="deal-title">--- ${deal.title} ---</span>
								<span>Normal price: <b>${deal.normalPrice}</b></span>
								<span>Current price: <b>${deal.salePrice}</b></span>
								<span>Metacritic score: <b>${deal.metacriticScore}</b></span>
								<span>Steam rating: <b>${deal.steamRatingText}</b></span>
							</div>
						`)}
					</div>
				</div>`,
			),
		});
	}

	function searchGame(name?: string[]) {
		if (!name || name[0] === '') {
			sendMessage(
				cheapSharkBotInfo,
				'No parameter provided.',
				true,
			);

			return;
		}

		queryApi<TGame[]>({
			method: 'GET',
			url: `${cheapSharkBotInfo.apiBaseUrl}games?title=${name[0]}&limit=10`,
			onResponseCallback: response => sendMessage(
				cheapSharkBotInfo,
				`<div class="deals-message">
					<span>	
						Here are some games that correspond to your search:
					</span>

					<div class="deals-list">
						${mapToHTMLString<TGame>(response, deal => `
							<div class="deal">
								<span class="deal-title">--- ${deal.external} ---</span>
								<span>Cheapest price: <b>${deal.cheapest}</b></span>
							</div>
						`)}
					</div>
				</div>`,
			),
		});
	}

	return cheapSharkBot;
}

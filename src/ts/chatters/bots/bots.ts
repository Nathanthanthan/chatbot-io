import './bots.css';

import { sendMessage, TChatterInfo } from "../chatters";
import { UTILITY_BOT_ID } from './utility/utility';

export const PARAM_SEPARATOR: string = '?';

export type TBotInfo = Readonly<{
	description: string;
	apiBaseUrl: string;
	introduction: string;
} & TChatterInfo>;

export type TBot = Readonly<{
	interpretMessage: (message: string) => void;
} & TBotInfo>;

export type TParam = Readonly<{
	name: string;
}>;

export type TCommand = Readonly<{
	body: string;
	bot: TBotInfo;
	description: string;
	params?: TParam[];
	execute: (params?: string[]) => void;
	throwInvalidParamsError?: (nbParams: number) => void;
}>;

export type TBotQuery<TResponseType = any> = Readonly<{
	method: string;
	url: string;
	body?: BodyInit;
	onResponseCallback: (responseData: TResponseType) => void;
}>;

export function mapToHTMLString<TElementType>(array: TElementType[], callback: (element: TElementType) => string) {
	return array.map(callback).join('');
}

export function sendInvalidParamsMessage(chatter: TChatterInfo, nbParams: number) {
	const mockParams: string[] = [];

	for (let i = 0; i < nbParams; i++) {
		mockParams.push(`${PARAM_SEPARATOR}param${i + 1}`);
	}

	sendMessage(
		chatter,
		`<div class="invalid-params-message">
			<span>
				This command requires ${nbParams} parameters to work. Make sure you are using the following format before trying again:
			</span>

			<span>
				commandBody ${mockParams.join(' ')}
			</span>
		</div>`,
		true,
	);
}

export function interpretMessage(message: string, commands: ReadonlyArray<TCommand>) {
	const formattedMessage: string[] = message.toLowerCase().replace(/\s+/g, '').split(PARAM_SEPARATOR);
	const body: string = formattedMessage[0];
	const params: string[] = formattedMessage.slice(1, formattedMessage.length);

	commands.forEach(command => {
		if (!body.includes(command.body)) return;

		if (command.params) {
			if (command.params.length === params.length && params.every(param => param !== '')) {
				command.execute(params);
				return;
			}

			command.throwInvalidParamsError?.(command.params.length);
			return;
		}

		command.execute();
	});
}

export async function queryApi<TResponseType>(query: TBotQuery<TResponseType>) {
	await fetch(query.url, {
		method: query.method,
		body: query?.body,
	})
		.then(response => response.json())
		.then(responseData => query.onResponseCallback(responseData as TResponseType))
		.catch(error => console.error(error));
}

export function createBot(botInfo: TBotInfo, commands: TCommand[]): TBot {
	const commandsWithDefault: TCommand[] = commands;

	if (botInfo.id !== UTILITY_BOT_ID) {
		commandsWithDefault.push({
			body: 'hello',
			bot: botInfo,
			description: 'Let the bots introduce themselves to you!',
			execute: () => sendMessage(botInfo, botInfo.introduction!),
		});
	}

	return {
		...botInfo,
		interpretMessage: message => interpretMessage(message, commandsWithDefault),
	};
}

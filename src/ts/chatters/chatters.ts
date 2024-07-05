import { addMessageToChat } from '../messages/messages';
import { TBot } from './bots/bots';
import { CheapShark } from './bots/cheapShark/cheapShark';
import { Colormind } from './bots/colormind/colormind';
import { DogPics } from './bots/dogPics/dogPics';
import { RPS } from './bots/rps/rps';
import { Utility } from './bots/utility/utility';
import { User } from './user/user';

/** Path to the profile pictures folder. */
export const profilePicsPath: string = './src/assets/profilePictures';

type TProfilePicture = Readonly<{
	/** The image's url. */
	path: string;
	/** Use to add a background behind images with transparency to avoid visibility issues. */
	backgroundColor?: string;
}>;

export type TChatterInfo = Readonly<{
	/** Chatter's id. */
	id: number;
	/** Chatter's profile picture. */
	profilePicture: TProfilePicture;
	/** Chatter's username. */
	username: string;
}>;

export type TChatter = Readonly<{
	/**
	 * Sends a message as this chatter.
	 * @param message Message to send.
	 */
	sendMessage: (message: string) => void;
} & TChatterInfo>;

/**
 * Sends a message as the chatter passed as parameter.
 * @param chatter Chatter sending the message.
 * @param message Message's content
 * @param isError `true` if the message is an error message (only used by bots).
 */
export function sendMessage(chatter: TChatterInfo, message: string, isError?: boolean): void {
	addMessageToChat(
		{
			chatter,
			content: message,
			timeStamp: new Date(),
			isError,
		},
	);
}

/** The app's user. */
export const user: TChatter = User();

/** Colormind */
const colormindBot: TBot = Colormind();
/** Dog pics */
const dogPicsBot: TBot = DogPics();
/** CheapShark */
const cheapSharkBot: TBot = CheapShark();
/** Rock Paper Scissors */
const rpsBot: TBot = RPS();
/** Utility */
const utilityBot: TBot = Utility();

/** All bots */
export const bots: ReadonlyArray<TBot> = [
	colormindBot,
	dogPicsBot,
	cheapSharkBot,
	rpsBot,
	utilityBot,
];

/** Renders all of the app's bots in the bot list side panel. */
export function renderBotList() {
	const botList = document.querySelector<HTMLDivElement>('#botList');

	if (!botList) return;

	bots.forEach(bot => botList.insertAdjacentHTML('beforeend', `
		<div class="bot-card">
			<div class="profile-pic" style="${bot.profilePicture.backgroundColor && `background-color: ${bot.profilePicture.backgroundColor}`}">
				<img src="${bot.profilePicture.path}" />
			</div>

			<div class="bot-info">
				<b>${bot.username}</b>

				<p>${bot.description}</p>
			</div>
		</div>
	`));
}

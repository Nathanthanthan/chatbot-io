import { addMessageToChat } from "../messages/messages";
import { TBot } from "./bots/bots";
import { CheapShark } from "./bots/cheapShark/cheapShark";
import { Colormind } from "./bots/colormind/colormind";
import { DogPics } from "./bots/dogPics/dogPics";
import { RPS } from "./bots/rps/rps";
import { Utility } from "./bots/utility/utility";
import { User } from "./user/user";

export const profilePicsPath: string = './src/assets/profilePictures';

export type TProfilePicture = Readonly<{
	path: string;
	backgroundColor?: string;
}>;

export type TChatterInfo = Readonly<{
	id: number;
	profilePicture: TProfilePicture;
	username: string;
}>;

export type TChatter = Readonly<{
	sendMessage: (message: string) => void;
} & TChatterInfo>;

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

export const user: TChatter = User();

export const colormindBot: TBot = Colormind();
export const dogPicsBot: TBot = DogPics();
export const cheapSharkBot: TBot = CheapShark();
export const rpsBot: TBot = RPS();
export const utilityBot: TBot = Utility();

export const bots: ReadonlyArray<TBot> = [
	colormindBot,
	dogPicsBot,
	cheapSharkBot,
	rpsBot,
	utilityBot,
];

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

import { addMessageToChat } from '../../messages/messages';
import { profilePicsPath, TChatter, TChatterInfo } from '../chatters';

/** User id. */
export const USER_ID: number = 0;
/** User singleton. */
let instance: TChatter | undefined = undefined;

/**
 * Creates the user if it doesn't already exist, then returns it.
 * @returns The user.
 */
export function User(): TChatter {
	if (instance) return instance;

	const userChatterInfo: TChatterInfo = {
		id: USER_ID,
		profilePicture: {
			path: `${profilePicsPath}/user_no_bg.png`,
			backgroundColor: 'var(--primary)',
		},
		username: 'You',
	};

	function sendMessage(message: string) {
		addMessageToChat({
			chatter: userChatterInfo,
			content: message,
			timeStamp: new Date(),
		});
	}

	const user: TChatter = {
		...userChatterInfo,
		sendMessage,
	};
	instance = user;

	return user;
}

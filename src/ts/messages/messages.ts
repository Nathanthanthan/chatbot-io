import './messages.css';

import { TChatterInfo } from '../chatters/chatters';
import { USER_ID } from '../chatters/user/user';

/** Message type */
export type TMessage = Readonly<{
	/** Chatter who sent the message. */
	chatter: TChatterInfo;
	/** Content of the message. */
	content: string;
	/** Time at which the message was sent. */
	timeStamp: Date;
	/** `true` if the message is an error message (only used by bots). */
	isError?: boolean;
}>;

// The chat
const chat = document.querySelector<HTMLDivElement>('#chat');
// Conversation saved in local storage
let messages: TMessage[] = getLocalMessages();

/** Returns the conversation saved in local storage. */
function getLocalMessages(): TMessage[] {
	const localMessages = localStorage.getItem('conv');

	if (!localMessages) return [];

	return JSON.parse(localMessages);
}

/**
 * Saves the message passed as parameter to the local storage.
 * @param message Message to save.
 */
function saveMessage(message: TMessage) {
	messages.push(message);
	localStorage.setItem('conv', JSON.stringify(messages));
}

/**
 * Renders the element passed as parameter to the chat.
 * @param element String representing the HTML element to render.
 */
function renderToChat(element: string) {
	if (!chat) return;

	chat.insertAdjacentHTML('beforeend', element);
}

/**
 * Renders the message passed as parameter to the chat.
 * Gives different classes to the message's elements depending on who sent it and in what context.
 * @param message Message to render.
 * @param index The message's index in the conversation.
 */
function renderMessage(message: TMessage, index: number) {
	if (!chat) return;

	const userMessage: boolean = message.chatter.id === USER_ID;
	const firstOfMessageBlock: boolean = messages[index - 1]?.chatter.id !== message.chatter.id;

	renderToChat(`
		<div
			class="message-container${userMessage ? ' message-container-user' : ''}${firstOfMessageBlock ? ' message-container-first' : ''}"
			style="grid-row: ${index + 1}; grid-column: ${userMessage ? 2 : 1};"
		>
			${firstOfMessageBlock ? `
				<div class="profile-pic message-profile-pic${userMessage ? ' message-profile-pic-user' : ''}" style="${message.chatter.profilePicture.backgroundColor && `background-color: ${message.chatter.profilePicture.backgroundColor}`}">
					<img src="${message.chatter.profilePicture.path}" />
				</div>
			` : ''}

			${firstOfMessageBlock ? `
				<b class="username${userMessage ? ' username-user' : ''}">
					${message.chatter.username}
				</b>
			` : ''}

			<div class="message${userMessage ? ' message-user' : message.isError ? ' message-error' : ''}">
				<div class="message-content">
					${message.content}
				</div>

				<span class="message-timestamp${userMessage ? ' message-timestamp-user' : ''}">
					${message.timeStamp.toTimeString().slice(0, 5)}
				</span>
			</div>
		</div>
	`);
}

/**
 * Scrolls the chat all the way to the bottom.
 * @param behavior Use to manually set the scroll behaviour. Defaults to "smooth".
 */
export function scrollChatToBottom(behavior?: ScrollOptions['behavior']) {
	if (!chat) return;

	// Small timeout otherwise it doesn't always scroll all the way down
	// I tried everything I could :/
	setTimeout(() => {
		chat.scrollTo({
			top: chat.scrollHeight,
			behavior: behavior ?? 'smooth',
		});
	}, 150);
}

/**
 * Saves the message passed as parameter to local storage and renders it in the chat.
 * @param message Message to save and render.
 */
export function addMessageToChat(message: TMessage) {
	if (!messages.length) {
		if (!chat) return;

		// Removing the "Start a conversation" placeholder message
		chat.innerHTML = '';
	}

	saveMessage(message);
	renderMessage(message, messages.length - 1);
	scrollChatToBottom();
}

/**
 * Renders all the messages stored in local storage,
 * or the "Start a conversation" placeholder if there are none.
 */
export function renderLocalMessages() {
	messages = getLocalMessages();

	if (!messages.length) {
		if (!chat) return;

		// Removing the old conversation
		chat.innerHTML = '';

		renderToChat(`
			<div class="no-messages-placeholder">
				<h1>
					Start a conversation!
				</h1>

				<h2>
					Type "help" to get a list of commands
				</h2>
			</div>
		`);
	} else {
		messages.forEach((message, index) => renderMessage(
			{
				...message,
				timeStamp: new Date(message.timeStamp),
			},
			index,
		));

		// TODO: figure out why this doesn't scroll all the way down
		scrollChatToBottom('instant');
	}
}

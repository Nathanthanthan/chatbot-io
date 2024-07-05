import './inputs.css';

import { user } from '../chatters/chatters';
import { scrollChatToBottom } from '../messages/messages';

/**
 * Sets all chat inputs event listeners.
 * @param messageSentCallback Callback fired when a message is sent by the user.
 */
export function setupInputs(messageSentCallback: (message: string) => void) {
	const scrollButton = document.querySelector<HTMLButtonElement>('#scrollButton');
	const textArea = document.querySelector<HTMLTextAreaElement>('#messageInput');
	const sendButton = document.querySelector<HTMLButtonElement>('#sendButton');

	if (!scrollButton || !textArea || !sendButton) return;

	// Scroll to bottom button
	scrollButton.addEventListener('click', () => scrollChatToBottom());

	// Message textArea
	textArea.addEventListener('input', () => autoSizeTextArea(textArea));
	textArea.addEventListener('keydown', e => onInputKeyDown(e, textArea, messageSentCallback));

	// Send message button
	sendButton.addEventListener('click', () => sendMessage(textArea, messageSentCallback));
}

/**
 * Sends the textArea's current content as a message when the `Enter` key is pressed.
 * @param e KeyboardEvent.
 * @param textArea The message textArea.
 * @param messageSentCallback Callback fired if the user's message is sent.
 * @returns 
 */
function onInputKeyDown(e: KeyboardEvent, textArea: HTMLTextAreaElement, messageSentCallback: (message: string) => void) {
	if (!(e.key === 'Enter' && !e.shiftKey)) return;

	e.preventDefault();
	sendMessage(textArea, messageSentCallback);
}

/**
 * Sends the user's message defined by the textArea's value,
 * resets the textArea's value and resets its height accordingly.
 * @param textArea The message textArea.
 * @param messageSentCallback Callback fired when the user's message is sent.
 */
function sendMessage(textArea: HTMLTextAreaElement, messageSentCallback: (message: string) => void) {
	if (textArea.value.trim() === '') return;

	user.sendMessage(textArea.value);
	messageSentCallback(textArea.value);

	textArea.value = '';
	autoSizeTextArea(textArea);
}

/**
 * Sets the message textArea's height depending on its content.
 * @param textArea The message textArea.
 */
function autoSizeTextArea(textArea: HTMLTextAreaElement) {
	if (!textArea) return;

	textArea.style.height = '45px';
	textArea.style.height = `${textArea.scrollHeight + 2}px`;
}

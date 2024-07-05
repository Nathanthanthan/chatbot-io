import './inputs.css';

import { user } from '../chatters/chatters';
import { scrollChatToBottom } from '../messages/messages';

export function setupInputs(messageSentCallback: (message: string) => void) {
	const scrollButton = document.querySelector<HTMLButtonElement>('#scrollButton');
	const textArea = document.querySelector<HTMLTextAreaElement>('#messageInput');
	const sendButton = document.querySelector<HTMLButtonElement>('#sendButton');

	if (!scrollButton || !textArea || !sendButton) return;

	scrollButton.addEventListener('click', () => scrollChatToBottom());

	textArea.addEventListener('input', () => autoSizeTextArea(textArea));
	textArea.addEventListener('keydown', e => onInputKeyDown(e, textArea, messageSentCallback));

	sendButton.addEventListener('click', () => sendMessage(textArea, messageSentCallback));
}

function onInputKeyDown(e: KeyboardEvent, textArea: HTMLTextAreaElement, messageSentCallback: (message: string) => void) {
	if (!(e.key === "Enter" && !e.shiftKey)) return;

	e.preventDefault();
	sendMessage(textArea, messageSentCallback);
}

function sendMessage(textArea: HTMLTextAreaElement, messageSentCallback: (message: string) => void) {
	if (textArea.value.trim() === '') return;

	user.sendMessage(textArea.value);
	messageSentCallback(textArea.value);

	textArea.value = '';
	autoSizeTextArea(textArea);
}

function autoSizeTextArea(textArea: HTMLTextAreaElement) {
	if (!textArea) return;

	textArea.style.height = '45px';
	textArea.style.height = `${textArea.scrollHeight + 2}px`;
}

import './inputs.css';

import { addMessageToChat, scrollChatToBottom } from '../messages/messages';

function autoSizeTextArea(textArea: HTMLTextAreaElement) {
	if (!textArea) return;

	textArea.style.height = '45px';
	textArea.style.height = `${textArea.scrollHeight + 2}px`;
}

function sendMessage(textArea: HTMLTextAreaElement) {
	if (textArea.value.trim() === '') return;

	addMessageToChat({
		content: textArea.value,
		sender: 0,
		timeStamp: new Date(),
	});

	textArea.value = '';
	autoSizeTextArea(textArea);
}

function onInputKeyDown(e: KeyboardEvent, textArea: HTMLTextAreaElement) {
	if (!(e.key === "Enter" && !e.shiftKey)) return;

	e.preventDefault();
	sendMessage(textArea);
}

export function setupInputs() {
	const scrollButton = document.querySelector<HTMLButtonElement>('#scrollButton');
	const textArea = document.querySelector<HTMLTextAreaElement>('#messageInput');
	const sendButton = document.querySelector<HTMLButtonElement>('#sendButton');

	if (!scrollButton || !textArea || !sendButton) return;

	scrollButton.addEventListener('click', () => scrollChatToBottom());

	textArea.addEventListener('input', () => autoSizeTextArea(textArea));
	textArea.addEventListener('keydown', e => onInputKeyDown(e, textArea));

	sendButton.addEventListener('click', () => sendMessage(textArea));
}

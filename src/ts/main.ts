import '../css/main.css';

import { bots, renderBotList } from './chatters/chatters';

import { setupInputs } from './inputs/inputs';
import { renderLocalMessages } from './messages/messages';

/**
 * Fired when the user sends a new message.
 * Makes all the bots check for a potential command to execute.
 * @param message Content of the message sent by the user.
 */
function botsReadMessage(message: string) {
	bots.forEach(bot => bot.interpretMessage(message));
}

function setuptoggleBotListCheckbox() {
	const toggleBotListCheckbox = document.querySelector<HTMLInputElement>('#toggleBotListCheckbox');

	if (!toggleBotListCheckbox) return;

	toggleBotListCheckbox.addEventListener('change', () => toggleBotList(toggleBotListCheckbox.checked));
}

const botList = document.querySelector<HTMLDivElement>('#botList');

function toggleBotList(checked: boolean) {
	if (!botList) return;

	if (checked) {
		botList.style.transform = 'translateX(0)';
		botList.style.transition = 'transform 0.3s ease-out';
	} else {
		botList.style.transform = 'translateX(-100%)';
		botList.style.transition = 'transform 0.3s ease-out';
	}
}

// Setting everything up
renderBotList();
setuptoggleBotListCheckbox();
setupInputs(botsReadMessage);
renderLocalMessages();

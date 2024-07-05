import '../css/main.css';

import { bots, renderBotList } from './chatters/chatters';

import { setupInputs } from './inputs/inputs';
import { renderLocalMessages } from './messages/messages';

function botsReadMessage(message: string) {
	bots.forEach(bot => bot.interpretMessage(message));
}

renderBotList();

setupInputs(botsReadMessage);
renderLocalMessages();

// TODO: comment everything
// BONUS: implement lazy load to only display the last ~20 messages in the conv?
// BONUS: make it so pressing the up/down arrows while focusing on the input WHEN IT'S EMPTY will have the same behaviour as in a terminal

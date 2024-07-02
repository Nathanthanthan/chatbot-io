import './messages.css';

export type TMessage = {
	content: string;
	sender: number;
	timeStamp: Date;
};

const chat = document.querySelector<HTMLDivElement>('#chat');
const messages: TMessage[] = getLocalMessages();

export function getLocalMessages(): TMessage[] {
	const localMessages = localStorage.getItem('mockMessages');

	if (!localMessages) return [];

	return JSON.parse(localMessages);
}

export function saveMessage(message: TMessage) {
	messages.push(message);
	localStorage.setItem('mockMessages', JSON.stringify(messages));
}

export function renderToChat(element: string) {
	if (!chat) return;

	chat.insertAdjacentHTML('beforeend', element);
}

export function renderMessage(message: TMessage, index: number) {
	if (!chat) return;

	const userMessage: boolean = message.sender === 0;
	const firstOfMessageBlock: boolean = messages[index - 1]?.sender !== message.sender;

	renderToChat(`
		<div
			class="message-container${userMessage ? ' message-container-user' : ''}${firstOfMessageBlock ? ' message-container-first' : ''}"
			style="grid-row: ${index + 1}; grid-column: ${userMessage ? 2 : 1};"
		>
			${firstOfMessageBlock ? `
				<div class="profile-pic">
					<img src="../../../../src/assets/appLogo/ChatGPT_real_not_fake.png" />
				</div>
			` : ''}

			<div class="message${userMessage ? ' message-user' : ''}">
				<div>
					${message.content}
				</div>

				<span class="message-timestamp${userMessage ? ' message-timestamp-user' : ''}">
					${message.timeStamp.toTimeString().slice(0, 5)}
				</span>
			</div>
		</div>
	`);
}

export function scrollChatToBottom(behavior?: ScrollOptions["behavior"]) {
	if (!chat) return;
	
	chat.scrollTo({
		top: chat.scrollHeight,
		behavior: behavior ?? 'smooth',
	});
}

export function addMessageToChat(message: TMessage) {
	if (!messages.length) {
		if (!chat) return;

		chat.innerHTML = '';
	}

	saveMessage(message);
	renderMessage(message, messages.length);
	scrollChatToBottom();
}

export function renderLocalMessages() {
	if (!messages.length) {
		renderToChat(`
			<div class="no-messages-placeholder">
				<h1>
					Start a conversation!
				</h1>

				<h2>
					Type "!help" to get a list of commands
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

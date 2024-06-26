import './message.css';

type TMessage = {
	content: string;
	index: number;
	sender: number;
	timeStamp: Date;
};

export function renderMessage(message: TMessage, prevMessageSender?: number) {
	const chat = document.querySelector<HTMLDivElement>('#chat-messages');

	if (!chat) return;

	const userMessage: boolean = message.sender === 0;
	const firstOfMessageBlock: boolean = prevMessageSender !== message.sender;

	chat.insertAdjacentHTML('beforeend', `
		<div
			class="message-container${userMessage ? ' message-container-user' : ''}${firstOfMessageBlock ? ' message-container-first' : ''}"
			style="grid-row: ${message.index + 1}; grid-column: ${userMessage ? 2 : 1};"
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

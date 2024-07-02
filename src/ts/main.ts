import '../css/main.css';

import { setupInputs } from './inputs/inputs';
import { renderLocalMessages } from './messages/messages';

function setupMockMessagesButtons() {
	const setMockMessagesButton = document.querySelector<HTMLButtonElement>('#setMockMessagesButton');
	const deleteMockMessagesButton = document.querySelector<HTMLButtonElement>('#deleteMockMessagesButton');

	if (!setMockMessagesButton || !deleteMockMessagesButton) return;

	setMockMessagesButton.addEventListener('click', () => {
		localStorage.setItem('mockMessages', JSON.stringify([
			{
				content: 'Test',
				sender: 1,
				timeStamp: new Date(),
			},
			{
				content: 'Test 2',
				sender: 0,
				timeStamp: new Date(),
			},
			{
				content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit distinctio eaque voluptatem repellendus. Saepe eos ipsam natus eveniet? Iste nostrum explicabo modi ipsum blanditiis voluptas iure ab. Quam, voluptatem veritatis!',
				sender: 1,
				timeStamp: new Date(),
			},
			{
				content: 'Test 3',
				sender: 1,
				timeStamp: new Date(),
			},
			{
				content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit distinctio eaque voluptatem repellendus. Saepe eos ipsam natus eveniet? Iste nostrum explicabo modi ipsum blanditiis voluptas iure ab. Quam, voluptatem veritatis!',
				sender: 0,
				timeStamp: new Date(),
			},
			{
				content: 'Test 4',
				sender: 0,
				timeStamp: new Date(),
			},
			{
				content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit distinctio',
				sender: 0,
				timeStamp: new Date(),
			},
			{
				content: 'Test',
				sender: 1,
				timeStamp: new Date(),
			},
			{
				content: 'Test 2',
				sender: 0,
				timeStamp: new Date(),
			},
			{
				content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit distinctio eaque voluptatem repellendus. Saepe eos ipsam natus eveniet? Iste nostrum explicabo modi ipsum blanditiis voluptas iure ab. Quam, voluptatem veritatis!',
				sender: 1,
				timeStamp: new Date(),
			},
			{
				content: 'Test 3',
				sender: 1,
				timeStamp: new Date(),
			},
			{
				content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit distinctio eaque voluptatem repellendus. Saepe eos ipsam natus eveniet? Iste nostrum explicabo modi ipsum blanditiis voluptas iure ab. Quam, voluptatem veritatis!',
				sender: 0,
				timeStamp: new Date(),
			},
			{
				content: 'Test 4',
				sender: 0,
				timeStamp: new Date(),
			},
			{
				content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit distinctio',
				sender: 0,
				timeStamp: new Date(),
			},
		]));

		location.reload();
	});

	deleteMockMessagesButton.addEventListener('click', () => {
		localStorage.removeItem('mockMessages');
		location.reload();
	});
}

setupMockMessagesButtons();

setupInputs();
renderLocalMessages();

// TODO: do we really have to use localStorage as a pseudo DB or did I misunderstand something?
// TODO: display name of the bot/"You" in addition to the profile pic
// TODO: implement lazy load to only display the last ~20 messages in the conv?
// TODO: comment everything

import '../css/main.css';

import { renderMessage } from './components/message/message';

function setupTextArea() {
	const textArea = document.querySelector<HTMLTextAreaElement>('#input');

	if (!textArea) return;

	textArea.addEventListener('input', () => autoSizeTextArea(textArea));
}

function autoSizeTextArea(textArea: HTMLTextAreaElement) {
	if (!textArea) return;

	textArea.style.height = '45px';
	textArea.style.height = `${textArea.scrollHeight + 2}px`;
}

setupTextArea();

renderMessage({
	content: 'Test',
	index: 0,
	sender: 1,
	timeStamp: new Date(),
});
renderMessage({
	content: 'Test 2',
	index: 1,
	sender: 0,
	timeStamp: new Date(),
}, 1);
renderMessage({
	content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit distinctio eaque voluptatem repellendus. Saepe eos ipsam natus eveniet? Iste nostrum explicabo modi ipsum blanditiis voluptas iure ab. Quam, voluptatem veritatis!',
	index: 2,
	sender: 1,
	timeStamp: new Date(),
}, 0);
renderMessage({
	content: 'Test 3',
	index: 3,
	sender: 1,
	timeStamp: new Date(),
}, 1);
renderMessage({
	content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit distinctio eaque voluptatem repellendus. Saepe eos ipsam natus eveniet? Iste nostrum explicabo modi ipsum blanditiis voluptas iure ab. Quam, voluptatem veritatis!',
	index: 4,
	sender: 0,
	timeStamp: new Date(),
}, 1);
renderMessage({
	content: 'Test 4',
	index: 5,
	sender: 0,
	timeStamp: new Date(),
}, 0);
renderMessage({
	content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit distinctio',
	index: 6,
	sender: 0,
	timeStamp: new Date(),
}, 0);

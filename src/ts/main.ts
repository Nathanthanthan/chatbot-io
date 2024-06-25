import '../css/style.css';

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

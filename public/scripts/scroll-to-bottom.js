const displayEl = document.querySelector('.message-container');

Array.from(displayEl.children).at(-1).scrollIntoView({ block: 'end' });
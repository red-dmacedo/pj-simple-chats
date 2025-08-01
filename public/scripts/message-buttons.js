const messageAreaEl = document.querySelector('.message-container');

messageAreaEl.addEventListener("click", (evt) => {
  function classListContainsAny(classList, diffArr) { // true if any item within diffArr is within classList
    for (item of diffArr) { if (classList.contains(item)) return true; };
    return false;
  };

  function newButton(type='button', id='delete-btn', textContent='Button', onClick=null) {
    const btn = document.createElement('button');
    btn.type = type;
    btn.textContent = textContent;
    btn.id = id;
    if(onClick) btn.onclick = onClick;
    return btn;
  };

  function getDeleteButton() {
    return document.querySelector('#delete-btn');
  };

  function getEditButton() {
    return document.querySelector('#edit-btn');
  };

  const delBtn = getDeleteButton();
  if (delBtn) delBtn.remove();
  const editBtn = getEditButton();
  if (editBtn) editBtn.remove();

  const target = evt.target;
  const classesToMatch = ['message', 'message-username', 'message-content', 'message-timestamp'];
  let messageEl;

  if (classListContainsAny(target.classList, classesToMatch)) {
    if (classListContainsAny(target.classList, classesToMatch.slice(0, 1))) {
      messageEl = target;
    } else {
      messageEl = target.parentNode;
    };
  };

  if (messageEl) {
    const displayName = document.querySelector('#displayName').textContent;
    const messageDisplayName = messageEl.querySelector('.message-username').textContent;
    if (messageDisplayName === displayName) {
      const newDelBtn = newButton('submit', 'delete-btn', 'Delete message');
      // const editOnClick = `location.href='/user/${user._id}/conversations/${convId}/${messageId}'`
      const newEditBtn = newButton('button', 'edit-btn', 'Edit');
      messageEl.appendChild(newEditBtn);
      messageEl.appendChild(newDelBtn);
    }

  };
});
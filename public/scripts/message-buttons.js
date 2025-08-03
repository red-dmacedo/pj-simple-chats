const messageAreaEl = document.querySelector('.message-container');
let previousEl;

const modal = {
  el: document.querySelector('#edit-message-modal'),
  closeBtnEl: document.querySelector('#edit-message-modal #close-btn-for-edit-message'),
  updateBtnEl: document.querySelector('#edit-message-modal #update-btn'),
  contentEl: document.querySelector('#edit-message-modal #edit-content'),
  headerEl: document.querySelector('#edit-message-modal #edit-message-header'),
  formEl: document.querySelector('#edit-message-modal form'),
};

const userId = document.querySelector('#userId').textContent;
const targetConvId = document.querySelector('#targetConvId').textContent;
let lastMsgId = "";

modal.closeBtnEl.addEventListener("click", (evt) => { modal.el.close(); });

messageAreaEl.addEventListener("click", (evt) => {
  function classListContainsAny(classList, diffArr) { // true if any item within diffArr is within classList
    for (item of diffArr) { if (classList.contains(item)) return true; };
    return false;
  };

  function newButton(type = 'button', id = 'delete-btn', textContent = 'Button', onClick = null) {
    const btn = document.createElement('button');
    btn.type = type;
    btn.textContent = textContent;
    btn.id = id;
    if (onClick) btn.onclick = onClick;
    return btn;
  };

  function getDeleteButton() {
    return document.querySelector('#delete-btn');
  };

  function getEditButton() {
    return document.querySelector('#edit-btn');
  };

  const target = evt.target;
  const classesToMatch = ['message', 'message-username', 'message-content', 'message-timestamp'];
  let messageEl;

  if (
    !classListContainsAny(target.classList, classesToMatch) &&
    target.id !== 'edit-btn'
  ) return;
  if (classListContainsAny(target.classList, classesToMatch.slice(0, 1))) { messageEl = target; }
  else { messageEl = target.parentNode; };

  if (target.id === 'edit-btn') { // show edit modal
    const msgIdEl = messageEl.querySelector(".message-id");

    if (lastMsgId !== msgIdEl.textContent) {
      lastMsgId = msgIdEl.textContent;
      const contentEl = messageEl.querySelector('.message-content');
      modal.contentEl.value = contentEl.textContent;
      modal.headerEl.textContent = msgIdEl.textContent;
      modal.formEl.action = `/user/${userId}/conversations/${targetConvId}/${msgIdEl.textContent}?_method=PUT`;
    };

    modal.el.show();
    return;
  };

  if (previousEl !== messageEl) { // show/hide edit and delete buttons
    const delBtn = getDeleteButton();
    if (delBtn) delBtn.remove();
    const editBtn = getEditButton();
    if (editBtn) editBtn.remove();

    previousEl = messageEl;
    const displayName = document.querySelector('#displayName').textContent;
    const messageDisplayName = messageEl.querySelector('.message-username').textContent;
    if (messageDisplayName === displayName) {
      const newDelBtn = newButton('submit', 'delete-btn', 'Delete message');
      // const editOnClick = `location.href='/user/${user._id}/conversations/${convId}/${messageId}'`
      const newEditBtn = newButton('button', 'edit-btn', 'Edit');
      messageEl.appendChild(newEditBtn);
      messageEl.appendChild(newDelBtn);
    };
  };
});

// function evtEditBtnClick(evt){
//   const target = evt.target;
//   if(target.id !== 'edit-btn') return;
//   editModal.showModal();
// };
const selectEl = document.querySelector('#selectUser');
const inputEl = document.querySelector('#searchUser');

inputEl.addEventListener("change", (evt) => {
  const searchValue = evt.target.value;
  const searchPattern = new RegExp(searchValue, 'i');
  const optionEls = selectEl.querySelectorAll('option'); // get all options under selectEl
  const showEls = Array.from(optionEls).filter(el => { if (searchPattern.test(el.textContent)) { return 1 } else { return 0 }; });
  const hideEls = Array.from(optionEls).filter(el => { if (searchPattern.test(el.textContent)) { return 0 } else { return 1 }; });

  console.log(showEls);

  optionEls.forEach(el => el.removeAttribute('selected')); // clear selected attribute from all options
  showEls[0].setAttribute('selected', true); // select the first option
  showEls.forEach(el => el.removeAttribute('hidden')); // unhide any previously hidden options
  hideEls.forEach(el => el.setAttribute('hidden', true)); // hide options that should not show
});
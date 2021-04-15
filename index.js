
window.onload = () => {
  let selects = document.querySelectorAll('.select');
  selects.forEach(select => {
    select.addEventListener('click', function (e) {
      var target = e.target;

      // 代理事件到dropdown-item
      if (target.className.indexOf('dropdown-item') > -1) {
        clickItem(target);
      }
    })
  })
}

const addClass = (ele, className) => {
  let classList = ele.className.split(' ');

  if (!classList.includes(className)) {
    classList.push(className);
  }

  ele.className = classList.join(' ');
};

const removeClass = (ele, className) => {
  let classList = ele.className.split(' ');

  classList.forEach((item, index) => {
    if (item === className) {
      classList.splice(index, 1);
    }
  })

  ele.className = classList.join(' ');
}

const clickItem = (target) => {
  let text = target.innerText && target.innerText.trim();
  let value = target.getAttribute('data-value') && target.getAttribute('data-value').trim();

  let parent = target.parentNode;
  let inputText = parent.previousElementSibling;
  let inputValue = inputText.previousElementSibling;
  let $siblings = siblings(target);

  inputText.value = text;
  inputValue.value = value;

  addClass(parent, 'hidden');
  setTimeout(() => {
    removeClass(parent, 'hidden');
  }, 500)

  addClass(target, 'active');
  $siblings.forEach(ele => {
    removeClass(ele, 'active');
  })
}

const nextElementSiblings = (ele) => {
  let nextSiblings = [];

  let next = ele.nextElementSibling;

  if (next) {
    nextSiblings.push(next);

    let nextAll = nextElementSiblings(next);

    nextSiblings = nextSiblings.concat(nextAll);
  }

  return nextSiblings;
}

const previousElementSiblings = (ele) => {
  let prevSiblings = [];

  let prev = ele.previousElementSibling;

  if (prev) {
    prevSiblings.push(prev);

    let prevAll = previousElementSiblings(prev);

    prevSiblings = prevSiblings.concat(prevAll);
  }

  return prevSiblings;
}

const siblings = (ele) => {
  let prevAll = previousElementSiblings(ele);
  let nextAll = nextElementSiblings(ele);

  return prevAll.concat(nextAll);
}
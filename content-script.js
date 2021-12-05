// content-script.js

// --------------------

let input_mode = false;

document.addEventListener('input', function (event) {
  input_mode = true;
}, true);

document.addEventListener('change', function (event) {
  input_mode = false;
}, true);

// --------------------

window.addEventListener('keyup', function (event) {
  const ctrlKeyPressed = event.ctrlKey;
  const altKeyPressed = event.altKey;
  if (ctrlKeyPressed || altKeyPressed ||
     (input_mode && event.code !== 'Escape') ||
     event.defaultPrevented || !event.isTrusted) {
      // Do nothing if the event was already processed
      return;
  }

  if (sessionStorage.getItem('intervalID') !== null &&
     !(event.code === 'ShiftLeft' || event.code === 'ShiftRight')) {
      // Interrupt the scrollDownAuto()
      clearInterval(Number(sessionStorage.getItem('intervalID')));
      sessionStorage.removeItem('intervalID');
  }

  const shiftKeyPressed = event.shiftKey;

  if (shiftKeyPressed) {
    switch (event.code) {
      // --- content-script.js
      case 'KeyG':
        scrollBottom();
        break;
      case 'KeyJ':
        scrollDownAuto();
        break;
      case 'Backspace':
        historyForward();
        break;
      // --- background-script.js
      case 'KeyH':
        browser.runtime.sendMessage(JSON.parse('{"code":"shiftKey_KeyH"}'));
        break;
      case 'KeyL':
        browser.runtime.sendMessage(JSON.parse('{"code":"shiftKey_KeyL"}'));
        break;
      case 'KeyZ':
        browser.runtime.sendMessage(JSON.parse('{"code":"shiftKey_KeyZ","selection":"' + window.getSelection().toString() + '"}'));
        break;
      default:
        return;
    }
  }

  if (!shiftKeyPressed) {
    switch (event.code) {
      // --- content-script.js
      case 'KeyG':
        scrollTop();
        break;
      case 'KeyJ':
        scrollDown();
        break;
      case 'KeyK':
        scrollUp();
        break;
      case 'KeyY':
        copyTitleURL();
        break;
      case 'Backspace':
        historyBack();
        break;
      // --- background-script.js
      case 'KeyD':
        browser.runtime.sendMessage(JSON.parse('{"code":"KeyD"}'));
        break;
      case 'KeyH':
        browser.runtime.sendMessage(JSON.parse('{"code":"KeyH"}'));
        break;
      case 'KeyL':
        browser.runtime.sendMessage(JSON.parse('{"code":"KeyL"}'));
        break;
      case 'KeyO':
        browser.runtime.sendMessage(JSON.parse('{"code":"KeyO","selection":"' + window.getSelection().toString() + '"}'));
        break;
      case 'KeyR':
        browser.runtime.sendMessage(JSON.parse('{"code":"KeyR"}'));
        break;
      case 'KeyU':
        browser.runtime.sendMessage(JSON.parse('{"code":"KeyU"}'));
        break;
      case 'KeyZ':
        browser.runtime.sendMessage(JSON.parse('{"code":"KeyZ","selection":"' + window.getSelection().toString() + '"}'));
        break;
      case 'Escape':
        vimodeElementFocus();
        break;
      default:
        return;
    }
  }

  // Cancel the default action to avoid it being handled twice
  event.preventDefault();
}, true);

// --------------------

function scrollUp() {
  window.scrollBy({
    top: -100,
    left: 0,
    behavior: 'auto'
  });
}

function scrollDown() {
  window.scrollBy({
    top: 100,
    left: 0,
    behavior: 'auto'
  });
}

function scrollDownAuto() {
  const intervalID = setInterval(() => window.scrollBy({top: 100, left: 0, behavior: 'smooth'}), 2000);
  sessionStorage.setItem('intervalID', intervalID);
}

function scrollTop() {
  window.scroll({
    top: 0,
    left: 0,
    behavior: 'smooth'
  });
}

function scrollBottom() {
  window.scrollBy({
    top: 1000000,
    left: 0,
    behavior: 'smooth'
  });
}

function historyBack() {
  window.history.back();
}

function historyForward() {
  window.history.forward();
}

function copyTitleURL() {
  const TitleURL = document.title + ' - '  + location.href;
  if (!(TitleURL === null || TitleURL === undefined)) {
    navigator.clipboard.writeText(TitleURL);
    alert('C L I P P E D ! !\n' + TitleURL);
  }
}

function vimodeElementFocus() {
  let vimodeElement = document.getElementById('vimode-a-64354306');
  if (vimodeElement === null || vimodeElement === undefined) {
    document.body.insertAdjacentHTML('afterend', '<a href="javascript:void(0)" id="vimode-a-64354306"></a>');
    vimodeElement = document.getElementById('vimode-a-64354306');
  }
  vimodeElement.focus({preventScroll: true});
}

// --------------------

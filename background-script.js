/* --- background-script.js --- */

/*
 This Source Code Form is subject to the terms of the Mozilla Public
   - License, v. 2.0. If a copy of the MPL was not distributed with this file,
   - You can obtain one at http://mozilla.org/MPL/2.0/.
*/

browser.runtime.onMessage.addListener(background_event);

function background_event(json) {
  switch (json.code) {
    case 'shiftKey_KeyH':
      tabUpdateFirst();
      break;
    case 'shiftKey_KeyL':
      tabUpdateLast();
      break;
    case 'shiftKey_KeyZ':
      tabCreateGoogleTranslate(json.selection);
      break;
    case 'KeyD':
      tabRemove();
      break;
    case 'KeyH':
      tabUpdatePrevious();
      break;
    case 'KeyL':
      tabUpdateNext();
      break;
    case 'KeyO':
      tabCreate(json.selection);
      break;
    case 'KeyR':
      tabReload();
      break;
    case 'KeyU':
      tabRestore();
      break;
    case 'KeyZ':
      tabCreateDeepL(json.selection);
      break;
    default:
      return;
  }
}

function tabUpdateFirst() {
  browser.tabs.query({
    currentWindow: true
  }).then((tabs) => {
    const Tabs = tabs.map((i) => i.id);
    browser.tabs.update(Tabs[0], {active: true});
  });
}

function tabUpdateLast() {
  browser.tabs.query({
    currentWindow: true
  }).then((tabs) => {
    const Tabs = tabs.map((i) => i.id);
    if (!Number.isSafeInteger(Tabs.length)) { return; }
    browser.tabs.update(Tabs[Tabs.length - 1], {active: true});
  });
}

function tabUpdateNext() {
  browser.tabs.query({
    currentWindow: true
  }).then((tabs) => {
    const Tabs = tabs.map((i) => i.id);
    browser.tabs.query({
      currentWindow: true,
      active: true
    }).then((currentTab) => {
      const currentTabIndex = Tabs.findIndex((element) => element == currentTab.map((i) => i.id)[0]);
      if (!Number.isSafeInteger(currentTabIndex)) { return; }
      if (currentTabIndex === Tabs.length - 1) {
        browser.tabs.update(Tabs[0], {active: true});
        return;
      }
      browser.tabs.update(Tabs[currentTabIndex + 1], {active: true});
    });
  });
}

function tabUpdatePrevious() {
  browser.tabs.query({
    currentWindow: true
  }).then((tabs) => {
    const Tabs = tabs.map((i) => i.id);
    browser.tabs.query({
      currentWindow: true,
      active: true
    }).then((currentTab) => {
      const currentTabIndex = Tabs.findIndex((element) => element == currentTab.map((i) => i.id)[0]);
      if (!Number.isSafeInteger(currentTabIndex)) { return; }
      if (currentTabIndex === 0) {
        browser.tabs.update(Tabs[Tabs.length - 1], {active: true});
        return;
      }
      browser.tabs.update(Tabs[currentTabIndex - 1], {active: true});
    });
  });
}

function tabReload() {
  browser.tabs.reload();
}

function tabCreate(query) {
  if (query === '' || query === null || query === undefined) {
    browser.tabs.create({
      active: true,
      url: 'https://ghsable.github.io/searchmode/'
    });
  } else {
    browser.tabs.create({
      active: true,
      url: 'https://www.ecosia.org/search?q=' + query
    });
  }
}

function tabCreateDeepL(query) {
  if (query === '' || query === null || query === undefined) {
    browser.tabs.create({
      active: true,
      url: 'https://www.deepl.com/translator'
    });
  } else {
    browser.tabs.create({
      active: true,
      url: 'https://www.deepl.com/translator#en/ja/' + query
    });
  }
}

function tabCreateGoogleTranslate(query) {
  if (query === '' || query === null || query === undefined) {
    browser.tabs.create({
      active: true,
      url: 'https://translate.google.com'
    });
  } else {
    browser.tabs.create({
      active: true,
      url: 'https://translate.google.com/?source=osdd#auto|auto|' + query
    });
  }
}

function tabRemove() {
  browser.tabs.query({
    currentWindow: true,
    active: true
  }).then((tabs) => {
    browser.tabs.remove(tabs.map((i) => i.id));
  });
}

function tabRestore() {
  browser.sessions.restore(browser.sessions.getRecentlyClosed()[0]);
}

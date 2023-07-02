// 定义一个函数，用于生成 Things3 的 URL Scheme
function getThingsURL(tab) {
  return 'things:///add?show-quick-entry=true&title=' 
      + encodeURIComponent(tab.title) 
      + '&notes=' + encodeURIComponent(tab.url);
}

// 监听插件图标的点击事件
chrome.action.onClicked.addListener((tab) => {
  chrome.tabs.update({ url: getThingsURL(tab) });
});

// 创建一个上下文菜单项
chrome.contextMenus.create({
  id: "addToThings3",
  title: chrome.i18n.getMessage("addToThings3"),
  contexts: ["page"]
});

// 监听上下文菜单项的点击事件
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "addToThings3") {
      chrome.tabs.update({ url: getThingsURL(tab) });
  }
});

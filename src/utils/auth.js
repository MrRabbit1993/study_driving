import storage from "@/utils/storage";
const APP_NAME = process.env.VUE_APP_NAME;
const KEY_USERINFO = APP_NAME ? `userInfo_${APP_NAME}` : "userInfo";

export let userInfoCache = (cache => {
  if (!cache) {
    return {};
  }
  try {
    return JSON.parse(cache);
  } catch (e) {
    storage.set(KEY_USERINFO, {});
    return {};
  }
})(storage.get(KEY_USERINFO));

export function getMenu() {
  return userInfoCache && userInfoCache.functionTreeList;
}
export function getSCREENMenu() {
  const functionTreeList =
    (userInfoCache && userInfoCache.functionTreeList) || [];
  const screenMenu = functionTreeList.find(item => {
    return item.id === "SCREEN";
  });
  return (screenMenu && screenMenu.children) || [];
}
function _getMenuByID(menus, id) {
  if (Array.isArray(menus)) {
    for (let i = 0, len = menus.length; i < len; i++) {
      if (menus[i]["id"] === id) {
        return menus[i];
      }
    }
  }
  return null;
}

function findFirstItem(menu) {
  const nodes = [menu];
  let item = null;
  let n = null;
  while (!item && (n = nodes.pop())) {
    if (n && n.url) {
      item = n;
    } else if (Array.isArray(n.children)) {
      let len = n.children.length;
      while (len--) {
        nodes.push(n.children[len]);
      }
    }
  }
  return item;
}

export function getFirstMenu(id) {
  const menu = getMenu();
  if (!menu) {
    return null;
  }
  return findFirstItem(!id ? menu[0] : _getMenuByID(menu, id));
}
export function getMenuByIDList(ids) {
  if (!userInfoCache && userInfoCache.functionTreeList) {
    return null;
  }
  return [].concat(ids).reduce((data, id) => {
    if (!data) {
      return null;
    }
    if (Array.isArray(data)) {
      return _getMenuByID(data, id);
    } else if (data.hasOwnProperty("children")) {
      return _getMenuByID(data.children, id);
    } else {
      return null;
    }
  }, userInfoCache && userInfoCache.functionTreeList);
}
export function getToken() {
  return userInfoCache && userInfoCache.accessToken;
}

export function getSystemType() {
  return userInfoCache && userInfoCache.systemType;
}

export function getUser() {
  return userInfoCache && userInfoCache.user;
}

export function getGroup() {
  return userInfoCache && userInfoCache.group;
}

export function getProject() {
  return userInfoCache && userInfoCache.project;
}

export function getFunctionList() {
  return userInfoCache && userInfoCache.functionList;
}

export function setUserInfo(value) {
  userInfoCache = value;
  storage.set(KEY_USERINFO, value);
}

export function removeUserInfo() {
  userInfoCache = {};
  storage.remove(KEY_USERINFO);
}

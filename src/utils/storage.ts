function helper(isSession?: boolean) {
  return isSession ? sessionStorage : localStorage;
}

function getStorage(key: string, isSession?: boolean) {
  return helper(isSession).getItem(key);
}

function setStorage(key: string, value: any, isSession?: boolean) {
  return helper(isSession).setItem(key, typeof value === "string" ? value : JSON.stringify(value));
}

function removeStorage(key: string, isSession?: boolean) {
  return helper(isSession).removeItem(key);
}

function clearStorage(isSession?: boolean) {
  return (isSession ? sessionStorage : localStorage).clear();
}

const storage = {
  get: getStorage,
  set: setStorage,
  remove: removeStorage,
  clear: clearStorage,
};

export default storage;

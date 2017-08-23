/**
 * Copyright 2017-present, Callstack.
 * All rights reserved.
 */

const watcherList = [];

const addWatcher = watcher => {
  watcherList.push(watcher);
  return watcherList.length - 1;
};

const removeWatcher = index => {
  watcherList.splice(index, 1);
};

const getList = () => watcherList;

const clearList = () => {
  watcherList.length = 0;
};

module.exports = {
  getList,
  clearList,
  addWatcher,
  removeWatcher,
};

/**
 * Copyright 2017-present, Callstack.
 * All rights reserved.
 */

/**
 * Reload request middleware
 */
const Watchers = require('../util/WatcherList');

function reloadAppMiddleware(req, res, next) {
  /**
   * On reload request, notify all watchers
   */
  if (req.path === '/reloadapp') {
    const headers = {
      'Content-Type': 'application/json; charset=UTF-8',
    };
    Watchers.getList().forEach(watcher => {
      watcher.res.writeHead(205, headers);
      watcher.res.end(JSON.stringify({ changed: true }));
    });

    Watchers.clearList();

    res.end();
  }
  next();
}

module.exports = reloadAppMiddleware;

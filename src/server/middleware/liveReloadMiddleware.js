/**
 * Copyright 2017-present, Callstack.
 * All rights reserved.
 */

/**
 * Live reload middleware
 */
const Watchers = require('../util/WatcherList');

function liveReloadMiddleware(compiler) {
  return (req, res, next) => {
    /**
     * React Native client opens connection at `/onchange`
     * and awaits reload signal (http status code - 205)
     */
    if (req.path === '/onchange') {
      const index = Watchers.addWatcher({ req, res });

      req.on('close', () => {
        Watchers.removeWatcher(index);
      });

      return;
    }

    /**
     * On new `build`, notify all registered watchers to reload
     */
    compiler.plugin('done', () => {
      const headers = {
        'Content-Type': 'application/json; charset=UTF-8',
      };
      Watchers.getList().forEach(watcher => {
        watcher.res.writeHead(205, headers);
        watcher.res.end(JSON.stringify({ changed: true }));
      });

      Watchers.clearList();
    });

    next();
  };
}

module.exports = liveReloadMiddleware;

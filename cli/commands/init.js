'use strict';

module.exports = function (deps, parser) {
  var pluginManager = require('../lib/plugin_manager')(deps.getPluginPath()());

  parser
    .command('init')
    .help('Initialize a new plugin for development')
    .callback(function (opts) {
      pluginManager.createNew(opts);
    });
};

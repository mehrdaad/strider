const _ = require('lodash'),
  fs = require('fs'),
  path = require('path'),
  rimraf = require('rimraf');

// these are plugins you can't uninstall
const crucialPlugins = ['git', 'simple-runner'];

module.exports = function (pluginsPath) {
  const local = require('./local_plugins')(pluginsPath);

  /*
   * Callback signature:
   *   cb(Error anyError, Boolean restartOrNot)
   */
  return function (name, cb) {
    if (crucialPlugins.indexOf(name) > -1) {
      return cb(new Error('This plugin cannot be uninstalled'));
    }
    local.listAllZipped(function (err, plugins) {
      const plugin = plugins[name];
      if (plugin) {
        rimraf(plugin.path, function (err) {
          cb(err, true);
          console.log('removed ' + plugin.path);
        });
      } else {
        console.error(name + ' not found');
        cb();
      }
    });
  };
};

function afterDelete(pluginPath, cb) {
  if (err) return cb(err);
  else return cb(null, true);
}

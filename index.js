/* eslint-env node */
'use strict';

const BroccoliDebug = require('broccoli-debug');
const Funnel = require('broccoli-funnel');
const mergeTrees = require('broccoli-merge-trees');
const fastbootTransform = require('fastboot-transform');
const assign = require('object-assign');
const path = require('path');

module.exports = {
  name: 'ember-code-prettify',

  included(app) {
    let config = app.project.config(app.env)['ember-code-prettify'] || {},
        vendor = this.treePaths.vendor;

    // Main modules
    app.import(`${vendor}/ember-code-prettify/prettify.js`);

    // Languages
    Array.prototype.forEach.call(config.languages || [], language => {
      app.import(`${vendor}/ember-code-prettify/lang-${language}.js`);
    });

    // Skin
    if (config.skin) {
      app.import(`${vendor}/ember-code-prettify/skins/${config.skin}.css`);
    } else {
      app.import(`${vendor}/ember-code-prettify/prettify.css`);
    }

    return this._super.included.apply(this, arguments);
  },

  treeForVendor(vendorTree) {
    let debugTree = BroccoliDebug.buildDebugCallback(this.name),
        trees = [];

    if (vendorTree) {
      trees.push(
        debugTree(vendorTree, 'vendorTree')
      );
    }

    let module = fastbootTransform(
      moduleToFunnel('code-prettify', {
        include: ['**/*.js', '**/*.css'],
        destDir: 'ember-code-prettify'
      })
    );

    trees.push(
      debugTree(module, 'module')
    );

    return mergeTrees(trees);
  }

};

function moduleToFunnel(moduleName, opts) {
  let defaults = { destDir: moduleName };
  return new Funnel(resolveModulePath(moduleName), assign(defaults, opts));
}

// NOTE:
// Unfortunately, code-prettify's main file is located in src.
// We need to grab the loader folder
function resolveModulePath(moduleName) {
  let modulePath = path.dirname(require.resolve(moduleName));
  return locateLoaderFolder(modulePath)
}

function locateLoaderFolder(modulePath) {
  modulePath = modulePath.substr(0, modulePath.lastIndexOf('/'));
  return path.join(modulePath, 'loader');
}

umd(function(define){
define(function(require, exports, module){
'use strict';

/**
 * Module Dependencies
 */

var serialize = require('viewjs-serialize');

/**
 * Exports
 */

/**
 * Installs the serialize plugin
 * so that html comes with attributes
 * required for parsing on the client.
 *
 * Overwrite createElement so that
 * we can work with an element like
 * object without a document.
 *
 * @param  {Object} view
 * @public
 */
exports.install = function(view) {
  view.install(serialize);
  view.Base.prototype.createElement = fakeElement;
};

/**
 * Create a fake element like
 * object for use in environments
 * without a document.
 *
 * @param  {String} tag
 * @return {Object}
 */
function fakeElement(tag) {
  return {
    id: '',
    tagName: tag,
    innerHTML: '',
    className: '',
    attributes: {},
    setAttribute: function(key, value) {
      this.attributes[key] = value;
    },
    getAttribute: function(key) {
      return this.attributes[key];
    },
    get outerHTML() {
      var html = '<' + this.tagName;
      html += ' class="' + this.className + '"';
      html += ' id="' + this.id + '"';
      html += toAttrString(this.attributes);
      html += '>';
      html += this.innerHTML;
      html += '</' + this.tagName + '>';
      return html;
    }
  };
}

/**
 * Turn a key/value object into
 * an html attribute string.
 *
 * @param  {Object} obj
 * @return {String}
 */
function toAttrString(obj) {
  var attrs = [], key;
  for (key in obj) attrs.push(key + '="' + obj[key] + '"');
  return attrs.length ? ' ' + attrs.join(' ') : '';
}

},'viewjs-node');});function umd(fn,n){
if(typeof define=='function')return fn(define);
if(typeof module=='object')return fn(function(c){c(require,exports,module);});
var m={exports:{}},r=function(n){return window[n];};fn(function(c){window[n]=c(r,m.exports,m)||m.exports;});}
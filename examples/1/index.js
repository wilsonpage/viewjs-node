
/**
 * Module Dependencies
 */

var view = require('viewjs');

// Install viewjs-node
view.install(require('../../'));

// Define component
var MyView = view.define({
  name: 'my-view',
  render: function() {
    this.el.innerHTML = 'some lush content';
    return this;
  }
});

// Create and render
var myView = new MyView().render();

// Get HTML for client
var html = myView.toHTML();

console.log(html);
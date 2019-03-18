/* global require, requirejs */

requirejs.config({
  // By default load any module IDs from js/lib
  baseUrl: '/ui',
  // except, if the module ID starts with "app",
  // load it from the js/app directory. paths
  // config is relative to the baseUrl, and
  // never includes a ".js" extension since
  // the paths config could be for a directory.
  paths: {
    backbone: ['https://cdnjs.cloudflare.com/ajax/libs/backbone.js/1.4.0/backbone-min'],
    underscore: ['https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.9.1/underscore-min'],
    jquery: ['https://code.jquery.com/jquery-3.3.1.min'],
    bootstrap: ['https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.3.1/js/bootstrap.bundle.min'],
    text: ['https://cdnjs.cloudflare.com/ajax/libs/require-text/2.0.12/text.min'],
    select2: ['https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.6-rc.0/js/select2.min']
  },
  shim: {
    'bootstrap': {
      deps: ['jquery']
    },
    'backbone': {
      deps: ['jquery']
    }
  }
})

require(['jquery', 'js/mainView'], ($, MainView) => {
  this.mainView = new MainView({ el: $('.container') })
})

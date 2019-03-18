/* global define */

define(['backbone', 'underscore', 'jquery', 'bootstrap'], function (Backbone, _, $) {
  return Backbone.Model.extend({
    urlRoot: '/api/orders'
  })
})

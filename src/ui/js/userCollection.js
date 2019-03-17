/* global define*/

define(['backbone', 'underscore', 'text!template/main.html', 'bootstrap'], function (Backbone, _, MainTemplate) {
  return Backbone.Collection.extend({
    url: '/api/users'
  })
})
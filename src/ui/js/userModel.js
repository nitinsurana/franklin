/* global define*/

define(['backbone', 'underscore', 'text!template/user.html', 'js/userCollection', 'bootstrap'], function (Backbone, _, UserTemplate, UserCollection) {
  return Backbone.Model.extend({
    urlRoot: '/api/users'
  })
})
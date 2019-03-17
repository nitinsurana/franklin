/* global define*/

define(['backbone', 'underscore',
  'js/userModel',
  'bootstrap'], function (Backbone, _, UserModel) {
  return Backbone.Collection.extend({
    model: UserModel,
    url: '/api/users'
  })
})
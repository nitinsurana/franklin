/* global define */

define(['backbone', 'underscore',
  'js/itemModel',
  'bootstrap'], function (Backbone, _, ItemModel) {
  return Backbone.Collection.extend({
    model: ItemModel,
    url: '/api/items'
  })
})

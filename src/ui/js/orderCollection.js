/* global define */

define(['backbone', 'underscore',
  'js/orderModel',
  'bootstrap'], function (Backbone, _, OrderModel) {
  return Backbone.Collection.extend({
    model: OrderModel,
    url: '/api/orders'
  })
})

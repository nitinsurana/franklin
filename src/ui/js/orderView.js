/* global define, $ */

define(['backbone', 'underscore', 'text!template/order.html', 'bootstrap'], function (Backbone, _, OrderTemplate) {
  return Backbone.View.extend({
    template: _.template(OrderTemplate),
    initialize: function (options) {
      const orderCollection = this.orderCollection = options.orderCollection
      orderCollection.on('sync', this.render.bind(this))
      orderCollection.on('add', this.render.bind(this))
      orderCollection.on('remove', this.render.bind(this))
      this.render()
    },
    events: {
      'click .add-order': 'addNewOrder',
      'click .edit-order': 'editOrder',
      'click .delete-order': 'delOrder'
    },
    addNewOrder: function () {
      this.trigger('addNewOrder')
    },
    delOrder: function (e) {
      const id = $(e.currentTarget).attr('data-id')
      this.orderCollection.get(id).destroy()
      this.orderCollection.remove(id)
    },
    editOrder: function (e) {
      this.trigger('editOrder', $(e.currentTarget).attr('data-id'))
    },
    render: function () {
      this.$el.html(this.template({ orders: this.orderCollection.toJSON() }))
    }
  })
})

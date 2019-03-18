/* global define, $ */

define(['backbone', 'underscore', 'text!template/item.html', 'bootstrap'], function (Backbone, _, ItemTemplate) {
  return Backbone.View.extend({
    template: _.template(ItemTemplate),
    initialize: function (options) {
      const itemCollection = this.itemCollection = options.itemCollection
      itemCollection.on('sync', this.render.bind(this))
      itemCollection.on('add', this.render.bind(this))
      itemCollection.on('remove', this.render.bind(this))
      this.render()
    },
    events: {
      'click .add-item': 'addNewItem',
      'click .edit-item': 'editItem',
      'click .delete-item': 'delItem'
    },
    addNewItem: function () {
      this.trigger('addNewItem')
    },
    delItem: function (e) {
      const id = $(e.currentTarget).attr('data-id')
      this.itemCollection.get(id).destroy()
      this.itemCollection.remove(id)
    },
    editItem: function (e) {
      this.trigger('editItem', $(e.currentTarget).attr('data-id'))
    },
    render: function () {
      this.$el.html(this.template({ items: this.itemCollection.toJSON() }))
    }
  })
})

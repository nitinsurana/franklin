/* global define, $ */

define(['backbone', 'underscore', 'text!template/user.html', 'bootstrap'], function (Backbone, _, UserTemplate) {
  return Backbone.View.extend({
    template: _.template(UserTemplate),
    initialize: function (options) {
      const userCollection = this.userCollection = options.userCollection
      userCollection.on('sync', this.render.bind(this))
      userCollection.on('add', this.render.bind(this))
      userCollection.on('remove', this.render.bind(this))
      this.render()
    },
    events: {
      'click .add-user': 'addNewUser',
      'click .edit-user': 'editUser',
      'click .delete-user': 'delUser'
    },
    addNewUser: function () {
      this.trigger('addNewUser')
    },
    delUser: function (e) {
      const id = $(e.currentTarget).attr('data-id')
      this.userCollection.get(id).destroy()
      this.userCollection.remove(id)
    },
    editUser: function (e) {
      this.trigger('editUser', $(e.currentTarget).attr('data-id'))
    },
    render: function () {
      this.$el.html(this.template({ users: this.userCollection.toJSON() }))
    }
  })
})

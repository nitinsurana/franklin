/* global define*/

define(['backbone', 'underscore', 'text!template/user.html', 'bootstrap'], function (Backbone, _, UserTemplate) {
  return Backbone.View.extend({
    template: _.template(UserTemplate),
    initialize: function (options) {
      const userCollection = this.userCollection = options.userCollection
      userCollection.on('sync', this.render.bind(this))
      this.render()
    },
    events: {
      'click .add-user': 'addNewUser'
    },
    addNewUser: function () {
      this.trigger('addNewUser')
    },
    render: function () {
      this.$el.html(this.template({ users: this.userCollection.toJSON() }))
    }
  })
})
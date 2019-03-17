/* global define*/

define(['backbone', 'underscore', 'text!template/user.html', 'js/userCollection', 'bootstrap'], function (Backbone, _, UserTemplate, UserCollection) {
  return Backbone.View.extend({
    template: _.template(UserTemplate),
    initialize: function () {
      const userCollection = this.userCollection = new UserCollection()
      userCollection.fetch().done(() => {
        this.render()
      })
    },
    render: function () {
      this.$el.html(this.template({ users: this.userCollection.toJSON() }))
    }
  })
})
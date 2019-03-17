/* global define*/

define(['backbone', 'underscore', 'text!template/main.html', 'js/userView', 'bootstrap'], function (Backbone, _, MainTemplate, UserView) {
  return Backbone.View.extend({
    template: _.template(MainTemplate),
    initialize: function () {
      this.render()
    },
    render: function () {
      this.$el.html(this.template())
      this.userView = new UserView({ el: this.$('.user-container') })
    }
  })
})
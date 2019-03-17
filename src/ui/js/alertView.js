/* global define*/

define(['backbone', 'underscore', 'text!template/alert.html', 'bootstrap'],
  function (Backbone, _, AlertTemplate) {
    return Backbone.View.extend({
      template: _.template(AlertTemplate),
      initialize: function (options) {
        this.render(options)
      },
      render: function (data) {
        this.$el.html(this.template({ data }))
      }
    })
  })
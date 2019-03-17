/* global define*/

define(['backbone', 'underscore', 'text!template/user-dialog.html', 'js/userModel', 'bootstrap'], function (Backbone, _, UserDialogTemplate, UserModel) {
  return Backbone.View.extend({
    template: _.template(UserDialogTemplate),
    initialize: function (options) {
      this.userCollection = options.userCollection
      const self = this
      if (Number.isInteger(options.id)) {
        this.model = this.userCollection.get(options.id)
        this.model.fetch().done(function () {
          self.render()
        })
      } else {
        this.model = new UserModel()
        this.render()
      }
    },
    events: {
      'click .save-user': 'save'
    },
    save: function () {
      const self = this
      this.model.set({
        name: this.$('#name').val(),
        id: this.$('#id').val()
      })
      const valid = this.model.save()
      if (valid) {
        valid
          .done(() => {
            if (self.model.id) {
              self.userCollection.add(self.model)
            }
            self.trigger('close', { type: 'success', message: 'Success' })
          })
          .fail(() => {
            self.trigger('close', { type: 'error', message: 'Failure' })
          })
      } else {
        self.trigger('close', { type: 'error', message: 'Failure' })
      }
    },
    render: function () {
      this.$el.html(this.template({ user: this.model.toJSON() }))
    }
  })
})
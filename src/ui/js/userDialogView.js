/* global define */

define(['backbone', 'underscore', 'text!template/user-dialog.html', 'js/userModel', 'bootstrap'], function (Backbone, _, UserDialogTemplate, UserModel) {
  return Backbone.View.extend({
    template: _.template(UserDialogTemplate),
    initialize: function (options) {
      const self = this
      this.userCollection = options.userCollection
      if (Number.isInteger(parseInt(options.id))) {
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
        id: this.$('#id').val().length > 0 ? this.$('#id').val() : undefined
      })
      const valid = this.model.save()
      if (valid) {
        valid
          .done(() => {
            if (self.model.id) {
              self.userCollection.add(self.model)
            }
            self.hideModal({ type: 'success', message: 'Success' })
          })
          .fail(() => {
            self.hideModal({ type: 'danger', message: 'Failure' })
          })
      } else {
        self.hideModal({ type: 'danger', message: 'Failure' })
      }
    },
    hideModal: function (data) {
      const self = this
      this.$('.modal').modal('hide')
      this.$('.modal').on('hidden.bs.modal', () => {
        self.trigger('close', data)
      })
    },
    render: function () {
      this.$el.html(this.template({ user: this.model.toJSON() }))
      this.$('.modal').modal('show')
    }
  })
})

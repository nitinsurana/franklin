/* global define*/

define(['backbone', 'underscore', 'text!template/main.html',
    'js/userCollection',
    'js/userView',
    'js/userDialogView',
    'js/alertView',
    'bootstrap'],
  function (Backbone, _, MainTemplate, UserCollection, UserView, UserDialogView, AlertView) {
    return Backbone.View.extend({
      template: _.template(MainTemplate),
      initialize: function () {
        this.render()
      },
      render: function () {
        const self = this
        this.$el.html(this.template())
        this.userCollection = new UserCollection()
        this.userCollection.fetch().done(() => {
          self.userView = new UserView({ el: self.$('.user-container'), userCollection: self.userCollection })
          self.userView.on('addNewUser', self.showUserDialog.bind(this))
          self.userView.on('editUser', self.showUserDialog.bind(this))
        })
      },
      showUserDialog: function (id) {
        const self = this
        this.userDialogView = new UserDialogView({
          el: this.$('.popup-container').append('<div/>'),
          userCollection: this.userCollection,
          id: id
        })
        this.userDialogView.on('close', function (data = {}) {
          self.userDialogView.$('.modal').on('hidden', () => {
            self.userDialogView.off()
            self.userDialogView.remove()
            self.userDialogView = null
          })
          self.alertView = new AlertView({ ...data, el: self.$('.alert-container') })
        })
      }
    })
  })

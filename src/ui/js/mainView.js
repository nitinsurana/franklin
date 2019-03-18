/* global define */

define(['backbone', 'underscore', 'jquery', 'text!template/main.html',
  'js/itemCollection',
  'js/userCollection',
  'js/orderCollection',
  'js/itemView',
  'js/userView',
  'js/orderView',
  'js/itemDialogView',
  'js/userDialogView',
  'js/orderDialogView',
  'js/alertView',
  'bootstrap'], function (Backbone, _, $, MainTemplate, ItemCollection, UserCollection, OrderCollection, ItemView, UserView, OrderView, ItemDialogView, UserDialogView, OrderDialogView, AlertView) {
  return Backbone.View.extend({
    template: _.template(MainTemplate),
    initialize: function () {
      this.render()
    },
    render: function () {
      this.$el.html(this.template())
      this.renderUsers()
      this.renderItems()
      this.renderOrders()
    },
    renderUsers: function () {
      const self = this
      this.userCollection = new UserCollection()
      this.userCollection.fetch().done(() => {
        self.userView = new UserView({ el: self.$('.user-container'), userCollection: self.userCollection })
        self.userView.on('addNewUser', self.showUserDialog.bind(this))
        self.userView.on('editUser', self.showUserDialog.bind(this))
      })
    },
    renderItems: function () {
      const self = this
      this.itemCollection = new ItemCollection()
      this.itemCollection.fetch().done(() => {
        self.itemView = new ItemView({ el: self.$('.item-container'), itemCollection: self.itemCollection })
        self.itemView.on('addNewItem', self.showItemDialog.bind(this))
        self.itemView.on('editItem', self.showItemDialog.bind(this))
      })
    },
    renderOrders: function () {
      const self = this
      this.orderCollection = new OrderCollection()
      this.orderCollection.fetch().done(() => {
        self.orderView = new OrderView({ el: self.$('.order-container'), orderCollection: self.orderCollection })
        self.orderView.on('addNewOrder', self.showOrderDialog.bind(this))
        self.orderView.on('editOrder', self.showOrderDialog.bind(this))
      })
    },
    showItemDialog: function (id) {
      const self = this
      const $div = $('<div></div>')
      this.$('.popup-container').append($div)
      this.itemDialogView = new ItemDialogView({
        el: $div,
        itemCollection: this.itemCollection,
        id: id
      })
      this.itemDialogView.on('close', function (data = {}) {
        self.itemDialogView.off()
        self.itemDialogView.remove()
        self.itemDialogView = null
        self.alertView = new AlertView({ ...data, el: self.$('.alert-container').append('<div/>') })
      })
    },
    showUserDialog: function (id) {
      const self = this
      const $div = $('<div></div>')
      this.$('.popup-container').append($div)
      this.userDialogView = new UserDialogView({
        el: $div,
        userCollection: this.userCollection,
        id: id
      })
      this.userDialogView.on('close', function (data = {}) {
        self.userDialogView.off()
        self.userDialogView.remove()
        self.userDialogView = null
        self.alertView = new AlertView({ ...data, el: self.$('.alert-container').append('<div/>') })
      })
    }
  })
})

/* global define */

define(['backbone', 'underscore', 'text!template/order-dialog.html', 'js/orderModel', 'select2', 'bootstrap'], function (Backbone, _, OrderDialogTemplate, OrderModel) {
  return Backbone.View.extend({
    template: _.template(OrderDialogTemplate),
    initialize: function (options) {
      const self = this
      this.orderCollection = options.orderCollection
      this.itemCollection = options.itemCollection
      this.userCollection = options.userCollection
      if (Number.isInteger(parseInt(options.id))) {
        this.model = this.orderCollection.get(options.id)
        this.model.fetch().done(function () {
          self.render()
        })
      } else {
        this.model = new OrderModel()
        this.render()
      }
    },
    events: {
      'click .save-order': 'save'
    },
    save: function () {
      const self = this
      this.model.set({
        user_id: this.$('#users').val(),
        id: this.$('#id').val().length > 0 ? this.$('#id').val() : undefined,
        items: this.$('#items').val(),
        itemCount: this.$('#items').val().length
      })
      const valid = this.model.save()
      if (valid) {
        valid
          .done(() => {
            if (self.model.id) {
              self.orderCollection.add(self.model)
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
      this.$el.html(this.template({
        order: this.model.toJSON(),
        users: this.userCollection.toJSON(),
        items: this.itemCollection.toJSON()
      }))
      this.$('.modal').modal('show')
      this.$('select').select2({
        width: '70%'
      })
    }
  })
})

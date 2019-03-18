/* global define */

define(['backbone', 'underscore', 'text!template/item-dialog.html', 'js/itemModel', 'bootstrap'], function (Backbone, _, ItemDialogTemplate, ItemModel) {
  return Backbone.View.extend({
    template: _.template(ItemDialogTemplate),
    initialize: function (options) {
      const self = this
      this.itemCollection = options.itemCollection
      if (Number.isInteger(parseInt(options.id))) {
        this.model = this.itemCollection.get(options.id)
        this.model.fetch().done(function () {
          self.render()
        })
      } else {
        this.model = new ItemModel()
        this.render()
      }
    },
    events: {
      'click .save-item': 'save'
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
              self.itemCollection.add(self.model)
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
      this.$el.html(this.template({ item: this.model.toJSON() }))
      this.$('.modal').modal('show')
    }
  })
})

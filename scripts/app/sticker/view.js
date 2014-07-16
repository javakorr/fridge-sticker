/** @jsx React.DOM */

define('app/sticker/view', ['backbone', 'lodash', 'react', 'app/sticker/list_component'], function(Backbone, _, React, StickerListComponent) {
    var StickerListView = Backbone.View.extend({
        el: '.sticker-list-wrap',
        updateZ: function(model) {
            var stickerID = model.get('id'),
                stickerZ = model.get('zIndex'),
                stickers = this.collection.clone().toJSON(),
                maxZ = _.max(stickers, 'zIndex').zIndex;

            if (stickers.length === 1) {
                return false;
            }

            this.collection.each(function(item) {
                if (item.get('zIndex') > stickerZ) {
                    item.set('zIndex', item.get('zIndex') - 100);
                }
            });

            model.set('zIndex', maxZ);

            return false;
        },
        editSticker: function(model, new_text) {
            model.set('text', new_text);
        },
        render: function() {
            React.renderComponent(StickerListComponent( {stickers:this.collection, onDrag:this.updateZ.bind(this), editSticker:this.editSticker.bind(this)} ), this.el);

            return this;
        }
    });

    return StickerListView;
});
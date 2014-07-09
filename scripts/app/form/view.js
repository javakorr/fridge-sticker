define('app/form/view', ['lodash', 'backbone', 'react', 'app/sticker/model', 'app/form/component'], function( _, Backbone, React, StickerModel, AddStickerFormComponent) {
    var AddStickerFormView = Backbone.View.extend({
        el: '.add-sticker-form-wrap',
        addSticker: function(new_sticker) {
            var stickers = this.collection.clone().toJSON(),
                maxStickerByID = _.max(stickers, 'id'),
                maxStickerByZ = _.max(stickers, 'zIndex');

            new_sticker['id'] = ( maxStickerByID === -Infinity ) ? 0 : (maxStickerByID.id + 1);
            new_sticker['zIndex'] = ( maxStickerByZ === -Infinity ) ? 100 : (maxStickerByZ.zIndex + 100);

            var model = new StickerModel(new_sticker);

            this.collection.add(model);
        },
        render: function() {
            React.renderComponent(AddStickerFormComponent( {pushNewSticker:this.addSticker.bind(this)} ), this.el);

            return this;
        }
    });

    return AddStickerFormView;
});
define('app/sticker/model', ['backbone'], function(Backbone) {
    var StickerModel = Backbone.Model.extend({
        defaults: {
            id: null,
            text: null,
            zIndex: null,
            bg_color: null
        }
    });

    return StickerModel;
});
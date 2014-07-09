define('app/sticker/collection', ['backbone', 'app/sticker/model'], function(Backbone, StickerModel) {
    var StickerCollection = Backbone.Collection.extend({
        model: StickerModel
    });

    return StickerCollection;
});
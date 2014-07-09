require.config({
    paths: {
        'backbone': 'lib/backbone-min',
        'draggabilly': 'lib/draggabilly.pkgd.min',
        'dd': 'lib/jquery.dd.min',
        'jquery': 'lib/jquery-1.11.1.min',
        'react': 'lib/react-0.10.0',
        'underscore': 'lib/underscore-min',
        'lodash' : 'lib/lodash.min'
    }
});

require(['app/sticker/collection', 'app/sticker/view', 'app/form/view'], function(StickerCollection, StickerListView, AddStickerFormView) {
    var stickerCollectionInstance = new StickerCollection();

    var stickerListViewInstance = new StickerListView({collection: stickerCollectionInstance}),
        addStickerFormViewInstance = new AddStickerFormView({collection: stickerCollectionInstance});

    addStickerFormViewInstance.render();
    stickerListViewInstance.render();
});
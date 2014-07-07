/** @jsx React.DOM */

// BACKBONE MODELS
var StickerModel = Backbone.Model.extend({
    defaults: {
        id: null,
        text: null,
        zIndex: null,
        bg_color: null
    }
});

var StickerCollection = Backbone.Collection.extend({
    model: StickerModel
});

// BACKBONE VIEWS
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
    render: function() {
        React.renderComponent(StickerListComponent( {stickers:this.collection, onDrag:this.updateZ.bind(this)} ), this.el);

        return this;
    }
});

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

// REACT COMPONENTS
var StickerListComponent = React.createClass({displayName: 'StickerListComponent',
    getInitialState: function() {
        return {
            stickers: []
        };
    },
    componentWillMount: function() {
        var self = this;

        self.setState({stickers: self.props.stickers});

        self.props.stickers.on('add', function() {
            self.forceUpdate();
        });
    },
    updateZ: function(model) {
        this.props.onDrag(model);
    },
    render: function() {
        var self = this;

        var stickers = this.state.stickers.map(function(sticker) {
            return Sticker( {sticker_model:sticker, stickerID:sticker.get('id'), text:sticker.get('text'), zIndex:sticker.get('.zIndex'), bg_color:sticker.get('bg_color'), onDrag:self.updateZ} );
        });

        return (
            React.DOM.div( {className:"stickerList"}, 
                stickers
            )
        );
    }
});

var Sticker = React.createClass({displayName: 'Sticker',
    componentWillMount: function() {
        var self = this;

        self.props.sticker_model.on('change', function() {
            self.forceUpdate();
        });
    },
    componentDidMount: function() {
        var self = this;

        var draggie = new Draggabilly(self.getDOMNode(), {
            containment: '.stickerList'
        });

        draggie.on('dragStart', function(instance, event, pointer) {
            self.props.onDrag(self.props.sticker_model);
        });
    },
    render: function() {
        var styles = {zIndex: this.props.sticker_model.get('zIndex')},
            classString = 'sticker ' + this.props.bg_color;

        return (
            React.DOM.div( {className:classString, style:styles}, this.props.text)
        );
    }
});

var AddStickerFormComponent = React.createClass({displayName: 'AddStickerFormComponent',
    componentDidMount: function() {
        $(document).ready(function(e) {
            try {
                $('body select').msDropDown();
            } catch(e) {
                alert(e.message);
            }
        });
    },
    handleClick: function() {
        var new_sticker_text = this.refs.newStickerText.getDOMNode().value,
            new_sticker_bg_color = this.refs.newStickerBGColor.getDOMNode().value;

        if (!new_sticker_text) {
            return;
        }

        this.props.pushNewSticker({
            text: new_sticker_text,
            bg_color: new_sticker_bg_color
        });

        this.refs.newStickerText.getDOMNode().value = '';
    },
    render: function() {
        return (
            React.DOM.div( {className:"form"}, 
                React.DOM.label(null, 
                    "Add new sticker:",
                    React.DOM.input( {type:"text", ref:"newStickerText"} )
                ),
                React.DOM.select( {className:"colorSelect", ref:"newStickerBGColor"}, 
                    React.DOM.option( {value:"yellow", 'data-image':"images/yellow.gif"}),
                    React.DOM.option( {value:"green", 'data-image':"images/green.gif"}),
                    React.DOM.option( {value:"red", 'data-image':"images/red.gif"})
                ),
                React.DOM.button( {onClick:this.handleClick}, "GO!")
            )
        );
    }
});

// INIT
var stickerCollectionInstance = new StickerCollection();

var stickerListViewInstance = new StickerListView({collection: stickerCollectionInstance}),
    addStickerFormViewInstance = new AddStickerFormView({collection: stickerCollectionInstance});

addStickerFormViewInstance.render();
stickerListViewInstance.render();
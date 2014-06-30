/** @jsx React.DOM */

var Sticker = React.createClass({displayName: 'Sticker',
    handleDrag: function(sticker) {
        this.props.onDrag(sticker);
    },
    componentDidMount: function() {
        var self = this;

        var draggie = new Draggabilly(this.getDOMNode(), {
            containment: '.stickerList'
        });

        draggie.on('dragStart', function(instance, event, pointer) {
            self.handleDrag(self);
        });
    },
    render: function() {
        var styles = {zIndex: this.props.zIndex},
            classString = 'sticker ' + this.props.bg;

        return (
            React.DOM.div( {className:classString, style:styles}, 
                this.props.text
            )
        );
    }
});

var StickerList = React.createClass({displayName: 'StickerList',
    render: function() {
        var self = this;

        var stickersList = this.props.stickers.map(function(sticker) {
            return Sticker( {stickerID:sticker.id, text:sticker.text, zIndex:sticker.zIndex, onDrag:self.props.onDrag, bg:sticker.bg} );
        });

        return (
            React.DOM.div( {className:"stickerList"}, 
                stickersList
            )
        );
    }
});

var AddStickerForm = React.createClass({displayName: 'AddStickerForm',
    addNewSticker: function() {
        var newStickerName = this.refs.newStickerName.getDOMNode().value.trim(),
            newStickerColor = this.refs.newStickerColor.getDOMNode().value;

        if (!newStickerName) {
            return false;
        }

        this.props.onStickerAdd({text: newStickerName, bg: newStickerColor});

        this.refs.newStickerName.getDOMNode().value = "";

        return false;
    },
    componentDidMount: function() {
        $(document).ready(function(e) {
            try {
                $('body select').msDropDown();
            } catch(e) {
                alert(e.message);
            }
        });
    },
    render: function() {
        return (
            React.DOM.div( {className:"form"}, 
                React.DOM.label(null, 
                    "Add new sticker:",
                    React.DOM.input( {type:"text", ref:"newStickerName"} )
                ),
                React.DOM.select( {className:"colorSelect", ref:"newStickerColor"}, 
                    React.DOM.option( {value:"yellow", 'data-image':"images/yellow.gif"}),
                    React.DOM.option( {value:"green", 'data-image':"images/green.gif"}),
                    React.DOM.option( {value:"red", 'data-image':"images/red.gif"})
                ),
                React.DOM.button( {onClick:this.addNewSticker}, "GO!")
            )
        );
    }
});

var Content = React.createClass({displayName: 'Content',
    getInitialState: function() {
        return {stickers: []};
    },
    componentWillMount: function() {
        this.setState({
            stickers: []
        });
    },
    handleStickerAdd: function(sticker) {
        var stickers = this.state.stickers,
            maxStickerByID = _.max(stickers, 'id'),
            maxStickerByZ = _.max(stickers, 'zIndex');

        sticker['id'] = ( maxStickerByID === -Infinity ) ? 0 : (maxStickerByID.id + 1);
        sticker['zIndex'] = ( maxStickerByZ === -Infinity ) ? 100 : (maxStickerByZ.zIndex + 100);

        var updatedStickerList = stickers.concat([sticker]);

        this.setState({stickers: updatedStickerList});
    },
    handleDrag: function(sticker) {
        var stickerID = sticker.props.stickerID,
            stickerZ = sticker.props.zIndex,
            stickers = this.state.stickers,
            maxZ = _.max(stickers, 'zIndex').zIndex;

        if (stickers.length === 1) {
            return false;
        }

        _.forEach(stickers, function(item) {
            if (item.zIndex > stickerZ) {
                item.zIndex -= 100;
            }
        });

        _.find(stickers, {'id': stickerID}).zIndex = maxZ;

        this.setState({stickers: stickers});

        return false;
    },
    render: function() {
        return (
            React.DOM.div( {className:"content"}, 
                AddStickerForm( {onStickerAdd:this.handleStickerAdd} ),
                StickerList( {stickers:this.state.stickers, onDrag:this.handleDrag} )
            )
        );
    }
});

React.renderComponent(
    Content(null ),
    document.getElementById('wrap')
);
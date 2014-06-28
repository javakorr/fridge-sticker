/** @jsx React.DOM */

var Sticker = React.createClass({
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
            <div className={classString} style={styles}>
                {this.props.text}
            </div>
        );
    }
});

var StickerList = React.createClass({
    render: function() {
        var self = this;

        var stickersList = this.props.stickers.map(function(sticker) {
            return <Sticker stickerID={sticker.id} text={sticker.text} zIndex={sticker.zIndex} onDrag={self.props.onDrag} bg={sticker.bg} />;
        });

        return (
            <div className="stickerList">
                {stickersList}
            </div>
        );
    }
});

var AddStickerForm = React.createClass({
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
            <div className="form">
                <label>
                    Add new sticker:
                    <input type="text" ref="newStickerName" />
                </label>
                <select className="colorSelect" ref="newStickerColor">
                    <option value="yellow" data-image="images/yellow.gif"></option>
                    <option value="green" data-image="images/green.gif"></option>
                    <option value="red" data-image="images/red.gif"></option>
                </select>
                <button onClick={this.addNewSticker}>GO!</button>
            </div>
        );
    }
});

var Content = React.createClass({
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
            <div className="content">
                <AddStickerForm onStickerAdd={this.handleStickerAdd} />
                <StickerList stickers={this.state.stickers} onDrag={this.handleDrag} />
            </div>
        );
    }
});

React.renderComponent(
    <Content />,
    document.getElementById('wrap')
);


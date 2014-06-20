/** @jsx React.DOM */

var Sticker = React.createClass({
    componentDidMount: function() {
        var draggie = new Draggabilly(this.getDOMNode(), {});
    },
    render: function() {
        return (
            <div className="sticker">{this.props.text}</div>
        );
    }
});

var StickerList = React.createClass({
    render: function() {
        var stickersList = this.props.stickers.map(function(sticker) {
            return <Sticker text={sticker.text} />;
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
        var newStickerName = this.refs.newStickerName.getDOMNode().value.trim();

        if (!newStickerName) {
            return false;
        }

        this.props.onStickerAdd({text: newStickerName});

        this.refs.newStickerName.getDOMNode().value = "";

        return false;
    },
    render: function() {
        return (
            <div className="form">
                <label>
                    Add new sticker:
                    <input type="text" ref="newStickerName" />
                </label>
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
            updatedStickerList = stickers.concat([sticker]);

        this.setState({stickers: updatedStickerList});
    },
    render: function() {
        return (
            <div className="content">
                <AddStickerForm onStickerAdd={this.handleStickerAdd} />
                <StickerList stickers={this.state.stickers} />
            </div>
        );
    }
});

React.renderComponent(
    <Content />,
    document.getElementById('wrap')
);


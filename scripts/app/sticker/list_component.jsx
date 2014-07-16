/** @jsx React.DOM */

define('app/sticker/list_component', ['react', 'app/sticker/component'], function(React, Sticker) {
    var StickerListComponent = React.createClass({
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
        editSticker: function(model, new_text) {
            this.props.editSticker(model, new_text);
        },
        render: function() {
            var self = this;

            var stickers = this.state.stickers.map(function(sticker) {
                return <Sticker sticker_model={sticker} editSticker={self.editSticker} stickerID={sticker.get('id')} text={sticker.get('text')} zIndex={sticker.get('.zIndex')} bg_color={sticker.get('bg_color')} onDrag={self.updateZ} />;
            });

            return (
                <div className="stickerList">
                    {stickers}
                </div>
            );
        }
    });

    return StickerListComponent;
});
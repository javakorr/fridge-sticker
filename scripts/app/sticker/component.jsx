/** @jsx React.DOM */

define('app/sticker/component', ['react', 'backbone', 'draggabilly'], function(React, Backbone, Draggabilly) {
    var Sticker = React.createClass({
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
                <div className={classString} style={styles}>{this.props.text}</div>
            );
        }
    });

    return Sticker;
});
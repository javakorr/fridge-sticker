/** @jsx React.DOM */

define('app/sticker/component', ['react', 'backbone', 'draggabilly', 'jquery'], function(React, Backbone, Draggabilly, $) {
    var Sticker = React.createClass({
        getInitialState: function() {
            return {model: null};
        },
        componentWillMount: function() {
            var self = this;

            self.setState({model: self.props.sticker_model});

            self.props.sticker_model.on('change', function() {
                self.forceUpdate();
            });
        },
        componentDidMount: function() {
            var self = this;

            var draggie = new Draggabilly(self.getDOMNode(), {
                handle: '.drag',
                containment: '.stickerList'
            });

            draggie.on('dragStart', function(instance, event, pointer) {
                self.props.onDrag(self.props.sticker_model);
            });
        },
        openEditPopup: function() {
            var $element = $(this.getDOMNode());

            $element.find('.updated-sticker-text').removeClass('hidden');
            $element.find('.update-text').removeClass('hidden');
            $element.find('.text').addClass('hidden');
            $element.find('.edit-button').addClass('hidden');
        },
        editText: function() {
            var new_text = this.refs.updatedStickerText.getDOMNode().value.trim(),
                $element = $(this.getDOMNode());

            if (new_text) {
                this.props.editSticker(this.props.sticker_model, new_text);
            }

            this.refs.updatedStickerText.getDOMNode().value = '';

            $element.find('.updated-sticker-text').addClass('hidden');
            $element.find('.update-text').addClass('hidden');
            $element.find('.text').removeClass('hidden');
            $element.find('.edit-button').removeClass('hidden');
        },
        render: function() {
            var styles = {zIndex: this.props.sticker_model.get('zIndex')},
                classString = 'sticker ' + this.props.bg_color;

            return (
                <div className={classString} style={styles}>
                    <div className="sticker-wrap">
                        <div className="drag"></div>
                        <span className="text">{this.state.model.get('text')}</span>
                        <input type="text" className="updated-sticker-text hidden" ref="updatedStickerText" placeholder={this.state.model.get('text')} />
                        <button className="edit-button" onClick={this.openEditPopup}>Edit</button>
                        <button className="update-text hidden" onClick={this.editText}>GO</button>
                    </div>
                </div>
            );
        }
    });

    return Sticker;
});
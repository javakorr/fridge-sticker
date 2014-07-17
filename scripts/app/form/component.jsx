/** @jsx React.DOM */

define('app/form/component', ['react', 'jquery', 'dd'], function(React, $, dd) {
    var AddStickerFormComponent = React.createClass({
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
            var new_sticker_text = this.refs.newStickerText.getDOMNode().value.trim(),
                new_sticker_bg_color = this.refs.newStickerBGColor.getDOMNode().value;

            if (new_sticker_text) {
                this.props.pushNewSticker({
                    text: new_sticker_text,
                    bg_color: new_sticker_bg_color
                });
            }

            this.refs.newStickerText.getDOMNode().value = '';
        },
        render: function() {
            return (
                <div className="form">
                    <label>
                        Add new sticker:
                        <input type="text" ref="newStickerText" />
                    </label>
                    <select className="colorSelect" ref="newStickerBGColor">
                        <option value="yellow" data-image="images/yellow.gif"></option>
                        <option value="green" data-image="images/green.gif"></option>
                        <option value="red" data-image="images/red.gif"></option>
                    </select>
                    <button onClick={this.handleClick}>GO!</button>
                </div>
            );
        }
    });

    return AddStickerFormComponent;
});
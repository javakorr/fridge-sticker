define('app/form/component', ['react', 'jquery', 'dd'], function(React, $, dd) {
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

    return AddStickerFormComponent;
});
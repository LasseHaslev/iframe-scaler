var IframeScaler = function( element, options ) {

    this.element = element;

    this.options = {
        // Needed
        parent: null,
        upscale: false,
    };

    // Make a reference to this class instance
    var self = this;

    // Stores the data
    this.data = null;

    // Merge options with default
    this.mergeOptions = function( options ) {
        for ( var attr in options ) { this.options[ attr ] = options[ attr ] }
    }

    // Do the scaling of the iframe
    this.scaleIframe = function( iframe ) {

        var element = iframe ? iframe : this.element;

        var percentage = this.calculatePercentage( element );
        // http://stackoverflow.com/questions/166160/how-can-i-scale-the-content-of-an-iframe
        element.style.transform = 'scale(' + percentage + ')';
        element.style.transformOrigin = '0 0';

        // console.log(element.clientHeight * percentage);
        this.resizeHeight( element, percentage );
    }

    this.resizeHeight = function( element, percentage ) {
        if ( this.options.upscale || percentage < 1) {
            var newHeight = -( element.getAttribute('height') - ( element.getAttribute('height') * percentage ) );
            console.log(newHeight);
            element.style.marginBottom = newHeight + 'px';
        }
        else {
            element.style.marginBottom = 'auto';
        }
    }

    // get the acctual width
    this.getAcctualInnerSize = function( element ) {
        var computedStyle = getComputedStyle( element );
        var elementHeight = element.clientHeight;  // height with padding
        var elementWidth = element.clientWidth;   // width with padding

        elementHeight -= parseFloat(computedStyle.paddingTop) + parseFloat(computedStyle.paddingBottom);
        elementWidth -= parseFloat(computedStyle.paddingLeft) + parseFloat(computedStyle.paddingRight);

        return {
            width: elementWidth,
            height: elementHeight,
        };
    };

    // Get the scale percentage 0-1
    this.calculatePercentage = function( element ) {

        var element = element ? element : this.element;

        // Identify the parent
        var myParent = element.parentElement;
        // var myParent = this.data.parent ? this.data.parent : element.parentElement;

        // Get the innerWidth
        var parentInnerSize = this.getAcctualInnerSize(myParent);
        // Get the percentage width
        var percentage =  parentInnerSize.width / element.getAttribute('width');

        // Prevent scaling upwards and return value
        return this.options.upscale || percentage < 1 ? percentage : 1;
    },

    // Merge options with default
    this.mergeOptions( options );

    return this;

}

// window.IframeScaler = IframeScaler;

module.exports = IframeScaler;

// if ( module ) {
    // module.exports = IframeScaler;
// }

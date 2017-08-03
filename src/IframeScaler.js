class IframeScaler {

    constructor( element, options ) {

        this.element = null;
        if (element instanceof Element) {
            this.element = element;
        }

        this.options = this._mergeObject( {
            upscale: false,

            auto: true,
            watch: false,
        }, this.element ? options : element );



        if (this.element && this.options.watch) {
            this.watch();
        }
        else if (this.element && this.options.auto) {
            this.scale();
        }

    }

    _mergeObject( object, options ) {
        for ( var attr in options ) {
            object[ attr ] = options[ attr ]
        }
        return object;
    }

    setElement( element ) {
        this.element = element;
    }

    /*
     * Scale one time
     */
    scale() {
        IframeScaler.scaleIframe( this.element, this.options.upscale );
    }

    /*
     * Watch for window change and scale iframe
     */
    watch() {

        // Run one time
        this.scale();

        // watch for changes
        window.addEventListener( 'resize', this.scale.bind( this ), true );
    }

    // destroy() {
        // window.removeEventListener( 'resize', this.scale, true );
    // }

    // Do the scaling of the iframe
    static scaleIframe( iframe, upscale = false ) {

        var element = iframe ? iframe : this.element;

        var percentage = IframeScaler.calculatePercentage( element, upscale );
        // http://stackoverflow.com/questions/166160/how-can-i-scale-the-content-of-an-iframe
        element.style.transform = 'scale(' + percentage + ')';
        element.style.transformOrigin = '0 0';

        // console.log(element.clientHeight * percentage);
        IframeScaler.resizeHeight( element, percentage, upscale );
    }

    static resizeHeight( element, percentage, upscale = false ) {
        if ( upscale || percentage < 1) {
            var newHeight = -( element.getAttribute('height') - ( element.getAttribute('height') * percentage ) );
            element.style.marginBottom = newHeight + 'px';
        }
        else {
            element.style.marginBottom = 'auto';
        }
    }

    // get the acctual width
    static getComputedSize( element ) {
        var computedStyle = getComputedStyle( element );

        return {
            width: parseFloat( computedStyle.width ),
            height: parseFloat( computedStyle.height ),
        };

        // var elementWidth = element.clientWidth;   // width with padding
        // var elementHeight = element.clientHeight;  // height with padding

        // // remove padding width cause we actually want to know the inner size
        // elementWidth -= parseFloat(computedStyle.paddingLeft);
        // elementWidth -= parseFloat(computedStyle.paddingRight);

        // elementHeight -= parseFloat(computedStyle.paddingTop);
        // elementHeight -= parseFloat(computedStyle.paddingBottom);

        // return {
            // width: elementWidth,
            // height: elementHeight,
        // };
    }

    // Get the scale percentage 0-1
    static calculatePercentage( element, upscale = false ) {

        var element = element ? element : this.element;

        // Identify the parent
        var myParent = element.parentElement;
        // var myParent = this.data.parent ? this.data.parent : element.parentElement;

        // Get the innerWidth
        var parentInnerSize = IframeScaler.getComputedSize(myParent);
        // Get the percentage width
        var percentage =  parentInnerSize.width / element.getAttribute('width');

        // Prevent scaling upwards and return value
        return upscale || percentage < 1 ? percentage : 1;
    }
}

// Export both to modules and to window
if ( typeof module !== 'undefined' && typeof module.exports !== 'undefined' ) {
    module.exports = IframeScaler;
}
else {
    window.IframeScaler = IframeScaler;
}

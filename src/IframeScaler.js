class IframeScaler {

    constructor( element, options ) {

        this.options = this.mergeObject( {
            parent: null,
            upscale: false,
        }, options );

    }

    mergeObject( object, options ) {
        for ( var attr in options ) {
            object[ attr ] = options[ attr ]
        }
        return object;
    }


    // Do the scaling of the iframe
    scaleIframe( iframe ) {

        var element = iframe ? iframe : this.element;

        var percentage = this.calculatePercentage( element );
        // http://stackoverflow.com/questions/166160/how-can-i-scale-the-content-of-an-iframe
        element.style.transform = 'scale(' + percentage + ')';
        element.style.transformOrigin = '0 0';

        // console.log(element.clientHeight * percentage);
        this.resizeHeight( element, percentage );
    }

    resizeHeight( element, percentage ) {
        if ( this.options.upscale || percentage < 1) {
            var newHeight = -( element.getAttribute('height') - ( element.getAttribute('height') * percentage ) );
            element.style.marginBottom = newHeight + 'px';
        }
        else {
            element.style.marginBottom = 'auto';
        }
    }

    // get the acctual width
    getComputedSize( element ) {
        var computedStyle = getComputedStyle( element );

        return {
            width: parseFloat( computedStyle.width ),
            height: parseFloat( computedStyle.height ),
        };

        // var elementWidth = element.clientWidth;   // width with padding
        // var elementHeight = element.clientHeight;  // height with padding

        // console.log(element.offsetWidth);
        // console.log(elementWidth);
        // console.log(computedStyle.width);
        // console.log(computedStyle.paddingBottom);

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
    calculatePercentage( element ) {

        var element = element ? element : this.element;

        // Identify the parent
        var myParent = element.parentElement;
        // var myParent = this.data.parent ? this.data.parent : element.parentElement;

        // Get the innerWidth
        var parentInnerSize = this.getComputedSize(myParent);
        // Get the percentage width
        var percentage =  parentInnerSize.width / element.getAttribute('width');

        // Prevent scaling upwards and return value
        return this.options.upscale || percentage < 1 ? percentage : 1;
    }
}

if ( typeof module !== 'undefined' && typeof module.exports !== 'undefined' ) {
    module.exports = IframeScaler;
}
else {
    window.IframeScaler = IframeScaler;
}

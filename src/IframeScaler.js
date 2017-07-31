export default class IframeScaler {

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

}

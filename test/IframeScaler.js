// import IframeScaler from './dist/index';

let element;
let resizeWindow = function() {
    document.body.style.width = '300px';
    window.dispatchEvent(new Event('resize'));
}
beforeEach( () => {
    element = document.createElement( 'iframe' );

    document.body.style.width = '400px';
    document.body.appendChild( element );

    element.setAttribute( 'width', 200 );
    element.style.paddingLeft = '50px';
    element.style.paddingRight = '25px';
    element.style.borderLeft = '10px solid red';
    element.style.display = 'block';

    element.setAttribute( 'height', 100 );
} );

describe( 'IframeScaler', t => {

    describe( '#constructor()', () => {
        it('it has default options', function() {

            let scaler = new IframeScaler( element );

            assert.deepEqual( {
                upscale: false,
                auto: true,
                watch: false,
            }, scaler.options );

        });

        it('can set options when creating object', function() {
            let scaler = new IframeScaler( element, {
                upscale: true,
            } );

            assert.deepEqual( {
                upscale: true,

                auto: true,
                watch: false,
            }, scaler.options );
        });

        it('uses first parameter as option if element is not provided', function() {
            let scaler = new IframeScaler( {
                upscale: true,
            } );

            assert.deepEqual( {
                upscale: true,

                auto: true,
                watch: false,
            }, scaler.options );
        });

        it('resizes element if option auto is set to true', function() {
            let scaler = new IframeScaler( element, {
                upscale: true,
                auto: true,
            } );

            assert.equal( 'scale(2)', element.style.transform );
            assert.equal( '100px', element.style.marginBottom );

            resizeWindow();

            assert.equal( 'scale(2)', element.style.transform );
            assert.equal( '100px', element.style.marginBottom );

        });

        it('resizes and watching element if option watch is set to true', function() {
            let scaler = new IframeScaler( element, {
                upscale: true,
                watch: true,
            } );

            assert.equal( 'scale(2)', element.style.transform );
            assert.equal( '100px', element.style.marginBottom );

            resizeWindow();

            assert.equal( 'scale(1.5)', element.style.transform );
            assert.equal( '50px', element.style.marginBottom );

        });


    } );

    describe( '#getComputedSize()', () => {
        it( 'can get element actual inner size', () => {

            let test = IframeScaler.getComputedSize( element );
            assert.equal( 200, test.width );
            assert.equal( 100, test.height );

        } );
    } )

    describe( '#resizeHeight()', () => {
        it('adds negative margin to bottom when resizing element', function() {
            IframeScaler.resizeHeight( element, .5 );

            assert.equal( '-50px', element.style.marginBottom );
        });

        it('it adds "auto" when trying to upscale and upscale is set to false', function() {
            IframeScaler.resizeHeight( element, 1.5 );

            assert.equal( 'auto', element.style.marginBottom );
        });

        it('can upscale if upscale option is "true"', function() {
            IframeScaler.resizeHeight( element, 1.5, true );

            assert.equal( '50px', element.style.marginBottom );
        });
        
        
    });

    describe( '#calculatePercentage()', () => {
        it('calculates percentage of the element based on parent element', function() {

            let percentage = IframeScaler.calculatePercentage( element, true );

            assert.equal( 2, percentage, true );
        });

        it('will not ask for higher percentage than 1 if upscale is set to false', function() {

            let percentage = IframeScaler.calculatePercentage( element );

            assert.equal( 1, percentage );
        });
        
    } );

    describe( '#scaleIframe()', () => {
        it('it scaling iframe to parent', function() {
            let scaler = new IframeScaler( element, {
                auto: false,
                upscale: true,
            } );

            scaler.scaleIframe( element );

            assert.equal( 'scale(2)', element.style.transform );
            assert.equal( '100px', element.style.marginBottom );
        });
        
    } )

    describe( '#scale()', () => {
        it('scales iframe to parent', function() {
            let scaler = new IframeScaler( element, {
                auto: false,
                upscale: true,
            } );

            scaler.scale();

            assert.equal( 'scale(2)', element.style.transform );
            assert.equal( '100px', element.style.marginBottom );
        });
        
    } )

    describe( '#watch()', () => {
        it('resize first and watches for window change and resize iframe', function() {
            let scaler = new IframeScaler( element, {
                auto: false,
                upscale: true,
            } );

            scaler.watch();

            assert.equal( 'scale(2)', element.style.transform );
            assert.equal( '100px', element.style.marginBottom );

            resizeWindow();

            assert.equal( 'scale(1.5)', element.style.transform );
            assert.equal( '50px', element.style.marginBottom );
        });
        
    } )
} );

// import IframeScaler from './dist/index';

let element;
beforeEach( () => {
    element = document.createElement( 'iframe' );

    document.body.appendChild( element );

    element.setAttribute( 'width', 200 );
    element.style.paddingLeft = '50px';
    element.style.paddingRight = '25px';
    element.style.borderLeft = '10px solid red';
    element.style.display = 'block';

    element.setAttribute( 'height', 100 );
} );

describe( 'IframeScaler', t => {
    describe( '#getComputedSize()', () => {
        it( 'can get element actual inner size', () => {

            let scaler = new IframeScaler( {
                upscale: true,
            } );

            let test = scaler.getComputedSize( element );
            assert.equal( 200, test.width );
            assert.equal( 100, test.height );

        } );
    } )

    describe( '#resizeHeight()', () => {
        it('adds negative margin to bottom when resizing element', function() {

            let scaler = new IframeScaler( {
                upscale: true,
            } );

            scaler.resizeHeight( element, .5 );

            assert.equal( '-50px', element.style.marginBottom );
        });

        it('it adds auto when trying to upscale and upscale is set to false', function() {
            let scaler = new IframeScaler( {
                upscale: false,
            } );

            scaler.resizeHeight( element, 1.5 );

            assert.equal( 'auto', element.style.marginBottom );
        });
        
    })
} );

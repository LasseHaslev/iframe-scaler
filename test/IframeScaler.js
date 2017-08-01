// import IframeScaler from './dist/index';

let element;
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

            let scaler = new IframeScaler();

            assert.deepEqual( {
                parent: null,
                upscale: false,
            }, scaler.options );

        });

        it('can set options when creating object', function() {
            let scaler = new IframeScaler( element, {
                parent:null,
                upscale: true,
            } );

            assert.deepEqual( {
                parent: null,
                upscale: true,
            }, scaler.options );
        });

    } );

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
        
    });

    describe( '#calculatePercentage()', () => {
        it('calculates percentage of the element based on parent element', function() {

            let scaler = new IframeScaler( element, {
                upscale: true,
            } );

            let percentage = scaler.calculatePercentage( element );

            assert.equal( 2, percentage );
        });

        it('will not ask for higher percentage than 1 if upscale is set to false', function() {
            let scaler = new IframeScaler( element, {
                upscale: false,
            } );

            let percentage = scaler.calculatePercentage( element );

            assert.equal( 1, percentage );
        });
        
    } );
} );

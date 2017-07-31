import test from 'ava';
import IframeScaler from '../dist/index';
import BrowserEnv from 'browser-env';
BrowserEnv();

test( 'it has default options', t => {
    let scaler = new IframeScaler();

    t.deepEqual( scaler.options, {
        parent: null,
        upscale: false,
    } )
} );

test( 'it merges options', t => {
    let scaler = new IframeScaler( null, {
        upscale: true,
    } );

    t.deepEqual( scaler.options, {
        parent: null,
        upscale: true,
    } )
} );

// test( 'can get the actual inner size', t => {
    // let scaler = new IframeScaler( {
        // upscale: true,
    // } );

    // let element = document.createElement( 'div' );
    // element.style.width = 100 + 'px';
    // element.style.paddingLeft = 100 + 'px';
    // element.style.marginBottom = 100 + 'px';

    // document.body.appendChild( element );
    // console.log(document.body.innerHTML);

    // let test = scaler.getAcctualInnerSize( element );
    // console.log(test);
// } );

// test.only( 'it ads margin to compansate with height', t => {

    // let scaler = new IframeScaler( {
        // upscale: true,
    // } );

    // let element = document.createElement( 'div' );
    // element.style.marginBottom = 100 + 'px';

    // console.log(element.getAttribute( 'height' ));

    // scaler.resizeHeight( element, .5 );

    // t.is( element.style.marginBottom, '50px' );

// } );

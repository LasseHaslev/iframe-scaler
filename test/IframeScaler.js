import test from 'ava';
import IframeScaler from '../dist/index';

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

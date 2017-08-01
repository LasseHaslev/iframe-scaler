# @lassehaslev/iframe-scaler

## Install

### YARN

```bash
yarn add @lassehaslev/iframe-scaler
```

### NPM

```bash
npm install @lassehaslev/iframe-scaler --save-dev
```


## Usage

### Quick start

```js
var element = document.querySelector( '.your-element' );

// Scale once
var scaler = new IframeScaler( element, {
    upscale: true
} );

// Scale on window change
var scaler = new IframeScaler( element, {
    upscale: true,
    watch: true,
} );

// Hold scaling
var scaler = new IframeScaler( element, {
    upscale: true,
    auto: false,
} );

// When ready call scale
scaler.scale();
// or 
scaler.watch();
```


### Static methods

You almost never want to use the static methods, but here is a reference.
The `IframeScaler` has a set of useful static methods that `scale` and `watch` uses automatically.

#### `getComputedSize()`

```js
var size = IframeScaler.getComputedSize( element );
console.log( size.width );
console.log( size.height );
```

#### `resizeHeight()`

Checks the width of the element calculates the aspect ratio and adds this as margin to element (negative or positive).

```js
var percentage = .5;
var upscale = false;
IframeScaler.resizeHeight( element, percentage, upscale );
console.log( element.style.marginBottom );
```

#### `calculatePercentage()`

Get the height aspect percentage between the parent and the element.

```js
var upscale = true;
var percentage = IframeScaler.calculatePercentage( element, true );
console.log( percentage );
```

#### `scaleIframe()`

This is where the magic happens.

```js
var upscale = true;
IframeScaler.scaleIframe( element, upscale );
```

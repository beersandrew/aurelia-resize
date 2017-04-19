# aurelia-resize

an aurelia attribute add-on that detects DOM-element resize events either via window-change or CSS-animation.

![example](https://cloud.githubusercontent.com/assets/3584509/25091546/b16f97e6-2381-11e7-93ba-05cefe91c839.gif)

view:
```html
<window>
  <div style="background-color:#6bb329" resizeable resize.trigger="onContentResize($event.detail)"></div>
  <h2>width: ${width}</h2>
  <h2>height: ${height}</h2>
</window>
```
view-model: 
```js
onContentResize(x) {
  this.width = x.width;
  this.height = x.height;
}
```

## Dependencies
This plugin is a smaller wrapper around [element-resize-detector](https://www.npmjs.com/package/element-resize-detector). 

>Caveats:
> - If the element has position: static it will be changed to position: relative. Any unintentional top/right/bottom/left/z-index styles will therefore be applied and absolute positioned children will be positioned relative to the element.
> - A hidden element will be injected as a direct child to the element.


## Install (Aurelia CLI)

Install with npm:
```
npm install aurelia-resize --save
```

Add to your bundles: 

```
{
  "name": "aurelia-resize",
  "path": "../node_modules/aurelia-resize/dist/amd",
  "main": "index"
},
{
  "name": "element-resize-detector",
  "path": "../node_modules/element-resize-detector/dist",
  "main": "element-resize-detector"
}
```

## Install (JSPM)

jspm install npm:aurelia-resize

## Install (Webpack 2)

Install with npm:
```
npm install aurelia-resize --save
```

## Usage

Use the plug-in in your `main.js``
```javascript
export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .plugin('aurelia-resize');
```

in your view, add the `resizeable` attribute and bind to the `resize` event-handler

```html
<div resizeable resize.trigger="foo($event.detail)">
 ```

In your view-model, add an event handler:

```javascript
foo(detail){
    console.log("width=" + detail.width);
    console.log("height=" + detail.height);
    console.log("old width=" + detail.widthOld);
    console.log("old height=" + detail.heightOld);
}
```

you can also throttle, or debounce the events if you need to slow them down. 

```html
<div resizeable resize.trigger="foo($event.detail) & throttle:250">
<div resizeable resize.trigger="foo($event.detail) & debounce:500">
```

## Canvas 

one use of this is to resize a canvas so it fits a div: 

```html
<!--widget.html-->
<template>
  <require from="./widget.css"></require>
  <div id="host" resizeable resize.trigger="resize($event.detail) & throttle:500">
    <canvas ref=elmt></canvas>
  </div>
</template>
```

```ts
//widget.ts
@customElement("widget")
export class WidgetCustomElement {
  elmt:HTMLCanvasElement;
  resize(data){  
    this.elmt.width = data.width;
    this.elmt.height = data.height;
  }
}
```

```scss
//widget.scss
widget {
  div {
    padding: 0;
    margin: 0;
    display: block;
  }
  canvas {
    padding: 0;
    margin: 0;
    display: block;
  }
}
```



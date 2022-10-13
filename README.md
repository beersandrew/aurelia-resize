# @andybeersdev/aurelia-resize

forking of [aurelia-resize](https://github.com/MeirionHughes/aurelia-resize) in order to gain access to a custom version of element-resize-detector

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
This plugin is a smaller wrapper around [@andybeersdev/element-resize-detector](https://www.npmjs.com/package/@andybeersdev/element-resize-detector). 

>Caveats:
> - If the element has position: static it will be changed to position: relative. Any unintentional top/right/bottom/left/z-index styles will therefore be applied and absolute positioned children will be positioned relative to the element.
> - A hidden element will be injected as a direct child to the element.


## Install (Aurelia CLI)

Install with npm:
```
npm install @andybeersdev/aurelia-resize --save
```

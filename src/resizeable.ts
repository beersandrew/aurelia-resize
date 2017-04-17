/**
 * Aurelia-Resize
 * an aurelia attribute add-on that detects DOM-element resize events
 * either via window size change or CSS animation.
 * Meirion Hughes (github.com/MeirionHughes)
 **/
import * as erd from 'element-resize-detector';

export class ResizeableCustomAttribute {
  static inject = [Element];
  element: HTMLElement;
  callback;
  erd;

  constructor(element) {    
    this.element = element;
    this.erd = erd({ strategy: 'scroll' });    
  }

  bind() {
    var element = this.element;

    var widthOld = element.offsetWidth;
    var heightOld = element.offsetHeight;

    this.callback = (x) => {
      var event = new CustomEvent("resize", {
        detail: {
          width: this.element.offsetWidth,
          height: this.element.offsetHeight,
          widthOld: widthOld,
          heightOld: heightOld
        }
      });
      this.element.dispatchEvent(event);
      widthOld = this.element.offsetWidth;
      heightOld = this.element.offsetHeight;
    };

    this.erd.listenTo(this.element, this.callback);
  }

  unbind() {
    if (this.callback) {
      this.erd.uninstall(this.element);
      this.callback = null;
    }
  }
}

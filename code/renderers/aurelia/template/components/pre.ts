import { customElement, bindable } from 'aurelia';

@customElement({
  name: 'storybook-pre',
  template: `<pre data-testid="pre" style.bind="style">\${finalText}</pre>`,
})
export default class Pre {
  /**
   * Styles to apply to the component
   */
  @bindable()
  style?: object;

  /**
   * An object to render
   */
  @bindable()
  object?: object;

  /**
   * The code to render
   */
  @bindable()
  text?: string;

  get finalText() {
    return this.object ? JSON.stringify(this.object, null, 2) : this.text;
  }
}

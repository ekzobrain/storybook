import { customElement, bindable } from 'aurelia';
import './button.css';

@customElement({
  name: 'storybook-button',
  template: `<button
    type="button"
    click.trigger="onClick($event)"
    class.bind="classes"
    style.bind="{ backgroundColor: backgroundColor }"
  >
    \${label}
  </button>`,
})
export default class Button {
  /**
   * Is this the principal call to action on the page?
   */
  @bindable({ set: (val) => val === '' || val === true || val === 'true' })
  primary = false;

  /**
   * What background color to use
   */
  @bindable()
  backgroundColor?: string;

  /**
   * How large should the button be?
   */
  @bindable()
  size: 'small' | 'medium' | 'large' = 'medium';

  /**
   * Button contents
   *
   * @required
   */
  @bindable()
  label = 'Button';

  /**
   * Optional click handler
   */
  @bindable()
  onClick = () => {};

  get classes(): string {
    const mode = this.primary ? 'storybook-button--primary' : 'storybook-button--secondary';

    return ['storybook-button', `storybook-button--${this.size}`, mode].join(' ');
  }
}

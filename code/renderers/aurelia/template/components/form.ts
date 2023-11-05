import { customElement, bindable } from 'aurelia';

@customElement({
  name: 'storybook-form',
  template: `
    <form id="interaction-test-form" submit.bind="handleSubmit">
      <label>
        Enter Value
        <input type="text" data-testid="value" value.bind="value" required />
      </label>
      <button type="submit">Submit</button>
      <p if.bind="complete">Completed!!</p>
    </form>
  `,
})
export default class Form {
  /**
   * Optional success handler
   */
  @bindable()
  onSuccess = (value: string) => {};

  value = '';

  complete = false;

  handleSubmit = (event: SubmitEvent) => {
    event.preventDefault();
    this.onSuccess(this.value);
    setTimeout(() => {
      this.complete = true;
    }, 500);
    setTimeout(() => {
      this.complete = false;
    }, 1500);
  };
}

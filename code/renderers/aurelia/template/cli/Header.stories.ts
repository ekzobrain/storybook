import type { Meta, StoryObj } from '@storybook/aurelia';
import Header from './header';

const meta: Meta<Header> = {
  title: 'Example/Header',
  component: Header,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/7.0/aurelia/writing-docs/docs-page
  tags: ['autodocs'],
  render: (args) => ({ props: args }),
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/7.0/aurelia/configure/story-layout
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<Header>;

export const LoggedIn: Story = {
  args: {
    user: {
      name: 'Jane Doe',
    },
  },
};

export const LoggedOut: Story = {};

import type { RenderContext, ArgsStoryFn } from '@storybook/types';

import { createAureliaApp } from './aurelia';
import type { AureliaRenderer, AureliaApp } from './types';

const appMap = new Map<AureliaRenderer['canvasElement'], AureliaApp>();

async function teardown(element: AureliaRenderer['canvasElement']) {
  if (appMap.has(element)) {
    await appMap.get(element)?.stop();
    appMap.delete(element);
  }
}

export async function renderToCanvas(
  {
    storyFn,
    title,
    name,
    showMain,
    showError,
    storyContext: { parameters, component },
    forceRemount,
  }: RenderContext<AureliaRenderer>,
  canvasElement: AureliaRenderer['canvasElement']
) {
  let app = appMap.get(canvasElement);

  const story = storyFn();

  if (!story) {
    showError({
      title: `Expecting an Aurelia component from the story: "${name}" of "${title}".`,
      description: `
        Did you forget to return the Aurelia component from the story?
        Use "() => ({ template: '<custom-component></custom-component>' })" when defining the story.
      `,
    });
  } else {
    showMain();

    if (!app || forceRemount) {
      if (forceRemount) {
        await teardown(canvasElement);
      }

      app = createAureliaApp(
        story,
        { ...parameters.args, ...story.props },
        canvasElement,
        component
      );
      await app.start();

      appMap.set(canvasElement, app);
    } else {
      Object.assign(app.root.controller.viewModel, story.props);
    }
  }

  // teardown the component when the story changes
  return () => {
    teardown(canvasElement);
  };
}

export const render: ArgsStoryFn<AureliaRenderer> = (args, context) => {
  const { id, component: Component } = context;
  if (!Component) {
    throw new Error(
      `Unable to render story ${id} as the component annotation is missing from the default export`
    );
  }

  return { Component, props: args };
};

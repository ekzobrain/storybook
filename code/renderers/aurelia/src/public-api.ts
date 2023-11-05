import type { Addon_ClientStoryApi, Addon_Loadable } from '@storybook/types';
import type { App } from 'vue';
import { start } from '@storybook/preview-api';

import type { AureliaRenderer } from './types';
// import { decorateStory } from './decorateStory';

import { render, renderToCanvas } from './render';

const FRAMEWORK = 'aurelia';

interface ClientApi extends Addon_ClientStoryApi<AureliaRenderer['storyResult']> {
  configure(loader: Addon_Loadable, module: NodeModule): void;
  forceReRender(): void;
  raw: () => any; // todo add type
  load: (...args: any[]) => void;
  app: App;
}

// const api = start<AureliaRenderer>(renderToCanvas, { decorateStory, render });
const api = start<AureliaRenderer>(renderToCanvas, { render });

export const storiesOf: ClientApi['storiesOf'] = (kind, m) => {
  return (api.clientApi.storiesOf(kind, m) as ReturnType<ClientApi['storiesOf']>).addParameters({
    framework: FRAMEWORK,
  });
};

export const configure: ClientApi['configure'] = (...args) => api.configure(FRAMEWORK, ...args);
export const { forceReRender } = api;
export const { raw } = api.clientApi;

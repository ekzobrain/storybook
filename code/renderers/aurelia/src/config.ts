import { parameters as docsParams } from './docs/config';

export const parameters = { framework: 'aurelia' as const, ...docsParams };
export { argTypesEnhancers } from './docs/config';

export { render, renderToCanvas } from './render';
// export { decorateStory as applyDecorators } from './decorateStory';

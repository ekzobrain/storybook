import type { StoryContext as StoryContextBase, WebRenderer } from '@storybook/types';
import type {
  IRegistry,
  IContainer,
  Constructable,
  ICustomElementViewModel,
  Aurelia,
} from 'aurelia';

export type { RenderContext } from '@storybook/types';

export interface ICollection {
  [p: string]: any;
}

export type StoryFnAureliaReturnType = {
  components?: ICustomElementViewModel[];
  props?: ICollection;
  template?: string;
  items?: IRegistry[];
  container?: IContainer;
  innerHtml?: string;
};

export type StoryContext = StoryContextBase<AureliaRenderer>;

export interface AureliaRenderer extends WebRenderer {
  component: ICustomElementViewModel & Constructable;
  storyResult: StoryFnAureliaReturnType;
}

export type AureliaApp = Omit<Aurelia, 'register' | 'app' | 'enhance'>;

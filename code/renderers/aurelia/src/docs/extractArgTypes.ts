import type { StrictArgTypes } from '@storybook/types';
import type { ArgTypesExtractor } from '@storybook/docs-tools';
import {
  getComponentBindables,
  getComponentAstData,
  getPropertyType,
  getTypeFromValue,
} from './metadata';

const shouldEncode = (obj: any) => obj?.toString() === '[object Object]' || Array.isArray(obj);

export const extractArgTypes: ArgTypesExtractor = (component) => {
  if (component) {
    const bindables = getComponentBindables(component);
    const astData = getComponentAstData(
      component,
      bindables.map((bindable) => bindable.property)
    );

    return bindables.reduce((acc: StrictArgTypes, bindable) => {
      // get all available metadata
      const tsType = getPropertyType(component, bindable.property);
      const propAstData = astData[bindable.property] || ({} as any);

      // get default value
      const { defaultValue } = propAstData;

      // determine data type
      let type = tsType;
      if (type === 'object' && defaultValue !== undefined) {
        type = getTypeFromValue(defaultValue);
      }

      // determine appropriate control or action
      const control =
        type && type !== 'function'
          ? {
              type: type === 'string' ? 'text' : type,
            }
          : undefined;

      acc[bindable.property] = {
        name: bindable.attribute,
        control,
        table: {
          type: type ? { summary: type } : undefined,
          defaultValue:
            defaultValue !== undefined
              ? {
                  summary: shouldEncode(defaultValue) ? JSON.stringify(defaultValue) : defaultValue,
                }
              : undefined,
        },
      };

      return acc;
    }, {});
  }

  return null;
};

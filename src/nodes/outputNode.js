import { createNode } from './base/createNode';

export const OutputNode = createNode({
  title: 'Output',
  variant: 'output',
  fields: [
    {
      key: 'outputName',
      label: 'Name',
      type: 'text',
      defaultValue: (id) => id.replace('customOutput-', 'output_'),
    },
    {
      key: 'outputType',
      label: 'Type',
      type: 'select',
      options: ['Text', 'Image'],
      defaultValue: 'Text',
    },
  ],
  handles: [{ type: 'target', position: 'left', id: 'value' }],
});

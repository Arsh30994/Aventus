import { createNode } from './base/createNode';

export const InputNode = createNode({
  title: 'Input',
  variant: 'input',
  fields: [
    {
      key: 'inputName',
      label: 'Name',
      type: 'text',
      defaultValue: (id) => id.replace('customInput-', 'input_'),
    },
    {
      key: 'inputType',
      label: 'Type',
      type: 'select',
      options: ['Text', 'File'],
      defaultValue: 'Text',
    },
  ],
  handles: [{ type: 'source', position: 'right', id: 'value' }],
});

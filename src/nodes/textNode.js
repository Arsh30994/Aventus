import { createNode } from './base/createNode';
import { TextNodeBody } from './TextNodeBody';
import {
  DEFAULT_TEXT,
  buildVariableHandles,
  computeTextNodeSize,
} from './textNodeUtils';

export const TextNode = createNode({
  title: 'Text',
  description: 'Define variables using {{ variableName }} syntax.',
  style: (id, data) => {
    const text = data?.text ?? DEFAULT_TEXT;
    const size = computeTextNodeSize(text);
    return {
      '--node-max-width': 'none',
      width: data?.nodeWidth ?? size.nodeWidth,
      minHeight: data?.nodeHeight ?? size.nodeHeight,
    };
  },
  render: ({ id, data }) => <TextNodeBody id={id} data={data} />,
  handles: (id, data) => {
    const text = data?.text ?? DEFAULT_TEXT;
    const size = computeTextNodeSize(text);
    return [
      ...buildVariableHandles(size.variables),
      { type: 'source', position: 'right', id: 'output' },
    ];
  },
});

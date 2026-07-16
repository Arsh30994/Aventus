import { createNode } from './base/createNode';

export const LLMNode = createNode({
  title: 'LLM',
  variant: 'llm',
  description: 'Runs a language model on connected inputs.',
  handles: [
    { type: 'target', position: 'left', id: 'system', style: { top: '33%' } },
    { type: 'target', position: 'left', id: 'prompt', style: { top: '66%' } },
    { type: 'source', position: 'right', id: 'response' },
  ],
});

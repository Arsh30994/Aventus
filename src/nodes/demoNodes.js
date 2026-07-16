import { createNode } from './base/createNode';

/** Filter — single input/output with a configurable condition field */
export const FilterNode = createNode({
  title: 'Filter',
  variant: 'filter',
  description: 'Pass through values that match a condition.',
  fields: [
    {
      key: 'condition',
      label: 'Condition',
      type: 'text',
      placeholder: 'e.g. length > 10',
      defaultValue: 'value != null',
    },
  ],
  handles: [
    { type: 'target', position: 'left', id: 'input' },
    { type: 'source', position: 'right', id: 'output' },
  ],
});

/** Delay — configurable wait time between pipeline steps */
export const DelayNode = createNode({
  title: 'Delay',
  variant: 'delay',
  description: 'Wait before forwarding data.',
  fields: [
    {
      key: 'milliseconds',
      label: 'Delay (ms)',
      type: 'number',
      defaultValue: '1000',
      min: 0,
    },
  ],
  handles: [
    { type: 'target', position: 'left', id: 'input' },
    { type: 'source', position: 'right', id: 'output' },
  ],
});

/** Merge — multiple inputs, one combined output (handles only, no fields) */
export const MergeNode = createNode({
  title: 'Merge',
  variant: 'merge',
  description: 'Combines two streams into one output.',
  handles: [
    { type: 'target', position: 'left', id: 'a', style: { top: '33%' } },
    { type: 'target', position: 'left', id: 'b', style: { top: '66%' } },
    { type: 'source', position: 'right', id: 'merged' },
  ],
});

/** Conditional — branches into true/false outputs based on an expression */
export const ConditionalNode = createNode({
  title: 'Conditional',
  variant: 'conditional',
  description: 'Route data based on a boolean expression.',
  fields: [
    {
      key: 'expression',
      label: 'Expression',
      type: 'text',
      placeholder: 'e.g. score >= 0.5',
      defaultValue: 'true',
    },
  ],
  handles: [
    { type: 'target', position: 'left', id: 'input' },
    { type: 'source', position: 'right', id: 'true', style: { top: '33%' } },
    { type: 'source', position: 'right', id: 'false', style: { top: '66%' } },
  ],
});

/** Note — documentation node with no connections */
export const NoteNode = createNode({
  title: 'Note',
  variant: 'note',
  fields: [
    {
      key: 'content',
      label: 'Notes',
      type: 'textarea',
      rows: 3,
      defaultValue: 'Add pipeline notes here…',
    },
  ],
  style: { minWidth: 180, maxWidth: 240 },
});

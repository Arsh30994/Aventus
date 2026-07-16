/**
 * ─── Node Registry ────────────────────────────────────────────────────────
 *
 * Single source of truth for every node in the pipeline builder.
 *
 * To add a new node, push ONE object into `definitions` below.
 * Everything else — React Flow nodeTypes map, toolbar sections,
 * MiniMap colors, palette items — is derived automatically.
 *
 * No other file needs to be touched.
 * ──────────────────────────────────────────────────────────────────────────
 */

import { createNode } from './base/createNode';
import { TextNodeBody } from './TextNodeBody';
import {
  DEFAULT_TEXT,
  buildVariableHandles,
  computeTextNodeSize,
} from './textNodeUtils';

/* ── Section metadata (controls toolbar ordering & labels) ── */

const SECTIONS = [
  { key: 'core',   label: 'Core' },
  { key: 'logic',  label: 'Logic & Flow' },
  { key: 'custom', label: 'Custom' },
];

/* ── Node definitions ─────────────────────────────────────── */

const definitions = [

  // ━━━━━━━━━━━━━━━━━━━━━━━━  CORE  ━━━━━━━━━━━━━━━━━━━━━━━━
  {
    type: 'customInput',
    label: 'Input',
    icon: '↓',
    section: 'core',
    color: '#60a5fa',
    config: {
      title: 'Input',
      description: 'Receive data into the pipeline.',
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
    },
  },
  {
    type: 'llm',
    label: 'LLM',
    icon: '✦',
    section: 'core',
    color: '#c084fc',
    config: {
      title: 'LLM',
      description: 'Runs a language model on connected inputs.',
      handles: [
        { type: 'target', position: 'left', id: 'system', style: { top: '33%' } },
        { type: 'target', position: 'left', id: 'prompt', style: { top: '66%' } },
        { type: 'source', position: 'right', id: 'response' },
      ],
    },
  },
  {
    type: 'customOutput',
    label: 'Output',
    icon: '↑',
    section: 'core',
    color: '#4ade80',
    config: {
      title: 'Output',
      description: 'Send processed data out of the pipeline.',
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
    },
  },
  {
    type: 'text',
    label: 'Text',
    icon: 'T',
    section: 'core',
    color: '#fbbf24',
    config: {
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
    },
  },

  // ━━━━━━━━━━━━━━━━━━━━━  LOGIC & FLOW  ━━━━━━━━━━━━━━━━━━━
  {
    type: 'filter',
    label: 'Filter',
    icon: '⧩',
    section: 'logic',
    color: '#22d3ee',
    config: {
      title: 'Filter',
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
    },
  },
  {
    type: 'delay',
    label: 'Delay',
    icon: '⏱',
    section: 'logic',
    color: '#f472b6',
    config: {
      title: 'Delay',
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
    },
  },
  {
    type: 'merge',
    label: 'Merge',
    icon: '⊕',
    section: 'logic',
    color: '#a78bfa',
    config: {
      title: 'Merge',
      description: 'Combines two streams into one output.',
      handles: [
        { type: 'target', position: 'left', id: 'a', style: { top: '33%' } },
        { type: 'target', position: 'left', id: 'b', style: { top: '66%' } },
        { type: 'source', position: 'right', id: 'merged' },
      ],
    },
  },
  {
    type: 'conditional',
    label: 'Conditional',
    icon: '⑂',
    section: 'logic',
    color: '#facc15',
    config: {
      title: 'Conditional',
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
    },
  },
  {
    type: 'note',
    label: 'Note',
    icon: '✎',
    section: 'logic',
    color: '#94a3b8',
    config: {
      title: 'Note',
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
    },
  },

  // ━━━━━━━━━━━━━━━━━━━━  CUSTOM (5 new) ━━━━━━━━━━━━━━━━━━━

  /** API Request — configure HTTP calls with method, URL, and auth */
  {
    type: 'apiRequest',
    label: 'API Request',
    icon: '⇄',
    section: 'custom',
    color: '#f97316',
    config: {
      title: 'API Request',
      description: 'Send an HTTP request to an external endpoint.',
      fields: [
        {
          key: 'method',
          label: 'Method',
          type: 'select',
          options: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
          defaultValue: 'GET',
        },
        {
          key: 'url',
          label: 'URL',
          type: 'text',
          placeholder: 'https://api.example.com/data',
        },
        {
          key: 'headers',
          label: 'Headers',
          type: 'textarea',
          rows: 2,
          placeholder: 'Authorization: Bearer ...',
        },
      ],
      handles: [
        { type: 'target', position: 'left', id: 'request' },
        { type: 'source', position: 'right', id: 'response' },
      ],
    },
  },

  /** Math Transform — apply arithmetic operations to numeric data */
  {
    type: 'mathTransform',
    label: 'Math',
    icon: 'Σ',
    section: 'custom',
    color: '#14b8a6',
    config: {
      title: 'Math Transform',
      description: 'Apply a math operation to numeric values.',
      fields: [
        {
          key: 'operation',
          label: 'Operation',
          type: 'select',
          options: [
            { value: 'add', label: 'Add (+)' },
            { value: 'subtract', label: 'Subtract (−)' },
            { value: 'multiply', label: 'Multiply (×)' },
            { value: 'divide', label: 'Divide (÷)' },
            { value: 'modulo', label: 'Modulo (%)' },
          ],
          defaultValue: 'add',
        },
        {
          key: 'operand',
          label: 'Operand',
          type: 'number',
          defaultValue: '0',
        },
      ],
      handles: [
        { type: 'target', position: 'left', id: 'input' },
        { type: 'source', position: 'right', id: 'result' },
      ],
    },
  },

  /** Sentiment Analyzer — classify text polarity with a threshold slider */
  {
    type: 'sentiment',
    label: 'Sentiment',
    icon: '♡',
    section: 'custom',
    color: '#ec4899',
    config: {
      title: 'Sentiment',
      description: 'Classify text into positive or negative.',
      fields: [
        {
          key: 'threshold',
          label: 'Threshold',
          type: 'range',
          min: 0,
          max: 1,
          step: 0.05,
          defaultValue: 0.5,
        },
        {
          key: 'model',
          label: 'Model',
          type: 'select',
          options: ['distilbert', 'roberta', 'vader'],
          defaultValue: 'distilbert',
        },
      ],
      handles: [
        { type: 'target', position: 'left', id: 'text' },
        { type: 'source', position: 'right', id: 'positive', style: { top: '33%' } },
        { type: 'source', position: 'right', id: 'negative', style: { top: '66%' } },
      ],
    },
  },

  /** Data Logger — log pipeline data with configurable options */
  {
    type: 'dataLogger',
    label: 'Logger',
    icon: '◉',
    section: 'custom',
    color: '#8b5cf6',
    config: {
      title: 'Data Logger',
      description: 'Inspect and log pipeline data.',
      fields: [
        {
          key: 'logLevel',
          label: 'Level',
          type: 'select',
          options: [
            { value: 'debug', label: '🔍 Debug' },
            { value: 'info', label: 'ℹ️ Info' },
            { value: 'warn', label: '⚠️ Warn' },
            { value: 'error', label: '🛑 Error' },
          ],
          defaultValue: 'info',
        },
        {
          key: 'timestamp',
          label: 'Include Timestamp',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          key: 'format',
          label: 'Format',
          type: 'select',
          options: ['JSON', 'CSV', 'Plain Text'],
          defaultValue: 'JSON',
        },
      ],
      handles: [
        { type: 'target', position: 'left', id: 'input' },
        { type: 'source', position: 'right', id: 'passthrough' },
      ],
    },
  },

  /** Color Tagger — tag data with a visual color label */
  {
    type: 'colorTagger',
    label: 'Color Tag',
    icon: '◆',
    section: 'custom',
    color: '#06b6d4',
    config: {
      title: 'Color Tagger',
      description: 'Attach a color label to pipeline data.',
      fields: [
        {
          key: 'tagColor',
          label: 'Tag Color',
          type: 'color',
          defaultValue: '#818cf8',
        },
        {
          key: 'tagName',
          label: 'Tag Name',
          type: 'text',
          defaultValue: 'tag-1',
          placeholder: 'e.g. priority',
        },
      ],
      handles: [
        { type: 'target', position: 'left', id: 'input' },
        { type: 'source', position: 'right', id: 'tagged' },
      ],
    },
  },
];

/* ── Derived exports ──────────────────────────────────────── */

/**
 * React Flow `nodeTypes` map — built once at module init.
 * Each entry's component is produced by `createNode`.
 */
export const nodeTypes = Object.fromEntries(
  definitions.map((def) => [
    def.type,
    createNode({
      ...def.config,
      color: def.color,
      icon: def.icon,
    }),
  ])
);

/**
 * Look up the accent color for a node type (used by MiniMap).
 */
export const getNodeColor = (type) => {
  const def = definitions.find((d) => d.type === type);
  return def?.color ?? '#64748b';
};

/**
 * Returns toolbar sections with their node entries, in display order.
 * Each section: { key, label, nodes: [{ type, label, icon, color }] }
 */
export const getToolbarSections = () => {
  const grouped = {};
  definitions.forEach((def) => {
    if (!grouped[def.section]) grouped[def.section] = [];
    grouped[def.section].push({
      type: def.type,
      label: def.label,
      icon: def.icon,
      color: def.color,
    });
  });

  return SECTIONS
    .filter((sec) => grouped[sec.key])
    .map((sec) => ({
      key: sec.key,
      label: sec.label,
      nodes: grouped[sec.key],
    }));
};

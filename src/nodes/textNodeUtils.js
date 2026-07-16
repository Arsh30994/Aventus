/** Regex for valid JS identifiers inside {{ ... }} */
const VARIABLE_PATTERN = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;

export const DEFAULT_TEXT = '{{input}}';

export const MIN_NODE_WIDTH = 200;
export const MAX_NODE_WIDTH = 560;
export const MIN_TEXTAREA_HEIGHT = 52;
export const MAX_TEXTAREA_HEIGHT = 320;

const TEXTAREA_FONT = '500 11px "JetBrains Mono", ui-monospace, monospace';
const NODE_HORIZONTAL_PADDING = 56; // label + body padding
const NODE_VERTICAL_CHROME = 88; // header + label + body padding + description

/**
 * Extract unique valid JavaScript variable names from {{ varName }} syntax.
 */
export const parseTextVariables = (text) => {
  const source = text ?? '';
  const matches = [...source.matchAll(VARIABLE_PATTERN)];
  return Array.from(new Set(matches.map((match) => match[1])));
};

/**
 * Measure rendered text width using canvas (matches monospace textarea font).
 */
const measureLineWidth = (line) => {
  if (typeof document === 'undefined') {
    return line.length * 7;
  }

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  ctx.font = TEXTAREA_FONT;
  return ctx.measureText(line || ' ').width;
};

/**
 * Compute textarea and node dimensions from text content.
 */
const VARIABLE_TAGS_HEIGHT = 28;

export const computeTextNodeSize = (text) => {
  const content = text ?? DEFAULT_TEXT;
  const variables = parseTextVariables(content);
  const lines = content.split('\n');
  const longestLine = lines.reduce(
    (max, line) => Math.max(max, measureLineWidth(line)),
    measureLineWidth(' ')
  );

  const textareaWidth = Math.ceil(
    Math.max(140, Math.min(MAX_NODE_WIDTH - NODE_HORIZONTAL_PADDING, longestLine + 20))
  );
  const textareaHeight = Math.ceil(
    Math.max(MIN_TEXTAREA_HEIGHT, Math.min(MAX_TEXTAREA_HEIGHT, lines.length * 18 + 16))
  );
  const nodeWidth = Math.ceil(
    Math.max(MIN_NODE_WIDTH, Math.min(MAX_NODE_WIDTH, textareaWidth + NODE_HORIZONTAL_PADDING))
  );
  const variablesChrome = variables.length > 0 ? VARIABLE_TAGS_HEIGHT : 0;
  const nodeHeight = textareaHeight + NODE_VERTICAL_CHROME + variablesChrome;

  return { textareaWidth, textareaHeight, nodeWidth, nodeHeight, variables };
};

/**
 * Build left-side target handles for each parsed variable.
 */
export const buildVariableHandles = (variables) =>
  variables.map((varName, index) => {
    const count = variables.length;
    const topPosition = count === 1 ? '50%' : `${((index + 1) * 100) / (count + 1)}%`;

    return {
      type: 'target',
      position: 'left',
      id: varName,
      style: { top: topPosition },
    };
  });

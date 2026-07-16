import { useRef, useLayoutEffect, useCallback } from 'react';
import { useStore } from '../store';
import {
  DEFAULT_TEXT,
  MIN_TEXTAREA_HEIGHT,
  MAX_TEXTAREA_HEIGHT,
  computeTextNodeSize,
} from './textNodeUtils';

export const TextNodeBody = ({ id, data }) => {
  const updateNodeData = useStore((state) => state.updateNodeData);
  const textareaRef = useRef(null);

  const text = data?.text ?? DEFAULT_TEXT;
  const { textareaWidth, textareaHeight, variables } = computeTextNodeSize(text);

  const syncDimensions = useCallback(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.style.height = 'auto';
    const measuredHeight = Math.ceil(
      Math.max(MIN_TEXTAREA_HEIGHT, Math.min(MAX_TEXTAREA_HEIGHT, textarea.scrollHeight))
    );

    const size = computeTextNodeSize(text);
    const nextHeight = Math.max(size.textareaHeight, measuredHeight);
    const nextNodeHeight = nextHeight + (size.nodeHeight - size.textareaHeight);

    if (
      data?.textareaHeight !== nextHeight ||
      data?.nodeWidth !== size.nodeWidth ||
      data?.nodeHeight !== nextNodeHeight
    ) {
      updateNodeData(id, {
        textareaHeight: nextHeight,
        nodeWidth: size.nodeWidth,
        nodeHeight: nextNodeHeight,
      });
    }
  }, [data?.nodeHeight, data?.nodeWidth, data?.textareaHeight, id, text, updateNodeData]);

  useLayoutEffect(() => {
    syncDimensions();
  }, [syncDimensions]);

  const handleChange = (event) => {
    const value = event.target.value;
    const size = computeTextNodeSize(value);

    updateNodeData(id, {
      text: value,
      textareaHeight: size.textareaHeight,
      nodeWidth: size.nodeWidth,
      nodeHeight: size.nodeHeight,
    });
  };

  return (
    <div className="node__field node__field--text">
      <label htmlFor={`${id}-text`}>Text</label>
      <textarea
        ref={textareaRef}
        id={`${id}-text`}
        className="node__textarea--auto"
        value={text}
        onChange={handleChange}
        rows={1}
        spellCheck={false}
        style={{
          width: `${textareaWidth}px`,
          height: `${data?.textareaHeight ?? textareaHeight}px`,
        }}
      />
      {variables.length > 0 && (
        <div className="node__variables" aria-label="Detected variables">
          {variables.map((name) => (
            <span key={name} className="node__variable-tag">{`{{${name}}}`}</span>
          ))}
        </div>
      )}
    </div>
  );
};

import { BaseNode } from './BaseNode';
import { NodeFields } from './NodeFields';

/**
 * Factory for pipeline nodes. Pass a config object to get a React Flow node component.
 *
 * @param {Object} config
 * @param {string} config.title     - Header label shown on the node
 * @param {string} [config.color]   - Accent color (hex). Drives borders, glow, handles.
 * @param {string} [config.icon]    - Emoji or character shown in the header icon badge.
 * @param {string} [config.description] - Optional subtitle in the body
 * @param {Array}  [config.fields]  - Form fields rendered via NodeFields
 * @param {Array}  [config.handles] - Connection handles ({ type, position, id, style? })
 * @param {Function} [config.render] - Custom body renderer: ({ id, data }) => ReactNode
 * @param {Object}   [config.style]  - Inline styles on the node container
 */
export const createNode = ({
  title,
  color,
  icon,
  description,
  fields = [],
  handles = [],
  render,
  style,
}) => {
  const NodeComponent = ({ id, data }) => {
    const computedHandles = typeof handles === 'function' ? handles(id, data) : handles;
    const computedStyle = typeof style === 'function' ? style(id, data) : style;

    return (
      <BaseNode
        id={id}
        title={title}
        color={color}
        icon={icon}
        handles={computedHandles}
        description={description}
        style={computedStyle}
      >
        {render ? render({ id, data }) : <NodeFields id={id} data={data} fields={fields} />}
      </BaseNode>
    );
  };

  NodeComponent.displayName = `${title.replace(/\s+/g, '')}Node`;
  return NodeComponent;
};

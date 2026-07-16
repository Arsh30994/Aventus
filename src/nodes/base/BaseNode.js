import { Handle, Position } from 'reactflow';
import './nodeStyles.css';
import '../../styles/theme.css';

const POSITION_MAP = {
  left: Position.Left,
  right: Position.Right,
  top: Position.Top,
  bottom: Position.Bottom,
};

export const BaseNode = ({
  id,
  title,
  color,
  icon,
  handles = [],
  description,
  children,
  style,
}) => {
  const nodeStyle = {
    '--node-accent': color || '#64748b',
    ...style,
  };

  const hasIcon = !!icon;

  return (
    <div className="node" style={nodeStyle}>
      {handles.map((handle) => (
        <Handle
          key={handle.id}
          type={handle.type}
          position={POSITION_MAP[handle.position] ?? Position.Right}
          id={`${id}-${handle.id}`}
          style={handle.style}
          className="node-handle"
        />
      ))}

      <div className={`node__header${hasIcon ? ' node__header--has-icon' : ''}`}>
        {hasIcon && (
          <span className="node__header-icon" aria-hidden="true">
            {icon}
          </span>
        )}
        <span className="node__header-title">{title}</span>
      </div>

      <div className="node__body">
        {description && <div className="node__description">{description}</div>}
        {children}
      </div>
    </div>
  );
};

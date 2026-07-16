// draggableNode.js

export const DraggableNode = ({ type, label, icon, color }) => {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType };
    event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      className="palette-node"
      style={{ '--palette-color': color }}
      onDragStart={(event) => onDragStart(event, type)}
      draggable
    >
      <span className="palette-node__icon" aria-hidden="true">{icon}</span>
      <span className="palette-node__label">{label}</span>
    </div>
  );
};

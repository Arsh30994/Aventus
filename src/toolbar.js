// toolbar.js
// Reads sections and nodes directly from the registry.

import { DraggableNode } from './draggableNode';
import { getToolbarSections } from './nodes/registry';

const sections = getToolbarSections();

export const PipelineToolbar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar__header">
        <div className="sidebar__logo" aria-hidden="true">⚡</div>
        <div className="sidebar__title">Node Palette</div>
      </div>

      {sections.map((section) => (
        <div key={section.key} className="sidebar__section">
          <div className="sidebar__section-label">{section.label}</div>
          <div className="sidebar__nodes">
            {section.nodes.map((node) => (
              <DraggableNode key={node.type} {...node} />
            ))}
          </div>
        </div>
      ))}
    </aside>
  );
};

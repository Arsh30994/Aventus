import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';
import './styles/app.css';

function App() {
  return (
    <div className="app">
      <header className="app__header">
        <div className="app__brand">
          <div className="app__logo" aria-hidden="true">⚡</div>
          <div className="app__brand-text">
            <span className="app__title">Pipeline Builder</span>
            <span className="app__subtitle">Visual workflow editor</span>
          </div>
        </div>
        <span className="app__header-hint">Drag nodes onto the canvas to build your pipeline</span>
      </header>

      <div className="app__body">
        <PipelineToolbar />
        <PipelineUI />
      </div>

      <footer className="app__footer">
        <SubmitButton />
      </footer>
    </div>
  );
}

export default App;

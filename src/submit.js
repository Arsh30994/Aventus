import { useState } from 'react';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import { ResultModal } from './ResultModal';

export const SubmitButton = () => {
  const { nodes, edges } = useStore(
    (state) => ({ nodes: state.nodes, edges: state.edges }),
    shallow
  );

  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('http://localhost:8000/pipelines/parse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nodes, edges }),
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data = await response.json();
      setResult(data);
      setModalOpen(true);
    } catch (err) {
      setError(err.message);
      setModalOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    setResult(null);
    setError(null);
  };

  return (
    <>
      <button
        type="button"
        className={`submit-btn${loading ? ' submit-btn--loading' : ''}`}
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? (
          <span className="submit-btn__spinner" aria-hidden="true" />
        ) : (
          <span className="submit-btn__icon" aria-hidden="true">▶</span>
        )}
        {loading ? 'Analyzing…' : 'Submit Pipeline'}
      </button>

      <ResultModal
        open={modalOpen}
        onClose={closeModal}
        result={result}
        error={error}
      />
    </>
  );
};

import { useEffect } from 'react';

export const ResultModal = ({ open, onClose, result, error }) => {
  useEffect(() => {
    if (!open) return undefined;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const isError = !!error;

  return (
    <div className="modal-overlay" onClick={onClose} role="presentation">
      <div
        className={`modal ${isError ? 'modal--error' : ''}`}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="modal__header">
          <div className={`modal__icon ${isError ? 'modal__icon--error' : 'modal__icon--success'}`}>
            {isError ? '✕' : '✓'}
          </div>
          <h2 id="modal-title" className="modal__title">
            {isError ? 'Submission Failed' : 'Pipeline Analysis'}
          </h2>
        </div>

        <div className="modal__body">
          {isError ? (
            <p className="modal__error-text">{error}</p>
          ) : (
            <div className="modal__stats">
              <div className="modal__stat">
                <span className="modal__stat-value">{result.num_nodes}</span>
                <span className="modal__stat-label">Nodes</span>
              </div>
              <div className="modal__stat-divider" />
              <div className="modal__stat">
                <span className="modal__stat-value">{result.num_edges}</span>
                <span className="modal__stat-label">Edges</span>
              </div>
              <div className="modal__stat-divider" />
              <div className="modal__stat">
                <span className={`modal__stat-value ${result.is_dag ? 'modal__stat-value--success' : 'modal__stat-value--warning'}`}>
                  {result.is_dag ? 'Valid' : 'Invalid'}
                </span>
                <span className="modal__stat-label">DAG Status</span>
              </div>
            </div>
          )}

          {!isError && (
            <p className="modal__hint">
              {result.is_dag
                ? 'Your pipeline is a valid directed acyclic graph — ready to run.'
                : 'Your pipeline contains cycles. Remove circular connections to make it a valid DAG.'}
            </p>
          )}
        </div>

        <div className="modal__footer">
          <button type="button" className="modal__btn" onClick={onClose}>
            {isError ? 'Dismiss' : 'Got it'}
          </button>
        </div>
      </div>
    </div>
  );
};

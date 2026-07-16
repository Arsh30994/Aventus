import { useState } from 'react';

const resolveDefault = (field, id, data) => {
  if (typeof field.defaultValue === 'function') {
    return field.defaultValue(id, data);
  }
  if (field.defaultValue !== undefined) {
    return data?.[field.key] ?? field.defaultValue;
  }
  if (field.type === 'checkbox') return false;
  if (field.type === 'range') return field.min ?? 0;
  if (field.type === 'color') return '#818cf8';
  return data?.[field.key] ?? '';
};

export const NodeFields = ({ id, data, fields }) => {
  const [values, setValues] = useState(() =>
    Object.fromEntries(
      fields.map((field) => [field.key, resolveDefault(field, id, data)])
    )
  );

  const updateField = (key, value) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <>
      {fields.map((field) => (
        <div key={field.key} className="node__field">
          <label htmlFor={`${id}-${field.key}`}>{field.label}</label>

          {/* ── Toggle / Checkbox ─────────────────────── */}
          {field.type === 'checkbox' ? (
            <div className="node__toggle-wrapper">
              <button
                type="button"
                id={`${id}-${field.key}`}
                className={`node__toggle ${values[field.key] ? 'node__toggle--active' : ''}`}
                onClick={() => updateField(field.key, !values[field.key])}
                role="switch"
                aria-checked={!!values[field.key]}
              />
              <span className="node__toggle-label">
                {values[field.key] ? 'On' : 'Off'}
              </span>
            </div>

          /* ── Range / Slider ────────────────────────── */
          ) : field.type === 'range' ? (
            <div className="node__range-wrapper">
              <input
                id={`${id}-${field.key}`}
                type="range"
                className="node__range"
                value={values[field.key]}
                onChange={(e) => updateField(field.key, parseFloat(e.target.value))}
                min={field.min ?? 0}
                max={field.max ?? 1}
                step={field.step ?? 0.01}
              />
              <span className="node__range-value">
                {Number(values[field.key]).toFixed(
                  String(field.step ?? 0.01).split('.')[1]?.length ?? 2
                )}
              </span>
            </div>

          /* ── Color Picker ──────────────────────────── */
          ) : field.type === 'color' ? (
            <div className="node__color-wrapper">
              <input
                id={`${id}-${field.key}`}
                type="color"
                className="node__color-swatch"
                value={values[field.key]}
                onChange={(e) => updateField(field.key, e.target.value)}
              />
              <span className="node__color-value">{values[field.key]}</span>
            </div>

          /* ── Select ────────────────────────────────── */
          ) : field.type === 'select' ? (
            <select
              id={`${id}-${field.key}`}
              value={values[field.key]}
              onChange={(e) => updateField(field.key, e.target.value)}
            >
              {field.options.map((option) => {
                const value = typeof option === 'string' ? option : option.value;
                const label = typeof option === 'string' ? option : option.label;
                return (
                  <option key={value} value={value}>
                    {label}
                  </option>
                );
              })}
            </select>

          /* ── Textarea ──────────────────────────────── */
          ) : field.type === 'textarea' ? (
            <textarea
              id={`${id}-${field.key}`}
              value={values[field.key]}
              onChange={(e) => updateField(field.key, e.target.value)}
              rows={field.rows ?? 2}
            />

          /* ── Text / Number / Default ───────────────── */
          ) : (
            <input
              id={`${id}-${field.key}`}
              type={field.type ?? 'text'}
              value={values[field.key]}
              onChange={(e) => updateField(field.key, e.target.value)}
              placeholder={field.placeholder}
              min={field.min}
              max={field.max}
            />
          )}
        </div>
      ))}
    </>
  );
};

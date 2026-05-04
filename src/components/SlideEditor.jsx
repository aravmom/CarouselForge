import React from 'react';

export default function SlideEditor({ slide, index, onChange }) {
  const update = (key, value) => {
    onChange(index, { ...slide, [key]: value });
  };

  const updateArrayItem = (key, i, value) => {
    const arr = [...(slide[key] || [])];
    arr[i] = value;
    onChange(index, { ...slide, [key]: arr });
  };

  const addArrayItem = (key) => {
    const arr = [...(slide[key] || []), ''];
    onChange(index, { ...slide, [key]: arr });
  };

  const removeArrayItem = (key, i) => {
    const arr = (slide[key] || []).filter((_, idx) => idx !== i);
    onChange(index, { ...slide, [key]: arr });
  };

  const inputClass = "w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400/50";
  const textareaClass = inputClass + " resize-none";
  const labelClass = "block text-xs font-medium text-slate-400 mb-1";
  const btnSmClass = "px-2 py-1 text-xs rounded bg-slate-600 hover:bg-slate-500 text-slate-300 transition-colors";

  return (
    <div className="space-y-4">
      {/* Title (most layouts have it) */}
      {slide.layout !== 'big-statement' || slide.title !== undefined ? (
        <div>
          <label className={labelClass}>
            {slide.layout === 'big-statement' ? 'Attribution (optional)' : 'Title'}
          </label>
          <input
            type="text"
            value={slide.title || ''}
            onChange={e => update('title', e.target.value)}
            className={inputClass}
            placeholder={slide.layout === 'big-statement' ? 'Author name...' : 'Slide title...'}
          />
        </div>
      ) : null}

      {/* Subtitle (cover, cta) */}
      {(slide.layout === 'cover' || slide.layout === 'cta') && (
        <div>
          <label className={labelClass}>Subtitle</label>
          <textarea
            value={slide.subtitle || ''}
            onChange={e => update('subtitle', e.target.value)}
            className={textareaClass}
            rows={3}
            placeholder="Supporting text..."
          />
        </div>
      )}

      {/* Statement (big-statement) */}
      {slide.layout === 'big-statement' && (
        <div>
          <label className={labelClass}>Statement</label>
          <textarea
            value={slide.statement || ''}
            onChange={e => update('statement', e.target.value)}
            className={textareaClass}
            rows={4}
            placeholder="Your powerful statement..."
          />
        </div>
      )}

      {/* Bullets */}
      {slide.layout === 'bullets' && (
        <div>
          <label className={labelClass}>Bullet Points</label>
          <div className="space-y-2">
            {(slide.bullets || []).map((b, i) => (
              <div key={i} className="flex gap-2">
                <input
                  type="text"
                  value={b}
                  onChange={e => updateArrayItem('bullets', i, e.target.value)}
                  className={inputClass}
                  placeholder={`Point ${i + 1}...`}
                />
                <button onClick={() => removeArrayItem('bullets', i)} className="px-2 text-red-400 hover:text-red-300 text-lg">×</button>
              </div>
            ))}
            <button onClick={() => addArrayItem('bullets')} className={btnSmClass}>+ Add Point</button>
          </div>
        </div>
      )}

      {/* Steps (numbered-list) */}
      {slide.layout === 'numbered-list' && (
        <div>
          <label className={labelClass}>Steps</label>
          <div className="space-y-2">
            {(slide.steps || []).map((s, i) => (
              <div key={i} className="flex gap-2 items-center">
                <span className="text-xs text-slate-500 w-5 flex-shrink-0">{i + 1}.</span>
                <input
                  type="text"
                  value={s}
                  onChange={e => updateArrayItem('steps', i, e.target.value)}
                  className={inputClass}
                  placeholder={`Step ${i + 1}...`}
                />
                <button onClick={() => removeArrayItem('steps', i)} className="px-2 text-red-400 hover:text-red-300 text-lg">×</button>
              </div>
            ))}
            <button onClick={() => addArrayItem('steps')} className={btnSmClass}>+ Add Step</button>
          </div>
        </div>
      )}

      {/* Two Column */}
      {slide.layout === 'two-column' && (
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelClass}>Left Column Title</label>
            <input type="text" value={slide.leftTitle || ''} onChange={e => update('leftTitle', e.target.value)} className={inputClass} />
            <div className="mt-2 space-y-2">
              {(slide.leftItems || []).map((item, i) => (
                <div key={i} className="flex gap-1">
                  <input type="text" value={item} onChange={e => updateArrayItem('leftItems', i, e.target.value)} className={inputClass} />
                  <button onClick={() => removeArrayItem('leftItems', i)} className="text-red-400 text-lg">×</button>
                </div>
              ))}
              <button onClick={() => addArrayItem('leftItems')} className={btnSmClass}>+ Add</button>
            </div>
          </div>
          <div>
            <label className={labelClass}>Right Column Title</label>
            <input type="text" value={slide.rightTitle || ''} onChange={e => update('rightTitle', e.target.value)} className={inputClass} />
            <div className="mt-2 space-y-2">
              {(slide.rightItems || []).map((item, i) => (
                <div key={i} className="flex gap-1">
                  <input type="text" value={item} onChange={e => updateArrayItem('rightItems', i, e.target.value)} className={inputClass} />
                  <button onClick={() => removeArrayItem('rightItems', i)} className="text-red-400 text-lg">×</button>
                </div>
              ))}
              <button onClick={() => addArrayItem('rightItems')} className={btnSmClass}>+ Add</button>
            </div>
          </div>
        </div>
      )}

      {/* CTA fields */}
      {slide.layout === 'cta' && (
        <div className="space-y-3">
          <div>
            <label className={labelClass}>Website URL</label>
            <input type="text" value={slide.ctaUrl || ''} onChange={e => update('ctaUrl', e.target.value)} className={inputClass} placeholder="yoursite.com" />
          </div>
          <div>
            <label className={labelClass}>Phone Number</label>
            <input type="text" value={slide.ctaPhone || ''} onChange={e => update('ctaPhone', e.target.value)} className={inputClass} placeholder="(555) 123-4567" />
          </div>
        </div>
      )}

      {/* Show Author toggle */}
      <div className="flex items-center gap-2 pt-2 border-t border-slate-700">
        <input
          type="checkbox"
          id={`author-${index}`}
          checked={slide.showAuthor !== false}
          onChange={e => update('showAuthor', e.target.checked)}
          className="rounded border-slate-600 bg-slate-700 text-purple-500 focus:ring-purple-400"
        />
        <label htmlFor={`author-${index}`} className="text-xs text-slate-400">Show author footer</label>
      </div>
    </div>
  );
}

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Plus, Trash2, Copy, MoveUp, MoveDown, Palette, FileDown, Image, RotateCcw, ChevronDown } from 'lucide-react';
import SlideRenderer from './components/SlideRenderer';
import { brandPresets } from './data/brandPresets';
import { exampleCarousel } from './data/exampleCarousel';
import { exportCarouselPdf, exportSlidePng } from './utils/exportPdf';

const carouselLibrary = [
  { id: 'example', name: '10 Habits for Better Sleep (Example)', tag: 'demo', data: exampleCarousel },
];

// Available layouts for the "add slide" menu
const layoutOptions = [
  { id: 'cover', name: 'Cover', icon: '🎯' },
  { id: 'statement', name: 'Statement', icon: '💬' },
  { id: 'explainer', name: 'Explainer', icon: '💡' },
  { id: 'pillars', name: 'Pillars (4)', icon: '🏛️' },
  { id: 'checklist', name: 'Checklist', icon: '✅' },
  { id: 'numbered', name: 'Numbered', icon: '🔢' },
  { id: 'split', name: 'Split View', icon: '📊' },
  { id: 'cta', name: 'Call to Action', icon: '🚀' },
];

const defaultNewSlide = {
  cover: { layout: 'cover', title: 'Your Title Here', subtitle: 'Supporting text goes here', showAuthor: true, graphic: 'circuit' },
  statement: { layout: 'statement', title: 'Bold Title.', body: 'Your main content here.', highlight: 'The key takeaway.', showAuthor: true, graphic: 'warning' },
  explainer: { layout: 'explainer', title: 'Concept Name', body: 'Source or context', description: 'Detailed explanation here.', highlight: 'Key insight.', showAuthor: true, graphic: 'compass' },
  pillars: { layout: 'pillars', title: 'Key Components', items: [{ icon: '🎯', label: 'ITEM 1', desc: 'Description' }, { icon: '📋', label: 'ITEM 2', desc: 'Description' }, { icon: '⚡', label: 'ITEM 3', desc: 'Description' }, { icon: '🔒', label: 'ITEM 4', desc: 'Description' }], showAuthor: true, graphic: 'pillars' },
  checklist: { layout: 'checklist', title: 'Key Points', items: ['First point', 'Second point', 'Third point'], showAuthor: true, graphic: 'shield' },
  numbered: { layout: 'numbered', title: 'Step by Step', items: ['First step', 'Second step', 'Third step'], footer: '', showAuthor: true, graphic: 'stopwatch' },
  split: { layout: 'split', title: 'Two Sides', leftTitle: 'Left Side:', leftItems: ['Item 1', 'Item 2'], rightQuote: 'A compelling quote or insight.', showAuthor: true, graphic: 'balance' },
  cta: { layout: 'cta', title: 'Get In Touch', subtitle: 'Reach out for a free consultation.', phone: '', calendly: '', showAuthor: true, graphic: 'glow' },
};

export default function App() {
  const [activeCarousel, setActiveCarousel] = useState(carouselLibrary[0]);
  const [slides, setSlides] = useState(JSON.parse(JSON.stringify(exampleCarousel)));
  const [activeSlide, setActiveSlide] = useState(0);
  const [brand, setBrand] = useState(brandPresets[0]);
  const [showAddMenu, setShowAddMenu] = useState(false);
  const [showBrandPanel, setShowBrandPanel] = useState(false);
  const [showCarouselMenu, setShowCarouselMenu] = useState(false);
  const [generatedCarousels, setGeneratedCarousels] = useState([]);
  const [exporting, setExporting] = useState(false);
  const exportRefs = useRef({});

  // Load skill-generated carousels from public/generated/manifest.json
  useEffect(() => {
    fetch('/generated/manifest.json')
      .then(r => r.json())
      .then(data => setGeneratedCarousels(data.carousels || []))
      .catch(() => {});
  }, []);

  const loadCarousel = useCallback((carousel) => {
    setSlides(JSON.parse(JSON.stringify(carousel.data)));
    setActiveCarousel(carousel);
    setActiveSlide(0);
    setShowCarouselMenu(false);
  }, []);

  const loadGeneratedCarousel = useCallback((entry) => {
    fetch(`/generated/${entry.file}`)
      .then(r => r.json())
      .then(data => {
        setSlides(JSON.parse(JSON.stringify(data.slides)));
        setActiveCarousel({ id: data.id, name: data.name, tag: data.tag || 'generated', data: data.slides });
        setActiveSlide(0);
        setShowCarouselMenu(false);
      })
      .catch(err => console.error('Failed to load carousel:', err));
  }, []);

  const refreshGenerated = useCallback(() => {
    fetch('/generated/manifest.json?t=' + Date.now())
      .then(r => r.json())
      .then(data => setGeneratedCarousels(data.carousels || []))
      .catch(() => {});
  }, []);

  const updateSlide = useCallback((index, data) => {
    setSlides(prev => prev.map((s, i) => i === index ? data : s));
  }, []);

  const addSlide = useCallback((layoutId) => {
    const newSlide = JSON.parse(JSON.stringify(defaultNewSlide[layoutId]));
    setSlides(prev => [...prev.slice(0, activeSlide + 1), newSlide, ...prev.slice(activeSlide + 1)]);
    setActiveSlide(prev => prev + 1);
    setShowAddMenu(false);
  }, [activeSlide]);

  const removeSlide = useCallback((index) => {
    if (slides.length <= 1) return;
    setSlides(prev => prev.filter((_, i) => i !== index));
    setActiveSlide(prev => Math.min(prev, slides.length - 2));
  }, [slides.length]);

  const duplicateSlide = useCallback((index) => {
    const copy = JSON.parse(JSON.stringify(slides[index]));
    setSlides(prev => [...prev.slice(0, index + 1), copy, ...prev.slice(index + 1)]);
    setActiveSlide(index + 1);
  }, [slides]);

  const moveSlide = useCallback((index, direction) => {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= slides.length) return;
    setSlides(prev => {
      const arr = [...prev];
      [arr[index], arr[newIndex]] = [arr[newIndex], arr[index]];
      return arr;
    });
    setActiveSlide(newIndex);
  }, [slides.length]);

  const resetCarousel = () => {
    setSlides(JSON.parse(JSON.stringify(activeCarousel.data)));
    setActiveSlide(0);
  };

  const handleExportPdf = async () => {
    setExporting(true);
    try {
      await new Promise(r => setTimeout(r, 500));
      const elements = slides.map((_, i) => exportRefs.current[i]).filter(Boolean);
      await exportCarouselPdf(elements, `carousel-${Date.now()}.pdf`);
    } catch (err) {
      console.error('Export failed:', err);
    }
    setExporting(false);
  };

  const handleExportPng = async () => {
    setExporting(true);
    try {
      await new Promise(r => setTimeout(r, 500));
      const el = exportRefs.current[activeSlide];
      if (el) await exportSlidePng(el, `slide-${activeSlide + 1}.png`);
    } catch (err) {
      console.error('Export failed:', err);
    }
    setExporting(false);
  };

  const slide = slides[activeSlide];

  return (
    <div className="h-screen flex flex-col bg-slate-950 text-white overflow-hidden">
      {/* ─── HEADER ─── */}
      <header className="flex items-center justify-between px-5 py-3 bg-slate-900/90 border-b border-slate-800 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-600 to-amber-400 flex items-center justify-center text-sm font-bold shadow-lg shadow-purple-500/20">
            C
          </div>
          <div>
            <h1 className="text-lg font-bold leading-none tracking-tight">CarouselForge</h1>
            <p className="text-[10px] text-slate-500 font-medium">LinkedIn Carousel Generator</p>
          </div>
        </div>

        {/* ─── Carousel Selector ─── */}
        <div className="relative">
          <button onClick={() => setShowCarouselMenu(!showCarouselMenu)}
            className="flex items-center gap-2 px-3 py-2 text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition-colors border border-slate-700">
            <span className="font-semibold truncate max-w-[160px]">{activeCarousel.name}</span>
            {activeCarousel.tag && (
              <span className="px-1.5 py-0.5 rounded text-[10px] bg-purple-600/30 text-purple-300 font-medium flex-shrink-0">{activeCarousel.tag}</span>
            )}
            <ChevronDown size={12} className="text-slate-500 flex-shrink-0" />
          </button>
          {showCarouselMenu && (
            <div className="absolute top-full left-0 mt-1 w-80 bg-slate-900 border border-slate-700 rounded-xl shadow-xl z-50 overflow-hidden max-h-[70vh] overflow-y-auto">
              {/* Built-in */}
              <div className="px-3 py-2 border-b border-slate-800 flex items-center justify-between">
                <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest">Built-in</span>
              </div>
              {carouselLibrary.map(c => (
                <button key={c.id} onClick={() => loadCarousel(c)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 text-xs hover:bg-slate-800 transition-colors text-left ${c.id === activeCarousel.id ? 'text-purple-400 bg-purple-500/5' : 'text-slate-300'}`}>
                  <span className="font-medium">{c.name}</span>
                  {c.tag && <span className="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-slate-400 border border-slate-700">{c.tag}</span>}
                </button>
              ))}
              {/* Skill-generated */}
              <div className="px-3 py-2 border-t border-b border-slate-800 flex items-center justify-between">
                <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest">Generated by /carousel</span>
                <button onClick={refreshGenerated} className="text-[10px] text-purple-400 hover:text-purple-300">↻ Refresh</button>
              </div>
              {generatedCarousels.length === 0 ? (
                <div className="px-3 py-3 text-[11px] text-slate-600 italic">
                  No generated carousels yet. Run <span className="font-mono text-purple-500">/carousel</span> in Claude to create one.
                </div>
              ) : (
                generatedCarousels.slice().reverse().map(entry => (
                  <button key={entry.id} onClick={() => loadGeneratedCarousel(entry)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 text-xs hover:bg-slate-800 transition-colors text-left ${entry.id === activeCarousel.id ? 'text-purple-400 bg-purple-500/5' : 'text-slate-300'}`}>
                    <span className="font-medium truncate max-w-[180px]">{entry.name}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] bg-purple-900/30 text-purple-400 border border-purple-800/40 flex-shrink-0 ml-2">{entry.tag || 'new'}</span>
                  </button>
                ))
              )}
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button onClick={resetCarousel} className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors" title="Reload current carousel">
            <RotateCcw size={12} /> Reset
          </button>
          <button onClick={() => setShowBrandPanel(!showBrandPanel)}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg transition-colors ${showBrandPanel ? 'bg-purple-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'}`}>
            <Palette size={12} /> Brand
          </button>
          <button onClick={handleExportPng} disabled={exporting}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors disabled:opacity-50">
            <Image size={12} /> PNG
          </button>
          <button onClick={handleExportPdf} disabled={exporting}
            className="flex items-center gap-1.5 px-4 py-2 text-sm bg-gradient-to-r from-purple-600 to-amber-500 hover:from-purple-500 hover:to-amber-400 rounded-lg font-semibold transition-all disabled:opacity-50 shadow-lg shadow-purple-500/20">
            <FileDown size={14} />
            {exporting ? 'Exporting...' : 'Export PDF'}
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* ─── LEFT: Slide Thumbnails ─── */}
        <div className="w-44 bg-slate-900/60 border-r border-slate-800 flex flex-col flex-shrink-0">
          <div className="p-3 border-b border-slate-800 flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-widest">Slides</span>
            <button onClick={() => setShowAddMenu(!showAddMenu)} className="p-1 rounded hover:bg-slate-700 text-purple-400 transition-colors">
              <Plus size={16} />
            </button>
          </div>

          {showAddMenu && (
            <div className="border-b border-slate-800 bg-slate-900 p-2 space-y-0.5 max-h-64 overflow-y-auto">
              {layoutOptions.map(opt => (
                <button key={opt.id} onClick={() => addSlide(opt.id)}
                  className="w-full flex items-center gap-2 px-2 py-1.5 text-xs rounded hover:bg-slate-700 transition-colors text-left text-slate-300">
                  <span>{opt.icon}</span><span>{opt.name}</span>
                </button>
              ))}
            </div>
          )}

          <div className="flex-1 overflow-y-auto hide-scrollbar p-2 space-y-2">
            {slides.map((sl, i) => (
              <button key={i} onClick={() => setActiveSlide(i)}
                className={`w-full rounded-lg overflow-hidden border-2 transition-all ${
                  i === activeSlide ? 'border-purple-500 shadow-lg shadow-purple-500/25' : 'border-transparent hover:border-slate-700'}`}>
                <div className="relative" style={{ width: '100%', paddingBottom: '100%', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', top: 0, left: 0, width: '1080px', height: '1080px', transform: 'scale(0.145)', transformOrigin: 'top left' }}>
                    <SlideRenderer slide={sl} brand={brand} slideNumber={i + 1} totalSlides={slides.length} size={1080} height={1080} />
                  </div>
                </div>
                <div className="px-2 py-1 bg-slate-900/90 text-[10px] text-slate-500 truncate font-medium">
                  {i + 1}. {sl.title?.split('\n')[0] || sl.layout}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* ─── CENTER: Live Preview ─── */}
        <div className="flex-1 flex flex-col items-center justify-center bg-slate-950 p-6 min-w-0">
          {/* Nav */}
          <div className="flex items-center gap-5 mb-5">
            <button onClick={() => setActiveSlide(Math.max(0, activeSlide - 1))} disabled={activeSlide === 0}
              className="p-2.5 rounded-full bg-slate-800/80 hover:bg-slate-700 disabled:opacity-20 transition-colors">
              <ChevronLeft size={22} />
            </button>
            <span className="text-sm text-slate-500 font-medium tracking-wide">
              {activeSlide + 1} <span className="text-slate-700">/</span> {slides.length}
            </span>
            <button onClick={() => setActiveSlide(Math.min(slides.length - 1, activeSlide + 1))} disabled={activeSlide === slides.length - 1}
              className="p-2.5 rounded-full bg-slate-800/80 hover:bg-slate-700 disabled:opacity-20 transition-colors">
              <ChevronRight size={22} />
            </button>
          </div>

          {/* Preview */}
          <div className="rounded-2xl overflow-hidden shadow-2xl shadow-black/60 ring-1 ring-white/5">
            <SlideRenderer slide={slide} brand={brand} slideNumber={activeSlide + 1} totalSlides={slides.length} size={560} height={560} />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 mt-5">
            <button onClick={() => moveSlide(activeSlide, -1)} disabled={activeSlide === 0} className="p-2 rounded-lg bg-slate-800/60 hover:bg-slate-700 disabled:opacity-20 transition-colors" title="Move left"><MoveUp size={14} /></button>
            <button onClick={() => moveSlide(activeSlide, 1)} disabled={activeSlide === slides.length - 1} className="p-2 rounded-lg bg-slate-800/60 hover:bg-slate-700 disabled:opacity-20 transition-colors" title="Move right"><MoveDown size={14} /></button>
            <div className="w-px h-5 bg-slate-700 mx-1" />
            <button onClick={() => duplicateSlide(activeSlide)} className="p-2 rounded-lg bg-slate-800/60 hover:bg-slate-700 transition-colors" title="Duplicate"><Copy size={14} /></button>
            <button onClick={() => removeSlide(activeSlide)} disabled={slides.length <= 1} className="p-2 rounded-lg bg-slate-800/60 hover:bg-red-900/40 text-red-400 disabled:opacity-20 transition-colors" title="Delete"><Trash2 size={14} /></button>
          </div>
        </div>

        {/* ─── RIGHT: Content Editor ─── */}
        <div className="w-[340px] bg-slate-900/60 border-l border-slate-800 flex flex-col flex-shrink-0 overflow-hidden">
          {showBrandPanel ? (
            <BrandPanel brand={brand} setBrand={setBrand} onClose={() => setShowBrandPanel(false)} />
          ) : (
            <ContentEditor slide={slide} index={activeSlide} onChange={updateSlide} />
          )}
        </div>
      </div>

      {/* ─── HIDDEN EXPORT (1080x1080) ─── */}
      <div style={{ position: 'fixed', left: '-9999px', top: 0, opacity: 0, pointerEvents: 'none' }}>
        {slides.map((sl, i) => (
          <div key={i} ref={el => { exportRefs.current[i] = el; }} style={{ width: 1080, height: 1080 }}>
            <SlideRenderer slide={sl} brand={brand} slideNumber={i + 1} totalSlides={slides.length} size={1080} height={1080} />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── CONTENT EDITOR ─── */
function ContentEditor({ slide, index, onChange }) {
  const update = (key, value) => onChange(index, { ...slide, [key]: value });
  const updateArrayItem = (key, i, value) => {
    const arr = [...(slide[key] || [])];
    arr[i] = value;
    onChange(index, { ...slide, [key]: arr });
  };
  const addArrayItem = (key, defaultVal = '') => {
    const arr = [...(slide[key] || []), defaultVal];
    onChange(index, { ...slide, [key]: arr });
  };
  const removeArrayItem = (key, i) => {
    const arr = (slide[key] || []).filter((_, idx) => idx !== i);
    onChange(index, { ...slide, [key]: arr });
  };
  const updatePillarItem = (i, field, value) => {
    const items = [...(slide.items || [])];
    items[i] = { ...items[i], [field]: value };
    onChange(index, { ...slide, items });
  };

  const inputCls = "w-full bg-slate-800/70 border border-slate-700 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400/30 placeholder-slate-600";
  const textareaCls = inputCls + " resize-none";
  const labelCls = "block text-[11px] font-semibold text-slate-500 mb-1.5 uppercase tracking-wider";
  const btnCls = "px-2.5 py-1 text-xs rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors";

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded-full">
            {slide.layout}
          </span>
          <span className="text-xs text-slate-600">Slide {index + 1}</span>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto hide-scrollbar p-4 space-y-4">

        {/* Title */}
        {slide.title !== undefined && (
          <div>
            <label className={labelCls}>Title</label>
            <textarea value={slide.title || ''} onChange={e => update('title', e.target.value)} className={textareaCls} rows={2} placeholder="Slide title..." />
          </div>
        )}

        {/* Subtitle */}
        {slide.subtitle !== undefined && (
          <div>
            <label className={labelCls}>Subtitle</label>
            <textarea value={slide.subtitle || ''} onChange={e => update('subtitle', e.target.value)} className={textareaCls} rows={3} placeholder="Supporting text..." />
          </div>
        )}

        {/* Body */}
        {slide.body !== undefined && (
          <div>
            <label className={labelCls}>Body</label>
            <textarea value={slide.body || ''} onChange={e => update('body', e.target.value)} className={textareaCls} rows={4} placeholder="Main content..." />
          </div>
        )}

        {/* Description */}
        {slide.description !== undefined && (
          <div>
            <label className={labelCls}>Description</label>
            <textarea value={slide.description || ''} onChange={e => update('description', e.target.value)} className={textareaCls} rows={3} />
          </div>
        )}

        {/* Highlight */}
        {slide.highlight !== undefined && (
          <div>
            <label className={labelCls}>Highlight / Key Quote</label>
            <textarea value={slide.highlight || ''} onChange={e => update('highlight', e.target.value)} className={textareaCls} rows={2} placeholder="Key insight..." />
          </div>
        )}

        {/* Statement */}
        {slide.statement !== undefined && (
          <div>
            <label className={labelCls}>Statement</label>
            <textarea value={slide.statement || ''} onChange={e => update('statement', e.target.value)} className={textareaCls} rows={3} />
          </div>
        )}

        {/* Pillars items */}
        {slide.layout === 'pillars' && slide.items && (
          <div>
            <label className={labelCls}>Pillars</label>
            <div className="space-y-3">
              {slide.items.map((item, i) => (
                <div key={i} className="bg-slate-800/40 rounded-lg p-3 space-y-2">
                  <div className="flex gap-2">
                    <input type="text" value={item.icon} onChange={e => updatePillarItem(i, 'icon', e.target.value)} className="w-12 bg-slate-800 border border-slate-700 rounded-lg px-2 py-1.5 text-center text-sm" />
                    <input type="text" value={item.label} onChange={e => updatePillarItem(i, 'label', e.target.value)} className={inputCls} placeholder="Label" />
                  </div>
                  <input type="text" value={item.desc} onChange={e => updatePillarItem(i, 'desc', e.target.value)} className={inputCls} placeholder="Description" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Checklist / Numbered items */}
        {slide.layout !== 'pillars' && slide.items && Array.isArray(slide.items) && typeof slide.items[0] === 'string' && (
          <div>
            <label className={labelCls}>Items</label>
            <div className="space-y-2">
              {slide.items.map((item, i) => (
                <div key={i} className="flex gap-2">
                  <span className="text-xs text-slate-600 w-5 pt-3 flex-shrink-0">{i + 1}</span>
                  <input type="text" value={item} onChange={e => updateArrayItem('items', i, e.target.value)} className={inputCls} />
                  <button onClick={() => removeArrayItem('items', i)} className="px-1.5 text-red-400/60 hover:text-red-400 text-lg">×</button>
                </div>
              ))}
              <button onClick={() => addArrayItem('items')} className={btnCls}>+ Add Item</button>
            </div>
          </div>
        )}

        {/* Split layout fields */}
        {slide.leftTitle !== undefined && (
          <div>
            <label className={labelCls}>Left Side Title</label>
            <input type="text" value={slide.leftTitle || ''} onChange={e => update('leftTitle', e.target.value)} className={inputCls} />
          </div>
        )}
        {slide.leftItems && (
          <div>
            <label className={labelCls}>Left Items</label>
            <div className="space-y-2">
              {slide.leftItems.map((item, i) => (
                <div key={i} className="flex gap-2">
                  <input type="text" value={item} onChange={e => updateArrayItem('leftItems', i, e.target.value)} className={inputCls} />
                  <button onClick={() => removeArrayItem('leftItems', i)} className="px-1.5 text-red-400/60 hover:text-red-400 text-lg">×</button>
                </div>
              ))}
              <button onClick={() => addArrayItem('leftItems')} className={btnCls}>+ Add</button>
            </div>
          </div>
        )}
        {slide.rightQuote !== undefined && (
          <div>
            <label className={labelCls}>Right Quote</label>
            <textarea value={slide.rightQuote || ''} onChange={e => update('rightQuote', e.target.value)} className={textareaCls} rows={4} />
          </div>
        )}

        {/* CTA fields */}
        {slide.phone !== undefined && (
          <div>
            <label className={labelCls}>Phone</label>
            <input type="text" value={slide.phone || ''} onChange={e => update('phone', e.target.value)} className={inputCls} placeholder="(555) 123-4567" />
          </div>
        )}
        {slide.calendly !== undefined && (
          <div>
            <label className={labelCls}>Calendly Link</label>
            <input type="text" value={slide.calendly || ''} onChange={e => update('calendly', e.target.value)} className={inputCls} placeholder="calendly.com/yourname" />
          </div>
        )}

        {/* Footer text */}
        {slide.footer !== undefined && (
          <div>
            <label className={labelCls}>Footer Text</label>
            <input type="text" value={slide.footer || ''} onChange={e => update('footer', e.target.value)} className={inputCls} placeholder="Closing line..." />
          </div>
        )}

        {/* Author toggle */}
        <div className="flex items-center gap-2 pt-3 border-t border-slate-800">
          <input type="checkbox" id={`auth-${index}`} checked={slide.showAuthor !== false} onChange={e => update('showAuthor', e.target.checked)}
            className="rounded border-slate-600 bg-slate-800 text-purple-500 focus:ring-purple-400" />
          <label htmlFor={`auth-${index}`} className="text-xs text-slate-500">Show author</label>
        </div>
      </div>
    </div>
  );
}

/* ─── BRAND PANEL ─── */
function BrandPanel({ brand, setBrand, onClose }) {
  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-slate-800 flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Brand Theme</span>
        <button onClick={onClose} className="text-xs text-slate-500 hover:text-white">Done</button>
      </div>
      <div className="flex-1 overflow-y-auto hide-scrollbar p-4 space-y-5">
        {/* Presets */}
        <div className="space-y-1.5">
          {brandPresets.map(p => (
            <button key={p.id} onClick={() => setBrand(p)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${
                brand.id === p.id ? 'bg-purple-600/15 border border-purple-500/40' : 'bg-slate-800/40 border border-transparent hover:bg-slate-800/70'}`}>
              <div className="flex gap-1.5">
                <div className="w-5 h-5 rounded-full border border-white/10" style={{ background: p.colors.bg }} />
                <div className="w-5 h-5 rounded-full" style={{ background: p.colors.primary }} />
                <div className="w-5 h-5 rounded-full" style={{ background: p.colors.accent || p.colors.secondary }} />
              </div>
              <span className="text-xs font-medium">{p.name}</span>
            </button>
          ))}
        </div>

        {/* Author */}
        <div className="border-t border-slate-800 pt-4 space-y-3">
          <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Author Info</label>
          <input type="text" value={brand.authorName || ''} onChange={e => setBrand(prev => ({ ...prev, authorName: e.target.value }))}
            className="w-full bg-slate-800/70 border border-slate-700 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-purple-400" placeholder="Your name" />
          <input type="text" value={brand.authorTitle || ''} onChange={e => setBrand(prev => ({ ...prev, authorTitle: e.target.value }))}
            className="w-full bg-slate-800/70 border border-slate-700 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-purple-400" placeholder="Your title" />
        </div>

        {/* Color customizer */}
        <div className="border-t border-slate-800 pt-4 space-y-3">
          <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Colors</label>
          {[['bg', 'Background'], ['primary', 'Primary / Gold'], ['text', 'Text'], ['textSecondary', 'Text Muted']].map(([key, label]) => (
            <div key={key} className="flex items-center gap-3">
              <input type="color" value={brand.colors[key]?.startsWith('#') ? brand.colors[key] : '#000'}
                onChange={e => setBrand(prev => ({ ...prev, id: 'custom', colors: { ...prev.colors, [key]: e.target.value } }))}
                className="w-9 h-9 rounded-lg cursor-pointer bg-transparent border border-slate-700" />
              <span className="text-xs text-slate-400">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

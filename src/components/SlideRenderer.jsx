import React from 'react';
import { graphicMap } from './SlideGraphics';

const HEADING = "'Playfair Display', Georgia, serif";
const BODY = "'DM Sans', 'Inter', system-ui, sans-serif";
const ACCENT = "'Space Grotesk', 'DM Sans', sans-serif";

export default function SlideRenderer({ slide, brand, slideNumber, totalSlides, size = 1080, height }) {
  const { colors } = brand;
  const s = size / 1080;
  const h = height || size;
  const GraphicComponent = graphicMap[slide.graphic] || graphicMap.circuit;
  const gold = colors.accent || colors.primary;
  const goldLight = colors.accentLight || gold;

  return (
    <div style={{
      width: `${size}px`, height: `${h}px`,
      background: colors.bgGradient || colors.bg,
      color: colors.text,
      position: 'relative', overflow: 'hidden',
      fontFamily: BODY,
      border: colors.border ? `${4 * s}px solid ${colors.border}` : 'none',
      boxSizing: 'border-box',
    }}>
      {/* Background SVG art */}
      <div style={{ opacity: 2 }}>
        <GraphicComponent color={gold} />
      </div>

      {/* Top metallic gold bar */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        height: `${10 * s}px`,
        background: `linear-gradient(90deg, ${colors.primary}, ${gold}, ${goldLight}, ${gold}, ${colors.primary})`,
      }} />

      {/* Left accent strip */}
      <div style={{
        position: 'absolute', top: `${10 * s}px`, left: 0, bottom: 0,
        width: `${6 * s}px`,
        background: `linear-gradient(180deg, ${gold}60, ${gold}20, ${gold}60)`,
      }} />

      {/* Slide number badge — top right */}
      <div style={{
        position: 'absolute', top: `${26 * s}px`, right: `${28 * s}px`,
        background: `${colors.primary}15`,
        border: `2px solid ${colors.primary}30`,
        borderRadius: `${10 * s}px`,
        padding: `${8 * s}px ${16 * s}px`,
        fontSize: `${16 * s}px`, color: colors.primary, fontWeight: 700,
        fontFamily: ACCENT, letterSpacing: '0.08em', zIndex: 3,
      }}>
        {String(slideNumber).padStart(2, '0')}/{String(totalSlides).padStart(2, '0')}
      </div>

      {/* Content */}
      <div style={{
        position: 'relative', zIndex: 1,
        width: '100%', height: '100%',
        padding: `${68 * s}px ${68 * s}px ${120 * s}px ${74 * s}px`,
        boxSizing: 'border-box',
        display: 'flex', flexDirection: 'column',
      }}>
        {renderLayout(slide, colors, s, brand)}
      </div>

      {/* Author footer — BIGGER */}
      {slide.showAuthor && brand.authorName && (
        <div style={{
          position: 'absolute', bottom: `${6 * s}px`, left: `${6 * s}px`, right: 0, zIndex: 2,
          background: `linear-gradient(135deg, ${colors.primary}14, ${gold}0a)`,
          borderTop: `2.5px solid ${gold}30`,
          padding: `${18 * s}px ${68 * s}px ${18 * s}px ${68 * s}px`,
          display: 'flex', alignItems: 'center', gap: `${18 * s}px`,
        }}>
          {/* Photo or initial */}
          {brand.authorPhoto ? (
            <img src={brand.authorPhoto} alt="" style={{
              width: `${62 * s}px`, height: `${62 * s}px`,
              borderRadius: '50%', objectFit: 'cover',
              border: `3px solid ${gold}`,
              flexShrink: 0,
            }} />
          ) : (
            <div style={{
              width: `${62 * s}px`, height: `${62 * s}px`,
              borderRadius: '50%',
              background: `linear-gradient(135deg, ${colors.primary}, ${gold})`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: `${28 * s}px`, fontWeight: 700, color: '#ffffff',
              fontFamily: HEADING, flexShrink: 0,
            }}>
              {brand.authorName.charAt(0)}
            </div>
          )}
          <div>
            <div style={{
              fontSize: `${28 * s}px`, fontWeight: 700, color: colors.text,
              fontFamily: HEADING, lineHeight: 1.2,
            }}>
              {brand.authorName}
            </div>
            <div style={{
              fontSize: `${20 * s}px`, color: colors.primary,
              fontFamily: ACCENT, fontWeight: 600, letterSpacing: '0.02em',
              marginTop: `${2 * s}px`,
            }}>
              {brand.authorTitle}
            </div>
          </div>
        </div>
      )}

      {/* Bottom metallic gold bar */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        height: `${6 * s}px`,
        background: `linear-gradient(90deg, ${colors.primary}, ${gold}, ${goldLight}, ${gold}, ${colors.primary})`,
        zIndex: 3,
      }} />
    </div>
  );
}

function renderLayout(slide, colors, s, brand) {
  switch (slide.layout) {
    case 'cover': return <CoverLayout slide={slide} colors={colors} s={s} brand={brand} />;
    case 'statement': return <StatementLayout slide={slide} colors={colors} s={s} brand={brand} />;
    case 'explainer': return <ExplainerLayout slide={slide} colors={colors} s={s} brand={brand} />;
    case 'pillars': return <PillarsLayout slide={slide} colors={colors} s={s} brand={brand} />;
    case 'checklist': return <ChecklistLayout slide={slide} colors={colors} s={s} brand={brand} />;
    case 'numbered': return <NumberedLayout slide={slide} colors={colors} s={s} brand={brand} />;
    case 'split': return <SplitLayout slide={slide} colors={colors} s={s} brand={brand} />;
    case 'cta': return <CTALayout slide={slide} colors={colors} s={s} brand={brand} />;
    default: return <CoverLayout slide={slide} colors={colors} s={s} brand={brand} />;
  }
}

/* ═══════════════════════════════════════════════════════════
   DECORATIVE HELPERS
   ═══════════════════════════════════════════════════════════ */

function DiamondDivider({ color, s, width = 200 }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: `${10 * s}px`, justifyContent: 'center', margin: `${16 * s}px 0` }}>
      <div style={{ width: `${width * 0.35 * s}px`, height: `${2 * s}px`, background: `linear-gradient(90deg, transparent, ${color}40)` }} />
      <div style={{ width: `${10 * s}px`, height: `${10 * s}px`, background: color, transform: 'rotate(45deg)', opacity: 0.5 }} />
      <div style={{ width: `${width * 0.35 * s}px`, height: `${2 * s}px`, background: `linear-gradient(90deg, ${color}40, transparent)` }} />
    </div>
  );
}

function IconBadge({ children, color, s, size: sz = 64 }) {
  return (
    <div style={{
      width: `${sz * s}px`, height: `${sz * s}px`,
      borderRadius: `${14 * s}px`,
      background: `linear-gradient(135deg, ${color}18, ${color}08)`,
      border: `2px solid ${color}30`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: `${sz * 0.55 * s}px`, flexShrink: 0,
    }}>
      {children}
    </div>
  );
}

function GradientPanel({ color, s, children, style = {} }) {
  return (
    <div style={{
      background: `linear-gradient(135deg, ${color}0a, ${color}04)`,
      border: `2px solid ${color}15`,
      borderRadius: `${16 * s}px`,
      padding: `${24 * s}px ${28 * s}px`,
      ...style,
    }}>
      {children}
    </div>
  );
}

function DotPattern({ color, s, x, y, rows = 5, cols = 5 }) {
  return (
    <svg style={{ position: 'absolute', left: `${x * s}px`, top: `${y * s}px`, opacity: 0.12 }} width={cols * 18 * s} height={rows * 18 * s}>
      {Array.from({ length: rows }).map((_, r) =>
        Array.from({ length: cols }).map((_, c) => (
          <circle key={`${r}-${c}`} cx={(c * 18 + 5) * s} cy={(r * 18 + 5) * s} r={3 * s} fill={color} />
        ))
      )}
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════
   LAYOUTS
   ═══════════════════════════════════════════════════════════ */

/* ─── COVER ─── */
function CoverLayout({ slide, colors, s, brand }) {
  const gold = colors.accent || colors.primary;
  return (
    <div style={{ flex: 1, display: 'flex', position: 'relative' }}>
      <DotPattern color={colors.primary} s={s} x={30} y={30} rows={5} cols={5} />

      {/* Left: Text content */}
      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column',
        justifyContent: 'center', paddingRight: `${30 * s}px`,
      }}>
        <DiamondDivider color={gold} s={s} width={200} />

        <h1 style={{
          fontSize: `${88 * s}px`, fontWeight: 800, lineHeight: 1.05,
          margin: 0, color: colors.text,
          fontFamily: HEADING, letterSpacing: '-0.02em',
          whiteSpace: 'pre-line',
        }}>
          {slide.title}
        </h1>

        {slide.subtitle && (
          <p style={{
            fontSize: `${34 * s}px`, color: colors.textSecondary,
            marginTop: `${28 * s}px`, lineHeight: 1.4,
            fontFamily: BODY, fontWeight: 400,
            whiteSpace: 'pre-line',
          }}>
            {slide.subtitle}
          </p>
        )}

        <DiamondDivider color={gold} s={s} width={140} />
      </div>

      {/* Right: Photo (if available) */}
      {brand.authorPhoto && (
        <div style={{
          width: `${340 * s}px`, display: 'flex', flexDirection: 'column',
          justifyContent: 'center', alignItems: 'center',
        }}>
          <div style={{
            width: `${280 * s}px`, height: `${280 * s}px`,
            borderRadius: `${20 * s}px`,
            overflow: 'hidden',
            border: `4px solid ${gold}`,
            boxShadow: `0 ${12 * s}px ${40 * s}px ${colors.primary}30`,
          }}>
            <img src={brand.authorPhoto} alt="" style={{
              width: '100%', height: '100%', objectFit: 'cover',
            }} />
          </div>
          {/* Name under photo */}
          <div style={{
            marginTop: `${20 * s}px`, textAlign: 'center',
          }}>
            <div style={{
              fontSize: `${28 * s}px`, fontWeight: 700, color: colors.text,
              fontFamily: HEADING,
            }}>
              {brand.authorName}
            </div>
            <div style={{
              fontSize: `${18 * s}px`, color: gold, fontWeight: 600,
              fontFamily: ACCENT, letterSpacing: '0.03em',
              marginTop: `${4 * s}px`,
            }}>
              {brand.authorTitle}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── STATEMENT ─── */
function StatementLayout({ slide, colors, s }) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative' }}>
      <DotPattern color={colors.primary} s={s} x={780} y={80} rows={6} cols={4} />

      {/* Large decorative quote mark */}
      <div style={{
        fontSize: `${120 * s}px`, color: colors.primary, opacity: 0.08,
        fontFamily: 'Georgia, serif', lineHeight: 0.5, marginBottom: `${10 * s}px`,
        position: 'absolute', top: `${40 * s}px`, left: `${-10 * s}px`,
      }}>"</div>

      <h2 style={{
        fontSize: `${68 * s}px`, fontWeight: 800, lineHeight: 1.1,
        margin: 0, color: colors.primary,
        fontFamily: HEADING, marginBottom: `${32 * s}px`,
      }}>
        {slide.title}
      </h2>

      <GradientPanel color={colors.primary} s={s} style={{ marginBottom: `${32 * s}px` }}>
        <p style={{
          fontSize: `${32 * s}px`, lineHeight: 1.55, color: colors.textSecondary,
          fontFamily: BODY, fontWeight: 400,
          whiteSpace: 'pre-line', margin: 0,
        }}>
          {slide.body}
        </p>
      </GradientPanel>

      {slide.highlight && (
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: `${16 * s}px` }}>
          <div style={{
            width: `${6 * s}px`, flexShrink: 0, borderRadius: `${3 * s}px`,
            background: `linear-gradient(180deg, ${colors.accent || colors.primary}, ${colors.primary})`,
            alignSelf: 'stretch',
          }} />
          <p style={{
            fontSize: `${40 * s}px`, fontWeight: 700, color: colors.text,
            fontFamily: HEADING, fontStyle: 'italic', lineHeight: 1.25, margin: 0,
          }}>
            {slide.highlight}
          </p>
        </div>
      )}
    </div>
  );
}

/* ─── EXPLAINER ─── */
function ExplainerLayout({ slide, colors, s }) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative' }}>
      <DotPattern color={colors.primary} s={s} x={800} y={100} rows={5} cols={4} />

      <h2 style={{
        fontSize: `${60 * s}px`, fontWeight: 800, lineHeight: 1.1,
        margin: 0, color: colors.primary,
        fontFamily: HEADING, marginBottom: `${24 * s}px`,
        whiteSpace: 'pre-line',
      }}>
        {slide.title}
      </h2>

      {/* Source badge */}
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: `${10 * s}px`,
        background: `${colors.primary}0c`, border: `1.5px solid ${colors.primary}20`,
        borderRadius: `${8 * s}px`, padding: `${10 * s}px ${18 * s}px`,
        marginBottom: `${24 * s}px`, alignSelf: 'flex-start',
      }}>
        <span style={{ fontSize: `${22 * s}px` }}>🏛️</span>
        <span style={{
          fontSize: `${22 * s}px`, color: colors.textSecondary,
          fontFamily: ACCENT, fontWeight: 500,
        }}>
          {slide.body}
        </span>
      </div>

      <p style={{
        fontSize: `${32 * s}px`, lineHeight: 1.5, color: colors.text,
        fontFamily: BODY, fontWeight: 400,
        marginBottom: `${28 * s}px`,
      }}>
        {slide.description}
      </p>

      {slide.highlight && (
        <GradientPanel color={colors.accent || colors.primary} s={s}>
          <div style={{ display: 'flex', alignItems: 'center', gap: `${14 * s}px` }}>
            <span style={{ fontSize: `${32 * s}px` }}>🧭</span>
            <p style={{
              fontSize: `${34 * s}px`, fontWeight: 700, color: colors.primary,
              fontFamily: HEADING, fontStyle: 'italic', margin: 0, lineHeight: 1.3,
            }}>
              {slide.highlight}
            </p>
          </div>
        </GradientPanel>
      )}
    </div>
  );
}

/* ─── PILLARS ─── */
function PillarsLayout({ slide, colors, s }) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <h2 style={{
        fontSize: `${58 * s}px`, fontWeight: 800, lineHeight: 1.1,
        margin: 0, color: colors.primary,
        fontFamily: HEADING, marginBottom: `${32 * s}px`,
      }}>
        {slide.title}
      </h2>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: `${18 * s}px`, justifyContent: 'center' }}>
        {(slide.items || []).map((item, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: `${20 * s}px`,
            background: `linear-gradient(135deg, ${colors.primary}08, ${colors.primary}03)`,
            border: `2px solid ${colors.primary}15`,
            borderLeft: `5px solid ${colors.primary}`,
            borderRadius: `${14 * s}px`,
            padding: `${20 * s}px ${24 * s}px`,
          }}>
            <IconBadge color={colors.primary} s={s} size={60}>
              {item.icon}
            </IconBadge>
            <div>
              <div style={{
                fontSize: `${30 * s}px`, fontWeight: 700, color: colors.primary,
                fontFamily: ACCENT, letterSpacing: '0.04em',
              }}>
                {item.label}
              </div>
              <div style={{
                fontSize: `${26 * s}px`, color: colors.textSecondary,
                fontFamily: BODY, marginTop: `${4 * s}px`,
              }}>
                {item.desc}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── CHECKLIST ─── */
function ChecklistLayout({ slide, colors, s }) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <DotPattern color={colors.primary} s={s} x={820} y={60} rows={4} cols={4} />

      <h2 style={{
        fontSize: `${58 * s}px`, fontWeight: 800, lineHeight: 1.1,
        margin: 0, color: colors.primary,
        fontFamily: HEADING, marginBottom: `${14 * s}px`,
        whiteSpace: 'pre-line',
      }}>
        {slide.title}
      </h2>

      {slide.subtitle && (
        <p style={{
          fontSize: `${28 * s}px`, color: colors.textSecondary, fontFamily: BODY,
          marginBottom: `${22 * s}px`, lineHeight: 1.4,
        }}>
          {slide.subtitle}
        </p>
      )}

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: `${16 * s}px`, justifyContent: 'center' }}>
        {(slide.items || []).map((item, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: `${18 * s}px`,
            background: i % 2 === 0 ? `${colors.primary}06` : 'transparent',
            borderRadius: `${10 * s}px`,
            padding: `${12 * s}px ${16 * s}px`,
          }}>
            <div style={{
              width: `${48 * s}px`, height: `${48 * s}px`,
              borderRadius: `${12 * s}px`,
              background: `linear-gradient(135deg, ${colors.primary}20, ${colors.primary}08)`,
              border: `2px solid ${colors.primary}30`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: `${24 * s}px`, fontWeight: 700, color: colors.primary,
              flexShrink: 0,
            }}>
              {slide.itemIcons ? slide.itemIcons[i] : '✓'}
            </div>
            <span style={{
              fontSize: `${28 * s}px`, lineHeight: 1.45, color: colors.text,
              fontFamily: BODY, fontWeight: 400,
            }}>
              {item}
            </span>
          </div>
        ))}
      </div>

      {slide.footer && (
        <div style={{
          marginTop: `${18 * s}px`,
          background: `linear-gradient(135deg, ${colors.accent || colors.primary}10, ${colors.primary}06)`,
          borderRadius: `${12 * s}px`,
          padding: `${18 * s}px ${24 * s}px`,
          borderLeft: `5px solid ${colors.accent || colors.primary}`,
        }}>
          <p style={{
            fontSize: `${32 * s}px`, fontWeight: 700, color: colors.accent || colors.primary,
            fontFamily: HEADING, fontStyle: 'italic', margin: 0,
          }}>
            {slide.footer}
          </p>
        </div>
      )}
    </div>
  );
}

/* ─── NUMBERED LIST ─── */
function NumberedLayout({ slide, colors, s }) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <h2 style={{
        fontSize: `${58 * s}px`, fontWeight: 800, lineHeight: 1.1,
        margin: 0, color: colors.primary,
        fontFamily: HEADING, marginBottom: `${28 * s}px`,
        whiteSpace: 'pre-line',
      }}>
        {slide.title}
      </h2>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: `${16 * s}px`, justifyContent: 'center' }}>
        {(slide.items || []).map((item, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: `${18 * s}px`,
            background: `${colors.primary}05`,
            borderRadius: `${12 * s}px`,
            padding: `${14 * s}px ${18 * s}px`,
            borderLeft: `4px solid ${colors.primary}${30 + i * 15 > 99 ? '' : ''}${Math.min(30 + i * 15, 99)}`,
          }}>
            <div style={{
              width: `${54 * s}px`, height: `${54 * s}px`,
              borderRadius: `${12 * s}px`,
              background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent || colors.primary})`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: `${28 * s}px`, fontWeight: 800, color: '#ffffff',
              flexShrink: 0, fontFamily: ACCENT,
            }}>
              {i + 1}
            </div>
            <span style={{
              fontSize: `${28 * s}px`, lineHeight: 1.45, color: colors.text,
              fontFamily: BODY, fontWeight: 400,
            }}>
              {item}
            </span>
          </div>
        ))}
      </div>

      {slide.footer && (
        <GradientPanel color={colors.accent || colors.primary} s={s}>
          <div style={{ display: 'flex', alignItems: 'center', gap: `${12 * s}px` }}>
            <span style={{ fontSize: `${28 * s}px` }}>🏆</span>
            <p style={{
              fontSize: `${30 * s}px`, fontWeight: 700, color: colors.accent || colors.primary,
              fontFamily: HEADING, fontStyle: 'italic', margin: 0,
            }}>
              {slide.footer}
            </p>
          </div>
        </GradientPanel>
      )}
    </div>
  );
}

/* ─── SPLIT ─── */
function SplitLayout({ slide, colors, s }) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <h2 style={{
        fontSize: `${58 * s}px`, fontWeight: 800, lineHeight: 1.1,
        margin: 0, color: colors.primary,
        fontFamily: HEADING, marginBottom: `${28 * s}px`,
        whiteSpace: 'pre-line',
      }}>
        {slide.title}
      </h2>

      <div style={{ flex: 1, display: 'flex', gap: `${24 * s}px` }}>
        {/* Left panel */}
        <div style={{
          flex: 1, background: `${colors.primary}06`,
          border: `2px solid ${colors.primary}12`,
          borderRadius: `${16 * s}px`, padding: `${24 * s}px`,
        }}>
          <h3 style={{
            fontSize: `${24 * s}px`, fontWeight: 600, color: colors.primary,
            fontFamily: ACCENT, margin: 0, marginBottom: `${20 * s}px`,
            textTransform: 'uppercase', letterSpacing: '0.06em',
            borderBottom: `2px solid ${colors.primary}15`,
            paddingBottom: `${12 * s}px`,
          }}>
            {slide.leftTitle}
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: `${16 * s}px` }}>
            {(slide.leftItems || []).map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: `${14 * s}px` }}>
                <div style={{
                  width: `${36 * s}px`, height: `${36 * s}px`, borderRadius: '50%',
                  background: `linear-gradient(135deg, ${colors.accent || colors.primary}, ${colors.primary})`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: `${18 * s}px`, color: '#ffffff', fontWeight: 700,
                  flexShrink: 0,
                }}>→</div>
                <span style={{ fontSize: `${28 * s}px`, color: colors.text, fontFamily: BODY }}>
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right panel - quote */}
        <div style={{
          flex: 1,
          background: `linear-gradient(135deg, ${colors.primary}0c, ${colors.accent || colors.primary}06)`,
          border: `2px solid ${colors.primary}18`,
          borderRadius: `${16 * s}px`,
          padding: `${28 * s}px`,
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
          position: 'relative',
        }}>
          {/* Large quote mark */}
          <div style={{
            position: 'absolute', top: `${12 * s}px`, left: `${18 * s}px`,
            fontSize: `${80 * s}px`, color: colors.primary, opacity: 0.08,
            fontFamily: 'Georgia, serif', lineHeight: 0.6,
          }}>"</div>
          <p style={{
            fontSize: `${26 * s}px`, lineHeight: 1.55, color: colors.text,
            fontFamily: HEADING, fontStyle: 'italic', fontWeight: 600,
            margin: 0, whiteSpace: 'pre-line', position: 'relative', zIndex: 1,
          }}>
            {slide.rightQuote}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ─── CTA ─── */
function CTALayout({ slide, colors, s, brand }) {
  const gold = colors.accent || colors.primary;
  return (
    <div style={{ flex: 1, display: 'flex', position: 'relative' }}>
      <DotPattern color={colors.primary} s={s} x={30} y={30} rows={3} cols={3} />

      {/* Left: Photo */}
      {brand.authorPhoto && (
        <div style={{
          width: `${320 * s}px`, display: 'flex', flexDirection: 'column',
          justifyContent: 'center', alignItems: 'center',
        }}>
          <div style={{
            width: `${260 * s}px`, height: `${260 * s}px`,
            borderRadius: `${20 * s}px`,
            overflow: 'hidden',
            border: `4px solid ${gold}`,
            boxShadow: `0 ${12 * s}px ${40 * s}px ${colors.primary}30`,
          }}>
            <img src={brand.authorPhoto} alt="" style={{
              width: '100%', height: '100%', objectFit: 'cover',
            }} />
          </div>
          <div style={{ marginTop: `${16 * s}px`, textAlign: 'center' }}>
            <div style={{ fontSize: `${26 * s}px`, fontWeight: 700, color: colors.text, fontFamily: HEADING }}>
              {brand.authorName}
            </div>
            <div style={{ fontSize: `${16 * s}px`, color: gold, fontWeight: 600, fontFamily: ACCENT, marginTop: `${4 * s}px` }}>
              {brand.authorTitle}
            </div>
          </div>
        </div>
      )}

      {/* Right: CTA content */}
      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column',
        justifyContent: 'center',
        paddingLeft: brand.authorPhoto ? `${20 * s}px` : 0,
        textAlign: brand.authorPhoto ? 'left' : 'center',
        alignItems: brand.authorPhoto ? 'flex-start' : 'center',
      }}>
        <h2 style={{
          fontSize: `${58 * s}px`, fontWeight: 800, color: colors.text,
          fontFamily: HEADING, margin: 0, lineHeight: 1.12,
          whiteSpace: 'pre-line', marginBottom: `${22 * s}px`,
        }}>
          {slide.title}
        </h2>

        <p style={{
          fontSize: `${26 * s}px`, color: colors.textSecondary,
          fontFamily: BODY, lineHeight: 1.5,
          marginBottom: `${28 * s}px`,
        }}>
          {slide.subtitle}
        </p>

        {/* Contact cards stacked */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: `${14 * s}px`, width: '100%' }}>
          {slide.phone && (
            <div style={{
              display: 'flex', alignItems: 'center', gap: `${14 * s}px`,
              background: `linear-gradient(135deg, ${colors.primary}10, ${colors.primary}05)`,
              border: `2px solid ${colors.primary}20`,
              borderRadius: `${14 * s}px`,
              padding: `${14 * s}px ${22 * s}px`,
            }}>
              <div style={{
                width: `${44 * s}px`, height: `${44 * s}px`, borderRadius: '50%',
                background: `linear-gradient(135deg, ${colors.primary}, ${gold})`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: `${22 * s}px`, color: '#fff',
              }}>📞</div>
              <span style={{
                fontSize: `${28 * s}px`, fontWeight: 700, color: colors.primary,
                fontFamily: ACCENT,
              }}>
                {slide.phone}
              </span>
            </div>
          )}
          {slide.calendly && (
            <div style={{
              display: 'flex', alignItems: 'center', gap: `${14 * s}px`,
              background: `linear-gradient(135deg, ${gold}10, ${gold}05)`,
              border: `2px solid ${gold}20`,
              borderRadius: `${14 * s}px`,
              padding: `${14 * s}px ${22 * s}px`,
            }}>
              <div style={{
                width: `${44 * s}px`, height: `${44 * s}px`, borderRadius: '50%',
                background: `linear-gradient(135deg, ${gold}, ${colors.primary})`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: `${22 * s}px`, color: '#fff',
              }}>📅</div>
              <span style={{
                fontSize: `${28 * s}px`, fontWeight: 700, color: gold,
                fontFamily: ACCENT,
              }}>
                {slide.calendly}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

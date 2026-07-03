import { useState, useEffect } from 'react'

// ── Fixed particle positions (randomising inside the component re-seeds every render) ──
const PARTICLES = [
  { x: '6%',  y: '22%', s: 2.5, d: 0,    t: 5   },
  { x: '18%', y: '68%', s: 3,   d: 1.2,  t: 6   },
  { x: '32%', y: '12%', s: 2,   d: 0.6,  t: 4.5 },
  { x: '48%', y: '84%', s: 2.5, d: 2.1,  t: 5.5 },
  { x: '63%', y: '28%', s: 3,   d: 0.9,  t: 4   },
  { x: '78%', y: '56%', s: 2,   d: 1.7,  t: 6   },
  { x: '88%', y: '18%', s: 2.5, d: 0.3,  t: 5   },
  { x: '72%', y: '78%', s: 2,   d: 1.4,  t: 4.5 },
  { x: '42%', y: '48%', s: 3,   d: 0.7,  t: 5.5 },
  { x: '14%', y: '40%', s: 2,   d: 2.3,  t: 4   },
  { x: '55%', y: '92%', s: 2,   d: 1.1,  t: 5   },
  { x: '93%', y: '62%', s: 2.5, d: 0.5,  t: 6   },
]

// ── Sequential typewriter hook ──────────────────────────────────────────────
function useSequentialTypewriter(targets, speed = 62, pauseBetween = 420) {
  const [typed, setTyped] = useState(targets.map(() => ''))
  const [wordIdx, setWordIdx] = useState(-1) // -1 = not started yet
  const [cursor, setCursor] = useState(true)
  const done = wordIdx >= targets.length

  // Kick off after a short delay on mount
  useEffect(() => {
    const t = setTimeout(() => setWordIdx(0), 900)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (wordIdx < 0 || done) return
    const target = targets[wordIdx]
    let charIdx = 0
    let timerId

    const step = () => {
      if (charIdx <= target.length) {
        const c = charIdx
        setTyped(prev => {
          const next = [...prev]
          next[wordIdx] = target.slice(0, c)
          return next
        })
        charIdx++
        timerId = setTimeout(step, speed)
      } else {
        timerId = setTimeout(() => setWordIdx(i => i + 1), pauseBetween)
      }
    }

    timerId = setTimeout(step, 0)
    return () => clearTimeout(timerId)
  }, [wordIdx])

  useEffect(() => {
    if (done) { setCursor(false); return }
    const id = setInterval(() => setCursor(c => !c), 530)
    return () => clearInterval(id)
  }, [done])

  return { typed, cursor, done }
}

// ── Animated number counter ─────────────────────────────────────────────────
function Counter({ target, suffix, duration = 1100, active }) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!active) return
    let rafId, start
    const step = (ts) => {
      if (!start) start = ts
      const p = Math.min((ts - start) / duration, 1)
      // ease-out cubic
      const eased = 1 - Math.pow(1 - p, 3)
      setVal(Math.floor(eased * target))
      if (p < 1) rafId = requestAnimationFrame(step)
    }
    rafId = requestAnimationFrame(step)
    return () => cancelAnimationFrame(rafId)
  }, [active, target, duration])
  return <>{val}{suffix}</>
}

// ── Hero ────────────────────────────────────────────────────────────────────
function Hero() {
  const { typed, cursor, done } = useSequentialTypewriter(['Build.', 'Ship.', 'Grow.'])

  const [showDesc,  setShowDesc]  = useState(false)
  const [showStats, setShowStats] = useState(false)
  const [showCTAs,  setShowCTAs]  = useState(false)

  useEffect(() => {
    if (!done) return
    const t1 = setTimeout(() => setShowDesc(true),  150)
    const t2 = setTimeout(() => setShowStats(true), 600)
    const t3 = setTimeout(() => setShowCTAs(true),  1050)
    return () => [t1, t2, t3].forEach(clearTimeout)
  }, [done])

  const cursorEl = (
    <span
      aria-hidden="true"
      style={{
        display: 'inline-block',
        width: '3px',
        height: '0.8em',
        background: '#2563EB',
        marginLeft: '5px',
        verticalAlign: 'middle',
        borderRadius: '2px',
        opacity: cursor ? 1 : 0,
        transition: 'opacity 0.08s',
      }}
    />
  )

  const fadeStyle = (show, delay = 0) => ({
    opacity: show ? 1 : 0,
    transform: show ? 'translateY(0)' : 'translateY(14px)',
    transition: `opacity 0.65s ease ${delay}s, transform 0.65s ease ${delay}s`,
  })

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        background: '#080e28',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        padding: '6rem 1.5rem',
      }}
    >
      {/* ── Rotating conic depth layer ── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: '-60%',
          background:
            'conic-gradient(from 0deg at 50% 50%, transparent 0deg, rgba(37,99,235,0.05) 60deg, transparent 120deg, rgba(37,99,235,0.03) 200deg, transparent 260deg)',
          animation: 'slowSpin 28s linear infinite',
          pointerEvents: 'none',
        }}
      />

      {/* ── Ambient glows ── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '-5%',
          right: '0%',
          width: '750px',
          height: '750px',
          background: 'radial-gradient(circle, rgba(37,99,235,0.22) 0%, transparent 70%)',
          animation: 'pulseGlow 6s ease-in-out infinite',
          pointerEvents: 'none',
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: '5%',
          left: '-5%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(37,99,235,0.12) 0%, transparent 70%)',
          animation: 'pulseGlow 8s ease-in-out 2s infinite',
          pointerEvents: 'none',
        }}
      />

      {/* ── Dot grid ── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'radial-gradient(circle, rgba(255,255,255,0.055) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
          pointerEvents: 'none',
        }}
      />

      {/* ── Floating particles ── */}
      {PARTICLES.map((p) => (
        <div
          key={`${p.x}-${p.y}`}
          aria-hidden="true"
          style={{
            position: 'absolute',
            left: p.x,
            top: p.y,
            width: `${p.s}px`,
            height: `${p.s}px`,
            borderRadius: '50%',
            background: '#2563EB',
            boxShadow: `0 0 ${p.s * 3}px ${p.s}px rgba(37,99,235,0.4)`,
            animation: `float ${p.t}s ease-in-out ${p.d}s infinite`,
            pointerEvents: 'none',
          }}
        />
      ))}

      {/* ── Main content ── */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          textAlign: 'center',
          maxWidth: '860px',
          width: '100%',
        }}
      >
        {/* Eyebrow badge */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(37,99,235,0.12)',
            border: '1px solid rgba(37,99,235,0.3)',
            borderRadius: '999px',
            padding: '6px 16px',
            marginBottom: '2.25rem',
            animation: 'fadeUp 0.7s ease 0.2s both',
          }}
        >
          <span
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: '#2563EB',
              display: 'inline-block',
              boxShadow: '0 0 6px 2px rgba(37,99,235,0.6)',
            }}
          />
          <span
            style={{
              fontFamily: 'DM Sans, sans-serif',
              color: '#93b4ff',
              fontWeight: 600,
              fontSize: '13px',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
            }}
          >
            Software Development Studio
          </span>
        </div>

        {/* Typewriter headline — pre-allocate 3 lines to prevent layout shift */}
        <h1
          style={{
            fontFamily: 'Syne, sans-serif',
            fontWeight: 800,
            fontSize: 'clamp(3.5rem, 11vw, 7rem)',
            lineHeight: 1.0,
            letterSpacing: '-0.025em',
            color: '#ffffff',
            minHeight: '3em',
            animation: 'fadeUp 0.7s ease 0.5s both',
          }}
        >
          <span style={{ display: 'block' }}>{typed[0]}</span>
          <span style={{ display: 'block' }}>{typed[1]}</span>
          <span style={{ display: 'block', color: '#2563EB' }}>
            {typed[2]}
            {!done && typed[2] !== undefined && cursorEl}
          </span>
        </h1>

        {/* Description */}
        <p
          style={{
            fontFamily: 'DM Sans, sans-serif',
            color: 'rgba(255,255,255,0.52)',
            fontSize: 'clamp(1rem, 1.8vw, 1.15rem)',
            lineHeight: 1.75,
            maxWidth: '480px',
            margin: '2rem auto 0',
            ...fadeStyle(showDesc),
          }}
        >
          I design and build high-quality web applications and APIs — turning your ideas into
          products your users will love.
        </p>

        {/* Stats row */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 'clamp(2rem, 6vw, 5rem)',
            marginTop: '2.75rem',
            paddingTop: '2.5rem',
            borderTop: '1px solid rgba(255,255,255,0.08)',
            ...fadeStyle(showStats),
          }}
        >
          {[
            { target: 100, suffix: '%', label: 'Client-First'      },
            { target: 5,   suffix: '★', label: 'Passion-Driven'    },
            { target: 24,  suffix: 'h', label: 'Response Time'     },
          ].map(({ target, suffix, label }) => (
            <div key={label}>
              <div
                style={{
                  fontFamily: 'Syne, sans-serif',
                  fontWeight: 800,
                  fontSize: 'clamp(2rem, 5vw, 3rem)',
                  color: '#ffffff',
                  lineHeight: 1,
                  letterSpacing: '-0.02em',
                }}
              >
                <Counter target={target} suffix={suffix} active={showStats} />
              </div>
              <div
                style={{
                  fontFamily: 'DM Sans, sans-serif',
                  color: 'rgba(255,255,255,0.38)',
                  fontSize: '12px',
                  fontWeight: 500,
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  marginTop: '5px',
                }}
              >
                {label}
              </div>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '1rem',
            flexWrap: 'wrap',
            marginTop: '2.5rem',
            ...fadeStyle(showCTAs),
          }}
        >
          <a
            href="#portfolio"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '15px 36px',
              borderRadius: '999px',
              background: '#2563EB',
              color: '#ffffff',
              fontFamily: 'DM Sans, sans-serif',
              fontWeight: 600,
              fontSize: '15px',
              textDecoration: 'none',
              boxShadow: '0 0 32px rgba(37,99,235,0.4)',
              transition: 'background 0.2s, transform 0.2s, box-shadow 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#1d4ed8'
              e.currentTarget.style.transform = 'scale(1.05)'
              e.currentTarget.style.boxShadow = '0 0 48px rgba(37,99,235,0.6)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#2563EB'
              e.currentTarget.style.transform = 'scale(1)'
              e.currentTarget.style.boxShadow = '0 0 32px rgba(37,99,235,0.4)'
            }}
          >
            View My Work
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>

          <a
            href="#contact"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '15px 36px',
              borderRadius: '999px',
              border: '1px solid rgba(255,255,255,0.18)',
              color: '#ffffff',
              fontFamily: 'DM Sans, sans-serif',
              fontWeight: 600,
              fontSize: '15px',
              textDecoration: 'none',
              transition: 'border-color 0.2s, background 0.2s, transform 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.45)'
              e.currentTarget.style.background = 'rgba(255,255,255,0.07)'
              e.currentTarget.style.transform = 'scale(1.03)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)'
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.transform = 'scale(1)'
            }}
          >
            Start a Project
          </a>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <div
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '6px',
          color: 'rgba(255,255,255,0.2)',
          userSelect: 'none',
          animation: 'fadeIn 1s ease 4s both',
        }}
      >
        <span
          style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: '10px',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
          }}
        >
          Scroll
        </span>
        <svg
          width="14"
          height="14"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          style={{ animation: 'bounce 1.6s ease-in-out infinite' }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  )
}

export default Hero

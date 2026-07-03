const VALUES = [
  {
    label: 'Your Goals Come First',
    desc: 'I listen before I build. What matters to you — your customers, your business, your vision — shapes every decision I make.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
  },
  {
    label: 'Built to Last',
    desc: "I take pride in what I put my name on. That means doing it properly the first time — so it works today and still works a year from now.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    label: 'Quality Over Rush',
    desc: 'Good work takes the time it deserves. I focus on getting it right — because a product that actually works is always worth it.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
]

const STACK = ['React', '.NET / C#', 'TypeScript', 'Node.js', 'SQL', 'REST APIs', 'Git']

export default function About() {
  return (
    <section
      id="about"
      style={{
        background: '#080B1A',
        padding: '6rem 1.5rem',
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* ── Two-column layout ── */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))',
            gap: '4rem',
            alignItems: 'center',
          }}
        >

          {/* ── Left: Text ── */}
          <div>
            {/* Eyebrow */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <span
                style={{
                  display: 'inline-block',
                  width: '32px',
                  height: '2px',
                  background: '#2563EB',
                  borderRadius: '2px',
                }}
              />
              <span
                style={{
                  fontSize: '12px',
                  fontWeight: 600,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: '#2563EB',
                  fontFamily: 'Syne, sans-serif',
                }}
              >
                The Person Behind the Code
              </span>
            </div>

            <h2
              style={{
                fontFamily: 'Syne, sans-serif',
                fontWeight: 700,
                fontSize: 'clamp(2rem, 4vw, 2.75rem)',
                color: '#ffffff',
                lineHeight: 1.15,
                margin: '0 0 1.5rem 0',
              }}
            >
              Hi, I'm Tom —<br />
              <span style={{ color: '#2563EB' }}>I build for the web.</span>
            </h2>

            <p
              style={{
                fontSize: '1.0625rem',
                color: '#94A3B8',
                lineHeight: 1.75,
                margin: '0 0 1.1rem 0',
              }}
            >
              Got an idea for a website, an online store, or a digital product? I'm Tom Vuma, and I
              build it — properly, from the ground up. You don't need to understand the technical
              side. You just need a vision, and I'll handle the rest.
            </p>

            <p
              style={{
                fontSize: '1.0625rem',
                color: '#94A3B8',
                lineHeight: 1.75,
                margin: '0 0 2.5rem 0',
              }}
            >
              I work with small businesses, entrepreneurs, and founders who want a strong, professional
              presence online. Whether it's a simple website that makes you look your best, or a full
              platform built for real customers — I take care of every part so you can focus on
              what you do best.
            </p>

            {/* Values */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2.5rem' }}>
              {VALUES.map(({ label, desc, icon }) => (
                <div
                  key={label}
                  style={{
                    display: 'flex',
                    gap: '1rem',
                    alignItems: 'flex-start',
                  }}
                >
                  <div
                    style={{
                      flexShrink: 0,
                      width: '40px',
                      height: '40px',
                      borderRadius: '10px',
                      background: 'rgba(37,99,235,0.12)',
                      color: '#2563EB',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {icon}
                  </div>
                  <div>
                    <div
                      style={{
                        fontFamily: 'Syne, sans-serif',
                        fontWeight: 600,
                        fontSize: '0.9375rem',
                        color: '#ffffff',
                        marginBottom: '0.25rem',
                      }}
                    >
                      {label}
                    </div>
                    <div style={{ fontSize: '0.875rem', color: '#64748B', lineHeight: 1.6 }}>
                      {desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <a
              href="#contact"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: '#2563EB',
                color: '#ffffff',
                padding: '0.8125rem 1.75rem',
                borderRadius: '10px',
                fontFamily: 'Syne, sans-serif',
                fontWeight: 600,
                fontSize: '0.9375rem',
                textDecoration: 'none',
                transition: 'background 0.2s, box-shadow 0.2s',
                boxShadow: '0 0 24px rgba(37,99,235,0.3)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = '#1d4ed8'
                e.currentTarget.style.boxShadow = '0 0 36px rgba(37,99,235,0.5)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = '#2563EB'
                e.currentTarget.style.boxShadow = '0 0 24px rgba(37,99,235,0.3)'
              }}
            >
              Work With Me
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>

          {/* ── Right: Visual card ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

            {/* Monogram card */}
            <div
              style={{
                background: 'linear-gradient(135deg, #0F1535 0%, #111827 100%)',
                border: '1px solid rgba(37,99,235,0.2)',
                borderRadius: '24px',
                padding: '2.5rem',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Glow orb behind monogram */}
              <div
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '200px',
                  height: '200px',
                  background: 'radial-gradient(circle, rgba(37,99,235,0.18) 0%, transparent 70%)',
                  pointerEvents: 'none',
                }}
              />

              {/* Photo */}
              <div
                style={{
                  width: '110px',
                  height: '110px',
                  borderRadius: '50%',
                  margin: '0 auto 1.5rem auto',
                  border: '3px solid rgba(37,99,235,0.4)',
                  boxShadow: '0 0 0 6px rgba(37,99,235,0.08)',
                  overflow: 'hidden',
                  flexShrink: 0,
                }}
              >
                <img
                  src="/images/tom.jpg"
                  alt="Tom Vuma"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
                />
              </div>

              <div
                style={{
                  fontFamily: 'Syne, sans-serif',
                  fontWeight: 700,
                  fontSize: '1.25rem',
                  color: '#ffffff',
                  marginBottom: '0.4rem',
                }}
              >
                Tom Vuma
              </div>
              <div style={{ fontSize: '0.875rem', color: '#64748B', marginBottom: '1.75rem' }}>
                Founder, CodeVuma · South Africa
              </div>

              {/* Status badge */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  background: 'rgba(34,197,94,0.1)',
                  border: '1px solid rgba(34,197,94,0.25)',
                  borderRadius: '100px',
                  padding: '0.4rem 1rem',
                  fontSize: '0.8125rem',
                  color: '#4ade80',
                  fontWeight: 500,
                }}
              >
                <span
                  style={{
                    width: '7px',
                    height: '7px',
                    borderRadius: '50%',
                    background: '#4ade80',
                    boxShadow: '0 0 6px #4ade80',
                    animation: 'pulseGlow 2s ease-in-out infinite',
                  }}
                />
                Available for new projects
              </div>
            </div>

            {/* Tech stack card */}
            <div
              style={{
                background: '#0F1535',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: '20px',
                padding: '1.5rem',
              }}
            >
              <div
                style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: '#475569',
                  marginBottom: '1rem',
                  fontFamily: 'Syne, sans-serif',
                }}
              >
                Tech Stack
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {STACK.map(tech => (
                  <span
                    key={tech}
                    style={{
                      display: 'inline-block',
                      background: 'rgba(37,99,235,0.08)',
                      border: '1px solid rgba(37,99,235,0.18)',
                      borderRadius: '8px',
                      padding: '0.3rem 0.75rem',
                      fontSize: '0.8125rem',
                      color: '#93C5FD',
                      fontWeight: 500,
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}

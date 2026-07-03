import useProjects from '../../hooks/useProjects'

function SkeletonCard() {
  return (
    <div
      style={{
        background: '#fff',
        borderRadius: '20px',
        overflow: 'hidden',
        border: '1px solid #f3f4f6',
      }}
    >
      <div style={{ height: '200px', background: '#f3f4f6' }} />
      <div style={{ padding: '1.5rem' }}>
        {[75, 100, 85, 60].map((w, i) => (
          <div
            key={i}
            style={{
              height: i === 0 ? '18px' : '14px',
              background: '#f3f4f6',
              borderRadius: '8px',
              width: `${w}%`,
              marginBottom: i < 3 ? '10px' : 0,
            }}
          />
        ))}
      </div>
    </div>
  )
}

function ProjectCard({ title, description, url, imageUrl }) {
  return (
    <article
      style={{
        background: '#ffffff',
        borderRadius: '20px',
        overflow: 'hidden',
        border: '1px solid #f3f4f6',
        boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
        display: 'flex',
        flexDirection: 'column',
        transition: 'box-shadow 0.25s, transform 0.25s',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 16px 48px rgba(0,0,0,0.12)'
        e.currentTarget.style.transform = 'translateY(-4px)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,0.06)'
        e.currentTarget.style.transform = 'translateY(0)'
      }}
    >
      {/* Thumbnail */}
      <div style={{ height: '200px', overflow: 'hidden', flexShrink: 0 }}>
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <div
            style={{
              width: '100%',
              height: '100%',
              background: 'linear-gradient(135deg, #161d45 0%, #0D1230 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg width="40" height="40" fill="none" viewBox="0 0 24 24" stroke="rgba(255,255,255,0.15)" strokeWidth={1.5}>
              <rect x="3" y="3" width="18" height="18" rx="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M3 9h18" strokeLinecap="round" />
              <path d="M9 21V9" strokeLinecap="round" />
            </svg>
          </div>
        )}
      </div>

      {/* Body */}
      <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <h3
          style={{
            fontFamily: 'Syne, sans-serif',
            fontWeight: 600,
            fontSize: '1.05rem',
            color: '#0D1230',
            marginBottom: '0.5rem',
            lineHeight: 1.3,
          }}
        >
          {title}
        </h3>
        <p
          style={{
            fontFamily: 'DM Sans, sans-serif',
            color: '#5A6481',
            fontSize: '14px',
            lineHeight: 1.7,
            flex: 1,
            margin: 0,
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {description}
        </p>

        {url && (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              marginTop: '1.25rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              color: '#2563EB',
              fontFamily: 'DM Sans, sans-serif',
              fontWeight: 600,
              fontSize: '14px',
              textDecoration: 'none',
            }}
          >
            View Live
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        )}
      </div>
    </article>
  )
}

function EmptyState() {
  return (
    <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '5rem 0' }}>
      <div
        style={{
          width: '64px',
          height: '64px',
          borderRadius: '16px',
          background: 'rgba(13,18,48,0.05)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.25rem',
        }}
      >
        <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="rgba(90,100,129,0.5)" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      </div>
      <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 600, color: '#0D1230', fontSize: '1.1rem', marginBottom: '0.5rem' }}>
        Projects coming soon
      </p>
      <p style={{ fontFamily: 'DM Sans, sans-serif', color: '#5A6481', fontSize: '14px' }}>
        Check back soon — new work is being added.
      </p>
    </div>
  )
}

function ErrorState() {
  return (
    <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '5rem 0' }}>
      <p style={{ fontFamily: 'DM Sans, sans-serif', color: '#5A6481', fontSize: '14px' }}>
        Could not load projects. Make sure the backend is running.
      </p>
    </div>
  )
}

function Portfolio() {
  const { projects, loading, error } = useProjects()

  return (
    <section id="portfolio" style={{ background: '#f8fafc', padding: '6rem 0' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>

        {/* Centred header */}
        <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 4rem auto' }}>
          <p
            style={{
              fontFamily: 'DM Sans, sans-serif',
              color: '#2563EB',
              fontWeight: 600,
              fontSize: '13px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              marginBottom: '1rem',
            }}
          >
            My Work
          </p>
          <h2
            style={{
              fontFamily: 'Syne, sans-serif',
              fontWeight: 700,
              fontSize: 'clamp(1.9rem, 4vw, 2.75rem)',
              color: '#0D1230',
              lineHeight: 1.1,
              marginBottom: '1rem',
            }}
          >
            Built with Purpose
          </h2>
          <p
            style={{
              fontFamily: 'DM Sans, sans-serif',
              color: '#5A6481',
              fontSize: '1.05rem',
              lineHeight: 1.7,
              margin: 0,
            }}
          >
            A selection of projects I&apos;ve designed, built, and shipped — each one solving a
            real problem.
          </p>
        </div>

        {/* Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))',
            gap: '1.5rem',
          }}
        >
          {loading && Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)}
          {error && <ErrorState />}
          {!loading && !error && projects.length === 0 && <EmptyState />}
          {!loading && !error && projects.map((p) => <ProjectCard key={p.id} {...p} />)}
        </div>

        {/* CTA */}
        {!loading && !error && projects.length > 0 && (
          <div style={{ textAlign: 'center', marginTop: '4rem' }}>
            <p
              style={{
                fontFamily: 'DM Sans, sans-serif',
                color: '#5A6481',
                fontSize: '15px',
                marginBottom: '1.25rem',
              }}
            >
              Interested in working together?
            </p>
            <a
              href="#contact"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '14px 32px',
                borderRadius: '999px',
                background: '#0D1230',
                color: '#ffffff',
                fontFamily: 'DM Sans, sans-serif',
                fontWeight: 600,
                fontSize: '15px',
                textDecoration: 'none',
              }}
            >
              Start a Project
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        )}
      </div>
    </section>
  )
}

export default Portfolio

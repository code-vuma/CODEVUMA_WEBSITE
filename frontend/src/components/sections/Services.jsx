const SERVICES = [
  {
    title: 'Full-Stack Web Apps',
    description:
      'End-to-end web applications built with modern frameworks — from clean frontends to robust, scalable backends.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    title: 'API & Backend Systems',
    description:
      'RESTful APIs and database architecture designed for performance, reliability, and security.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      </svg>
    ),
  },
  {
    title: 'UI/UX Design',
    description:
      'Clean, conversion-focused interfaces that balance aesthetics with usability — crafted to make users stay.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    ),
  },
]

function ServiceCard({ title, description, icon, index }) {
  const num = String(index + 1).padStart(2, '0')
  return (
    <div
      style={{
        position: 'relative',
        background: '#ffffff',
        borderRadius: '20px',
        padding: '2rem',
        border: '1px solid #f3f4f6',
        boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
        transition: 'box-shadow 0.25s, transform 0.25s',
        cursor: 'default',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.12)'
        e.currentTarget.style.transform = 'translateY(-4px)'
        e.currentTarget.querySelector('.svc-icon').style.background = '#2563EB'
        e.currentTarget.querySelector('.svc-icon').style.color = '#fff'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,0.06)'
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.querySelector('.svc-icon').style.background = 'rgba(37,99,235,0.08)'
        e.currentTarget.querySelector('.svc-icon').style.color = '#2563EB'
      }}
    >
      {/* Card number */}
      <span
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '1.25rem',
          right: '1.5rem',
          fontFamily: 'Syne, sans-serif',
          fontWeight: 700,
          fontSize: '13px',
          color: '#e5e7eb',
          userSelect: 'none',
        }}
      >
        {num}
      </span>

      {/* Icon */}
      <div
        className="svc-icon"
        style={{
          width: '48px',
          height: '48px',
          borderRadius: '12px',
          background: 'rgba(37,99,235,0.08)',
          color: '#2563EB',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '1.25rem',
          transition: 'background 0.25s, color 0.25s',
        }}
      >
        <div style={{ width: '24px', height: '24px' }}>{icon}</div>
      </div>

      <h3
        style={{
          fontFamily: 'Syne, sans-serif',
          fontWeight: 600,
          fontSize: '1.05rem',
          color: '#0D1230',
          marginBottom: '0.6rem',
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
          margin: 0,
        }}
      >
        {description}
      </p>
    </div>
  )
}

function Services() {
  return (
    <section id="services" style={{ background: '#ffffff', padding: '6rem 0', borderBottom: '1px solid #f3f4f6' }}>
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
            What I Do
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
            Services Built to Scale
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
            From idea to production — I cover every layer of the stack so you can focus on
            growing your business.
          </p>
        </div>

        {/* Cards grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 320px), 1fr))',
            gap: '1.5rem',
          }}
        >
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.title} {...service} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services

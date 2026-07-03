import Logo from '../ui/Logo'

const year = new Date().getFullYear()

const linkStyle = {
  fontFamily: 'DM Sans, sans-serif',
  color: 'rgba(255,255,255,0.45)',
  fontSize: '14px',
  textDecoration: 'none',
  transition: 'color 0.2s',
}

function Footer() {
  return (
    <footer
      style={{
        background: '#0D1230',
        borderTop: '1px solid rgba(255,255,255,0.12)',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '2.5rem 1.5rem',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1.5rem',
        }}
      >
        {/* Brand */}
        <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
          <Logo className="h-7 w-7" />
          <span
            style={{
              fontFamily: 'Syne, sans-serif',
              color: '#ffffff',
              fontWeight: 600,
              fontSize: '1.1rem',
            }}
          >
            Code<span style={{ color: '#2563EB' }}>Vuma</span>
          </span>
        </a>

        {/* Tagline */}
        <p
          style={{
            fontFamily: 'DM Sans, sans-serif',
            color: '#5A6481',
            fontSize: '13px',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
          }}
        >
          Build · Ship · Grow
        </p>

        {/* Links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <a
            href="https://substack.com/@codevuma"
            target="_blank"
            rel="noopener noreferrer"
            style={linkStyle}
          >
            Newsletter ↗
          </a>
          <a href="#portfolio" style={linkStyle}>Portfolio</a>
          <a href="#contact" style={linkStyle}>Contact</a>
        </nav>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <p
          style={{
            fontFamily: 'DM Sans, sans-serif',
            textAlign: 'center',
            color: 'rgba(90,100,129,0.5)',
            fontSize: '12px',
            padding: '1rem 1.5rem',
          }}
        >
          © {year} CodeVuma. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer

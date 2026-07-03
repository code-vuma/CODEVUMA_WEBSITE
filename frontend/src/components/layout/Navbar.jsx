import { useState, useEffect } from 'react'
import Logo from '../ui/Logo'

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Contact', href: '#contact' },
]

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        background: scrolled ? '#0D1230' : 'transparent',
        boxShadow: scrolled ? '0 4px 24px rgba(0,0,0,0.25)' : 'none',
        transition: 'background 0.3s, box-shadow 0.3s',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 1.5rem',
          height: '64px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Logo */}
        <a
          href="#"
          style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}
        >
          <Logo className="h-8 w-8" />
          <span
            style={{
              fontFamily: 'Syne, sans-serif',
              color: '#ffffff',
              fontWeight: 600,
              fontSize: '1.15rem',
            }}
          >
            Code<span style={{ color: '#2563EB' }}>Vuma</span>
          </span>
        </a>

        {/* Desktop nav */}
        <nav
          aria-label="Main navigation"
          style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}
          className="hidden md:flex"
        >
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              style={{
                fontFamily: 'DM Sans, sans-serif',
                color: 'rgba(255,255,255,0.7)',
                fontSize: '14px',
                fontWeight: 500,
                textDecoration: 'none',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.7)')}
            >
              {label}
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <a
          href="#contact"
          className="hidden md:inline-flex"
          style={{
            alignItems: 'center',
            padding: '8px 20px',
            borderRadius: '999px',
            background: '#2563EB',
            color: '#ffffff',
            fontFamily: 'DM Sans, sans-serif',
            fontWeight: 600,
            fontSize: '14px',
            textDecoration: 'none',
            transition: 'background 0.2s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = '#1d4ed8')}
          onMouseLeave={(e) => (e.currentTarget.style.background = '#2563EB')}
        >
          Get in Touch
        </a>

        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          className="md:hidden"
          style={{
            background: 'none',
            border: 'none',
            color: '#ffffff',
            cursor: 'pointer',
            padding: '4px',
          }}
        >
          {menuOpen ? (
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className="md:hidden"
        style={{
          overflow: 'hidden',
          maxHeight: menuOpen ? '320px' : '0',
          opacity: menuOpen ? 1 : 0,
          transition: 'max-height 0.3s ease, opacity 0.3s ease',
        }}
      >
        <nav
          aria-label="Mobile navigation"
          style={{
            background: '#0D1230',
            borderTop: '1px solid rgba(255,255,255,0.08)',
            padding: '1.25rem 1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
        >
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              onClick={closeMenu}
              style={{
                fontFamily: 'DM Sans, sans-serif',
                color: 'rgba(255,255,255,0.8)',
                fontSize: '15px',
                fontWeight: 500,
                textDecoration: 'none',
                padding: '4px 0',
              }}
            >
              {label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={closeMenu}
            style={{
              marginTop: '4px',
              display: 'flex',
              justifyContent: 'center',
              padding: '12px 20px',
              borderRadius: '999px',
              background: '#2563EB',
              color: '#ffffff',
              fontFamily: 'DM Sans, sans-serif',
              fontWeight: 600,
              fontSize: '15px',
              textDecoration: 'none',
            }}
          >
            Get in Touch
          </a>
        </nav>
      </div>
    </header>
  )
}

export default Navbar

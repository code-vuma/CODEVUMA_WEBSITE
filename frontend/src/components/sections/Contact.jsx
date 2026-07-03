import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { submitContact } from '../../services/api'

const schema = yup.object({
  name: yup.string().required('Name is required.').max(100, 'Max 100 characters.'),
  email: yup
    .string()
    .required('Email is required.')
    .email('Enter a valid email address.')
    .max(200, 'Max 200 characters.'),
  message: yup.string().required('Message is required.').max(2000, 'Max 2000 characters.'),
})

function Field({ label, id, error, children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      <label
        htmlFor={id}
        style={{ fontSize: '14px', fontWeight: 500, color: '#0D1230', fontFamily: 'DM Sans, sans-serif' }}
      >
        {label}
      </label>
      {children}
      {error && (
        <p style={{ fontSize: '12px', color: '#ef4444', fontFamily: 'DM Sans, sans-serif' }}>
          {error}
        </p>
      )}
    </div>
  )
}

function SuccessState() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '3rem 0',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          background: 'rgba(37,99,235,0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '1.5rem',
        }}
      >
        <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="#2563EB" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h3
        style={{
          fontFamily: 'Syne, sans-serif',
          fontWeight: 700,
          fontSize: '1.5rem',
          color: '#0D1230',
          marginBottom: '0.75rem',
        }}
      >
        Message sent!
      </h3>
      <p style={{ fontFamily: 'DM Sans, sans-serif', color: '#5A6481', fontSize: '1rem' }}>
        I&apos;ll be in touch within 24 hours.
      </p>
    </div>
  )
}

const inputStyle = {
  width: '100%',
  borderRadius: '12px',
  border: '1px solid #e5e7eb',
  padding: '12px 16px',
  fontSize: '14px',
  fontFamily: 'DM Sans, sans-serif',
  color: '#0D1230',
  background: '#f9fafb',
  outline: 'none',
  boxSizing: 'border-box',
  transition: 'border-color 0.2s, box-shadow 0.2s',
}

const inputErrorStyle = {
  ...inputStyle,
  background: '#fef2f2',
  border: '1px solid #fca5a5',
}

function ContactForm() {
  const [status, setStatus] = useState('idle')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) })

  const onSubmit = async (data) => {
    setStatus('loading')
    try {
      await submitContact(data)
      reset()
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') return <SuccessState />

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
    >
      {status === 'error' && (
        <div
          style={{
            background: '#fef2f2',
            border: '1px solid #fecaca',
            borderRadius: '12px',
            padding: '12px 16px',
            fontSize: '14px',
            color: '#dc2626',
            fontFamily: 'DM Sans, sans-serif',
          }}
        >
          Something went wrong. Please try again or email{' '}
          <a href="mailto:info@codevuma.co.za" style={{ color: '#dc2626', textDecoration: 'underline', fontWeight: 600 }}>
            info@codevuma.co.za
          </a>
        </div>
      )}

      <Field label="Name" id="contact-name" error={errors.name?.message}>
        <input
          id="contact-name"
          type="text"
          placeholder="Jane Smith"
          autoComplete="name"
          style={errors.name ? inputErrorStyle : inputStyle}
          {...register('name')}
        />
      </Field>

      <Field label="Email" id="contact-email" error={errors.email?.message}>
        <input
          id="contact-email"
          type="email"
          placeholder="jane@example.com"
          autoComplete="email"
          style={errors.email ? inputErrorStyle : inputStyle}
          {...register('email')}
        />
      </Field>

      <Field label="Message" id="contact-message" error={errors.message?.message}>
        <textarea
          id="contact-message"
          rows={5}
          placeholder="Tell me about your project..."
          style={{
            ...(errors.message ? inputErrorStyle : inputStyle),
            resize: 'none',
          }}
          {...register('message')}
        />
      </Field>

      <button
        type="submit"
        disabled={status === 'loading'}
        style={{
          marginTop: '4px',
          width: '100%',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          padding: '14px 32px',
          borderRadius: '12px',
          background: status === 'loading' ? '#93aff5' : '#2563EB',
          color: '#fff',
          fontFamily: 'DM Sans, sans-serif',
          fontWeight: 600,
          fontSize: '16px',
          border: 'none',
          cursor: status === 'loading' ? 'not-allowed' : 'pointer',
          transition: 'background 0.2s',
        }}
      >
        {status === 'loading' ? (
          'Sending...'
        ) : (
          <>
            Send Message
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </>
        )}
      </button>
    </form>
  )
}

function Contact() {
  return (
    <section
      id="contact"
      style={{ background: '#0D1230', paddingTop: '6rem', paddingBottom: '6rem' }}
    >
      <div style={{ maxWidth: '680px', margin: '0 auto', padding: '0 1.5rem' }}>

        {/* Centred header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
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
            Get in Touch
          </p>
          <h2
            style={{
              fontFamily: 'Syne, sans-serif',
              color: '#ffffff',
              fontWeight: 700,
              fontSize: 'clamp(2rem, 5vw, 2.75rem)',
              lineHeight: 1.1,
              marginBottom: '1rem',
            }}
          >
            Let&apos;s Build Something Together
          </h2>
          <p
            style={{
              fontFamily: 'DM Sans, sans-serif',
              color: 'rgba(255,255,255,0.55)',
              fontSize: '1.05rem',
              lineHeight: 1.7,
            }}
          >
            Have a project in mind? Fill out the form and I&apos;ll get back to you within 24
            hours.
          </p>
        </div>

        {/* Contact info row */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '2rem',
            marginBottom: '2.5rem',
          }}
        >
          {/* Email */}
          <a
            href="mailto:info@codevuma.co.za"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontFamily: 'DM Sans, sans-serif',
              color: 'rgba(255,255,255,0.7)',
              fontSize: '14px',
              fontWeight: 500,
              textDecoration: 'none',
            }}
          >
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#2563EB" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            info@codevuma.co.za
          </a>

          {/* Newsletter */}
          <a
            href="https://substack.com/@codevuma"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontFamily: 'DM Sans, sans-serif',
              color: 'rgba(255,255,255,0.7)',
              fontSize: '14px',
              fontWeight: 500,
              textDecoration: 'none',
            }}
          >
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#2563EB" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
            Newsletter on Substack ↗
          </a>

          {/* Response */}
          <span
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontFamily: 'DM Sans, sans-serif',
              color: 'rgba(255,255,255,0.7)',
              fontSize: '14px',
              fontWeight: 500,
            }}
          >
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#2563EB" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Responds within 24 hrs
          </span>
        </div>

        {/* Form card */}
        <div
          style={{
            background: '#ffffff',
            borderRadius: '24px',
            padding: '2.5rem',
            boxShadow: '0 24px 64px rgba(0,0,0,0.35)',
          }}
        >
          <h3
            style={{
              fontFamily: 'Syne, sans-serif',
              fontWeight: 700,
              fontSize: '1.35rem',
              color: '#0D1230',
              marginBottom: '4px',
            }}
          >
            Send me a message
          </h3>
          <p
            style={{
              fontFamily: 'DM Sans, sans-serif',
              color: '#5A6481',
              fontSize: '14px',
              marginBottom: '1.75rem',
            }}
          >
            I read every message and respond personally.
          </p>
          <ContactForm />
        </div>

      </div>
    </section>
  )
}

export default Contact

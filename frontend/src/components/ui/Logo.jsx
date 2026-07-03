function Logo({ className = 'h-8 w-8' }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* C arc */}
      <path
        d="M 85 30 A 40 40 0 1 0 85 70"
        stroke="#BFC4D8"
        strokeWidth="11"
        strokeLinecap="round"
        fill="none"
      />
      {/* Checkmark */}
      <path
        d="M 27 47 L 43 66 L 74 29"
        stroke="#2563EB"
        strokeWidth="11"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  )
}

export default Logo

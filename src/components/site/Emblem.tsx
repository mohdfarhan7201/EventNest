/** House emblem: a twelve-arch baradari reduced to a mark. */
export function Emblem({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true" className={className}>
      <path d="M24 3 L42 14 V17 H6 V14 Z" stroke="currentColor" strokeWidth="1" />
      <path d="M11 17 v20 M18.5 17 v20 M29.5 17 v20 M37 17 v20" stroke="currentColor" strokeWidth="1" />
      <path d="M18.5 30 a5.5 6 0 0 1 11 0 v7 h-11 z" stroke="currentColor" strokeWidth="1" />
      <path d="M6 41 h36 M8 45 h32" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

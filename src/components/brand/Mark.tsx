/* The five-element aperture symbol, paths lifted verbatim from the brand kit
   (01_Logo/SVG/Firstocean_Black Symbol.svg, 186-unit viewBox). Each crescent
   sits in its own group so the breath animation in globals.css can drift the
   pairs apart; the viewBox is cropped to the ink plus drift room. */
export function Mark({
  className,
  breathe = false,
}: {
  className?: string;
  breathe?: boolean;
}) {
  return (
    <svg
      viewBox="49 71 88 44"
      fill="currentColor"
      aria-hidden
      className={`${breathe ? "fo-breathe " : ""}${className ?? ""}`}
    >
      <path d="M79.72,92.27c0,6.63,2.26,12.74,6.07,17.61.52.67,1.32,1.08,2.17,1.08h10.09c.85,0,1.65-.41,2.17-1.08,3.8-4.88,6.07-10.98,6.07-17.61,0-5.92-1.8-11.42-4.89-16-.51-.76-1.36-1.22-2.28-1.22h-12.23c-.92,0-1.77.47-2.28,1.22-3.09,4.58-4.89,10.08-4.89,16Z" />
      <g className="drift-r-outer">
        <path d="M120.85,75.36v35.24c0,.24.27.4.48.27,6.49-4.04,10.73-10.53,10.73-17.89s-4.24-13.85-10.73-17.89c-.21-.13-.48.02-.48.27Z" />
      </g>
      <g className="drift-r-inner">
        <path d="M108.37,75.38v35.2c0,.25.28.4.49.26,6-4.04,9.91-10.52,9.91-17.86s-3.91-13.82-9.91-17.86c-.2-.14-.49.01-.49.26Z" />
      </g>
      <g className="drift-l-outer">
        <path d="M65.15,75.36v35.24c0,.24-.27.4-.48.27-6.49-4.04-10.73-10.53-10.73-17.89,0-7.36,4.24-13.85,10.73-17.89.21-.13.48.02.48.27Z" />
      </g>
      <g className="drift-l-inner">
        <path d="M77.63,75.38v35.2c0,.25-.28.4-.49.26-6-4.04-9.91-10.52-9.91-17.86,0-7.34,3.91-13.82,9.91-17.86.2-.14.49.01.49.26Z" />
      </g>
    </svg>
  );
}

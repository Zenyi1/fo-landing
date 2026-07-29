// Trial background: the mlp.com waves video, standing in for the GameOfLife
// pixel field. Fills its (relative) parent; pair with a dark scrim for legibility.
export function WaveBackground() {
  return (
    <video
      className="absolute inset-0 h-full w-full object-cover"
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
      aria-hidden
    >
      <source src="/videos/waves.mp4" type="video/mp4" />
    </video>
  );
}

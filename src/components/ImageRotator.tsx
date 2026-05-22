'use client';

import { useEffect, useState } from 'react';

const IMAGES = [
  '/images/rotator/01-abstract.jpg',
  '/images/rotator/02-microfluidics.jpg',
  '/images/rotator/03-pills.jpg',
  '/images/rotator/04-surgical.jpg',
  '/images/rotator/05-servers.jpg',
  '/images/rotator/06-molecule.jpg',
  '/images/rotator/07-chip-droplet.jpg',
  '/images/rotator/08-dna-robot.jpg',
];

export function ImageRotator({ intervalMs = 3500 }: { intervalMs?: number }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActive((i) => (i + 1) % IMAGES.length);
    }, intervalMs);
    return () => clearInterval(id);
  }, [intervalMs]);

  return (
    <div className="absolute inset-0 overflow-hidden bg-brand">
      {IMAGES.map((src, i) => (
        <img
          key={src}
          src={src}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-contain transition-opacity duration-[1200ms] ease-in-out"
          style={{ opacity: i === active ? 1 : 0 }}
        />
      ))}
    </div>
  );
}
